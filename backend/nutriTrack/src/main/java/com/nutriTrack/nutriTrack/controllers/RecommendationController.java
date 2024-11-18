package com.nutriTrack.nutriTrack.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nutriTrack.nutriTrack.services.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    private static final Logger logger = LoggerFactory.getLogger(RecommendationController.class);

    private final RecommendationService recommendationService;
    private final ObjectMapper objectMapper;

    public RecommendationController(RecommendationService recommendationService, ObjectMapper objectMapper) {
        this.recommendationService = recommendationService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/generate")
    public ResponseEntity<List<Map<String, Object>>> getMealRecommendations(@RequestBody Map<String, Object> requestBody) {
        try {
            // Extract user macros and favorite foods from the request body
            Map<String, Object> userMacros = (Map<String, Object>) requestBody.get("user_macros");
            List<String> favoriteFoods = (List<String>) requestBody.get("user_favorites");

            // Call the recommendation service (this returns a string from Flask)
            ResponseEntity<String> response = recommendationService.getRecommendations(userMacros, favoriteFoods);

            // Convert the JSON string response from Flask into a List of Maps
            List<Map<String, Object>> recommendations = objectMapper.readValue(response.getBody(), new TypeReference<List<Map<String, Object>>>() {});

            // Return the parsed recommendations to the frontend
            return ResponseEntity.ok(recommendations);

        } catch (Exception e) {
            logger.error("Error processing meal recommendations: ", e);  // Log the error
            return ResponseEntity.status(500).body(null);  // Return 500 status with null body
        }
    }
}
