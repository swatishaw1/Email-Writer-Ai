package com.email.writer.service;

import com.email.writer.model.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {
    private final WebClient webClient ;


    @Value("${gemini_api_url}")// This should be set in application.properties or application.yml it is the base URL for the Gemini API
    private String geminiApiUrl;

    @Value("${gemini_api_key}")// This should be set in application.properties or application.yml it is used to authenticate with the Gemini API
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest){



        // Here you would implement the logic to generate the email content based on the request
        // For now, we will just return a placeholder string
        // This is where you would integrate with an email generation library or API
        //Build the prompt
        String prompt= buildPromt(emailRequest);
        //Craft the email content based on the request
        Map<String, Object> requestBody =Map.of(
                "contents",new Object[]{
                    Map.of("parts",new Object[]{
                                    Map.of("text",prompt)
                    })
                }
        );
        //Do request to the email generation response
        String response = webClient.post()
                .uri(geminiApiUrl+geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //Extract Response and Return
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();//This is used to work with the JSON data to java object and vice versa
            JsonNode rootNode =mapper.readTree(response);//This turns data into a tree structure that can be navigated
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing response: "+e.getMessage();
        }
    }

    private String buildPromt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email with the following content.Under no circumstances should you generate a Subject line.\n");
        if(emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a: ").append(emailRequest.getTone()).append("tone.");
        }
        prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
