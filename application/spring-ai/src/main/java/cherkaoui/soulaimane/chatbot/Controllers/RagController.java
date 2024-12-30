package cherkaoui.soulaimane.chatbot.Controllers;

import cherkaoui.soulaimane.chatbot.entities.Question;
import cherkaoui.soulaimane.chatbot.services.RagService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class RagController {

    private final RagService ragService;

    public RagController(RagService ragService) {
        this.ragService = ragService;
    }

    @GetMapping("/rag")
    public String rag(@RequestParam String query) {
        return ragService.askllm(query);
    }
    @GetMapping("/ragQcm")
    public Question ragQcm(@RequestParam String query) {
        return ragService.askllmQcm(query);
    }

    @PostMapping("/addPdf")
    public void addPdf(@RequestParam("file") MultipartFile pdf) throws IOException {
        // Convert MultipartFile to Resource
        Resource pdfResource = new InputStreamResource(pdf.getInputStream());
        // Call service to process the PDF
        ragService.textEmbeddingOne(pdfResource);
    }
}

