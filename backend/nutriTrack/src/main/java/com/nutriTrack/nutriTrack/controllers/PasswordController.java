package com.nutriTrack.nutriTrack.controllers;

import com.nutriTrack.nutriTrack.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        passwordService.sendResetToken(email);
        return ResponseEntity.ok("Password reset link sent.");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        passwordService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successful.");
    }
}
