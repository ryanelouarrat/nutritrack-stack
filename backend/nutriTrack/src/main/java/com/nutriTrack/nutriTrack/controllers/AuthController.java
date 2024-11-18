package com.nutriTrack.nutriTrack.controllers;

import com.nutriTrack.nutriTrack.config.JwtUtil;
import com.nutriTrack.nutriTrack.models.User;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class AuthController {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/users/googleAuth")
    public ResponseEntity<Map<String, Object>> googleAuthCallback(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");

        if (code == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Authorization code is missing"));
        }

        try {
            // Existing code for exchanging the code with Google for an access token
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://oauth2.googleapis.com/token";

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", redirectUri);
            params.add("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, request, Map.class);

            if (tokenResponse.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> tokenData = tokenResponse.getBody();
                String accessToken = (String) tokenData.get("access_token");

                // Get user info
                String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + accessToken;
                ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);

                if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
                    Map<String, Object> userInfo = userInfoResponse.getBody();
                    String email = (String) userInfo.get("email");

                    Optional<User> user = userRepository.findByEmail(email);
                    Map<String, Object> responseBody = new HashMap<>();

                    if (user.isPresent()) {
                        // Existing user, authenticate and return JWT
                        String jwtToken = jwtUtil.generateToken(user.get().getEmail());
                        responseBody.put("isAuthenticated", true);
                        responseBody.put("token", jwtToken); // Send token in response body
                    } else {
                        // New user, redirect to signup with user info
                        responseBody.put("isAuthenticated", false);
                        responseBody.put("signupName", (String) userInfo.get("name"));
                        responseBody.put("signupEmail", email);
                    }

                    return ResponseEntity.ok(responseBody);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Google Authentication failed"));
    }
}
