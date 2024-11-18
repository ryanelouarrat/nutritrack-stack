package com.nutriTrack.nutriTrack.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecommendationService {

    @Value("${flask.service.url}")
    private String flaskServiceUrl;

    private final RestTemplate restTemplate;

    public RecommendationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<String> getRecommendations(Map<String, Object> userMacros, List<String> favoriteFoods) {
        // Prepare the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("user_macros", userMacros);
        requestBody.put("user_favorites", favoriteFoods);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the request
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Send a POST request to the Flask service
        String flaskUrl = flaskServiceUrl + "/recommend";
        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, entity, String.class);

        // Return the response
        return response;
    }
}
