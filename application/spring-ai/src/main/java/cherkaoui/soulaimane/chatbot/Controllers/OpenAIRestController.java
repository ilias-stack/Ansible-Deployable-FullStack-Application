package cherkaoui.soulaimane.chatbot.Controllers;

import cherkaoui.soulaimane.chatbot.services.RagService;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OpenAIRestController {

    @Autowired
    private ChatClient chatClient;
    @Autowired
    private RagService ragService;

    @GetMapping("/chat")
    public String chat(String query) {
        return chatClient.call(query);
    }

    @GetMapping("/chat2")
    public String chat2(String query) {
        OpenAiApi openAiApi = new OpenAiApi("--api key--");
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withTemperature(0.8F)
                .withModel("gpt-4")
                .withMaxTokens(800)
                .build();
        OpenAiChatClient openAiChatClient = new OpenAiChatClient(openAiApi, options);
        SystemMessage systemMessage = new SystemMessage(""" 
                vous etre un assistant qui travail pour un editeur de logiciel
                vous serez demandé de faire un synthese au format json de la question posé par l'utilisateur
                """);
        UserMessage userMessage = new UserMessage(query);
        Prompt prompt = new Prompt(List.of(systemMessage, userMessage));
        return openAiChatClient.call(prompt).getResult().getOutput().getContent();
    }
}
