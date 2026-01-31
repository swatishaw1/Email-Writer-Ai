package com.email.writer.service;

import com.email.writer.model.EmailRequest;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailGeneratorService {
    private final Client geminiClient;

    public EmailGeneratorService(@Value("${gemini_api_key}") String apiKey) {
        this.geminiClient = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    /*Previously I did it with webClient now I can use The gen Ai Module for that
    previously I need to configure the url and key here I only have to configure the key and model
    Again I need to add headers and also content-type here it is handled all by the genAi module
    In webCilent I need to get the text by myself via JSonObject rootNode tree but here it's just response.text(); */
    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);
        GenerateContentResponse response = geminiClient.models.generateContent(
                "gemini-3-flash-preview",
                prompt,
                null);
        return response.text();
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply.Under Any Circumstances do not include a subject line.\n");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Tone: ").append(emailRequest.getTone()).append("\n");
        }
        prompt.append("\nEmail content:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
