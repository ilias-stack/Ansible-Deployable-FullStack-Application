import { Component, OnInit, inject } from "@angular/core";
import { Answer, Message } from "../../models/message";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ChatbotService } from "../../services/chatbot.service";
import { firstValueFrom } from "rxjs";
import { SpeechRecognitionService } from "../../services/speechrecognition.service";

@Component({
  selector: "app-chatbot",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./chatbot.component.html",
  styleUrl: "./chatbot.component.css",
})
export class ChatbotComponent implements OnInit {
  private toastr = inject(ToastrService);
  private chatbotService = inject(ChatbotService);
  messages: Message[] = [];
  attachedFile: File | null = null;
  loadingAnswer = false;
  loadingFile = false;
  message = "";
  assistant = "assistant";
  assistant_name = "Assistant";
  inputSelectedFiles: File[] = [];
  answer: Answer | null = null;
  quizTopic: string | null = null;

  private assistants: { [key: number]: { type: string; name: string } } = {
    1: { type: "quiz", name: "Quiz" },
    2: { type: "data_analyst", name: "Data Analyst" },
    3: { type: "assistant", name: "Assistant" },
  };

  constructor(private speechRecognitionService: SpeechRecognitionService) {}

  ngOnInit() {
    this.scrollToBottom();
  }

  async attachFile(event: any) {
    this.loadingFile = true;

    if (!event.target.files) return;
    const files = event.target.files;
    this.toastr.success("File uploaded successfully");
    // Store the selected files
    this.inputSelectedFiles.push(...files);
    // send request
    const formData = new FormData();
    formData.append("file", this.inputSelectedFiles[0]);
    this.chatbotService.postFile(formData).subscribe();
    this.loadingFile = false;
  }

  async sendMessage() {
    if (this.isQuizMode()) {
      this.quizTopic = this.message.trim();
    }

    this.loadingAnswer = true;
    const content = this.message.trim();
    this.message = "";

    // Append user's message
    this.appendMessage({
      id: this.messages.length + 1,
      content,
      isBot: false,
      date: new Date().toISOString(),
      isQuestion: false,
    });

    try {
      // Fetch bot's response
      const response = await firstValueFrom(
        this.isQuizMode()
          ? this.chatbotService.getQCM(content)
          : this.chatbotService.get(content),
      );

      // Append bot's response
      if (this.isQuizMode()) {
        this.appendMessage({
          id: this.messages.length + 1,
          content: response.question,
          isBot: true,
          date: new Date().toISOString(),
          question: response.question,
          answers: response.answers,
          explication: response.explication,
          isQuestion: true,
        });
      } else {
        this.appendMessage({
          id: this.messages.length + 1,
          content: response,
          isBot: true,
          date: new Date().toISOString(),
          isQuestion: false,
        });
      }
    } catch (error) {
      console.error("Error fetching bot response", error);
    } finally {
      this.loadingAnswer = false;
    }
  }

  appendMessage(message: Message) {
    this.messages.push(message);
    this.scrollToBottom();
  }

  chooseAssistant(assistant: number) {
    const selectedAssistant = this.assistants[assistant] || this.assistants[1];
    this.assistant = selectedAssistant.type;
    this.assistant_name = selectedAssistant.name;

    this.messages = [];
    this.quizTopic = null;
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.getElementById("chatbox");
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    });
  }

  async startVoiceRecognition() {
    try {
      const text = await this.speechRecognitionService.recognizeSpeech();
      this.message = text; // Display the detected speech in the input field
    } catch (error) {
      console.error("Speech recognition failed: ", error);
    }
  }

  switchToQuizMode() {
    this.chooseAssistant(1);

    this.appendMessage({
      id: this.messages.length + 1,
      content:
        "Welcome to the Quiz Assistant. Give me a topic and I will ask you a question.",
      isBot: true,
      date: new Date().toISOString(),
      isQuestion: false,
    });
  }

  isQuizMode() {
    return this.assistant === "quiz";
  }

  selectAnswer(answer: Answer) {
    this.answer = answer;
  }
}
