package cherkaoui.soulaimane.chatbot.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ai.chat.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import cherkaoui.soulaimane.chatbot.entities.Question;
import static cherkaoui.soulaimane.chatbot.mappers.JsonConverter.convertJsonStringToQuestion;

@Service
public class RagService {

    @Autowired
    private VectorStore vectorStore;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${ai-token}")
    private String aiToken;

    public Question askllmQcm(String query) {
        List<Document> documents = vectorStore.similaritySearch(SearchRequest.query(query));
        String systemMessageTemplate = """
            Answer the following question based only on the provided CONTEXT.
            Provide the QCM (Question Choice Multiple) in a JSON format with the following fields:
            - "question": The question text.
            - "answers": An array of 4 answers, each answer having:
              - "text": The answer text.
              - "correct": A boolean indicating if the answer is correct or not.
            - "explication": Explication of why it's the correct answer and not the others.
            If the answer is not found in the context, respond with "I don't know".
            CONTEXT:
              {CONTEXT}
            """;

        String context = documents.stream().map(Document::getContent).collect(Collectors.joining("\n"));
        Message systemMessage = new SystemPromptTemplate(systemMessageTemplate)
                .createMessage(Map.of("CONTEXT", context));
        UserMessage userMessage = new UserMessage(query);
        Prompt prompt = new Prompt(List.of(systemMessage, userMessage));
        OpenAiApi openAiApi = new OpenAiApi(aiToken);
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withModel("gpt-3.5-turbo")
                .withMaxTokens(800)
                .build();
        OpenAiChatClient openAiChatClient = new OpenAiChatClient(openAiApi, options);
        ChatResponse response = openAiChatClient.call(prompt);
        String responseContent = response.getResult().getOutput().getContent();

        if ("I don't know".equals(responseContent)) {
            String emptyJson = """
                {
                    "question": "None",
                    "answers": [
                        {"text": "None", "correct": false},
                        {"text": "None", "correct": false},
                        {"text": "None", "correct": false},
                        {"text": "None", "correct": false}
                    ],
                    "explication": "None"
                }
                """;
            return convertJsonStringToQuestion(emptyJson);
        } else {
            return convertJsonStringToQuestion(responseContent);
        }
    }

    public String askllm(String query) {
        List<Document> documents = vectorStore.similaritySearch(SearchRequest.query(query));
        String systemMessageTemplate = """
                Answer the following question based only the provided CONTEXT
                The CONTEXT provided have a question,response and possible symptoms
                If the answer is not found in the context, respond "I don't know".
                CONTEXT:
                  {CONTEXT}
                """;
        //String content = documents.stream().map(d -> d.getContent()).collect(Collectors.joining("\n"));
        Message systemMessage = new SystemPromptTemplate(systemMessageTemplate)
                .createMessage(Map.of("CONTEXT", documents));
        UserMessage userMessage = new UserMessage(query);
        Prompt prompt = new Prompt(List.of(systemMessage, userMessage));
        OpenAiApi openAiApi = new OpenAiApi(aiToken);
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withModel("gpt-3.5-turbo")
                .withMaxTokens(800)
                .build();
        OpenAiChatClient openAiChatClient = new OpenAiChatClient(openAiApi, options);
        ChatResponse reponse = openAiChatClient.call(prompt);
        String responseContent = reponse.getResult().getOutput().getContent();
        return responseContent;
    }

    public void textEmbedding(Resource[] pdfs) {
        jdbcTemplate.update("delete from vector_store");
        PdfDocumentReaderConfig pdfDocumentReaderConfig = PdfDocumentReaderConfig.defaultConfig();
        String content = "";
        for (Resource ressource : pdfs) {
            //decouper le pdf en pages:
            PagePdfDocumentReader pagePdfDocumentReader = new PagePdfDocumentReader(ressource, pdfDocumentReaderConfig);
            List<Document> documentList = pagePdfDocumentReader.get();
            content = content + documentList.stream().map(document -> document.getContent()).collect(Collectors.joining("\n")) + "\n";

        }

        TokenTextSplitter tokenTextSplitter = new TokenTextSplitter();
        List<String> chunks = tokenTextSplitter.split(content, 1000);
        List<Document> chunksDocuments = chunks.stream().map(chunk -> new Document(chunk)).collect(Collectors.toList());
        vectorStore.accept(chunksDocuments);
    }

    public void textEmbeddingOne(Resource pdf) {
        jdbcTemplate.update("delete from vector_store");
        PdfDocumentReaderConfig pdfDocumentReaderConfig = PdfDocumentReaderConfig.defaultConfig();

        //decouper le pdf en pages:
        PagePdfDocumentReader pagePdfDocumentReader = new PagePdfDocumentReader(pdf, pdfDocumentReaderConfig);
        List<Document> documentList = pagePdfDocumentReader.get();
        String content = documentList.stream().map(document -> document.getContent()).collect(Collectors.joining("\n"));

        TokenTextSplitter tokenTextSplitter = new TokenTextSplitter();
        List<String> chunks = tokenTextSplitter.split(content, 1000);
        List<Document> chunksDocuments = chunks.stream().map(chunk -> new Document(chunk)).collect(Collectors.toList());
        vectorStore.accept(chunksDocuments);
    }

    public void textEmbeddingOneCsv(Resource csvResource) {
        jdbcTemplate.update("delete from vector_store");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(csvResource.getInputStream()))) {
            List<String> lines = reader.lines().collect(Collectors.toList());

            List<Document> documentList = new ArrayList<>();
            for (String line : lines) {
                String[] columns = line.split(",");
                if (columns.length >= 4) {
                    String content = String.join(" ", columns[0], columns[1], columns[2], columns[3]);
                    documentList.add(new Document(content));
                }
            }

            String content = documentList.stream().map(Document::getContent).collect(Collectors.joining("\n"));

            TokenTextSplitter tokenTextSplitter = new TokenTextSplitter();
            List<String> chunks = tokenTextSplitter.split(content, 1000);

            List<Document> chunksDocuments = chunks.stream().map(Document::new).collect(Collectors.toList());
            vectorStore.accept(chunksDocuments);
            System.out.println("data embedded");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
