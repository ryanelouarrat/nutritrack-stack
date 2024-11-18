package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.PasswordResetToken;
import com.nutriTrack.nutriTrack.models.User;
import com.nutriTrack.nutriTrack.repositories.PasswordResetTokenRepository;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void sendResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User with email not found."));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setExpiryDate(expiryDate);
        resetToken.setUser(user);

        tokenRepository.save(resetToken);

        // Send HTML reset link email
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        sendResetEmail(email, resetLink);
    }

    private void sendResetEmail(String email, String resetLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setFrom("MS_Y19azv@trial-0p7kx4xj8v8l9yjr.mlsender.net"); // Set this to a valid email address
            helper.setSubject("Password Reset Request");

            String htmlContent = "<html>" +
                    "<body style='font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;'>" +
                    "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; " +
                    "box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); text-align: center;'>" +
                    "<h2 style='color: #333;'>Reset Your Password</h2>" +
                    "<p style='color: #666;'>It seems you've requested a password reset for your NutriTrack account. " +
                    "Click the button below to reset your password:</p>" +
                    "<a href='" + resetLink + "' style='display: inline-block; padding: 10px 20px; color: #fff; background-color: #bce08a; " +
                    "border-radius: 5px; text-decoration: none; font-weight: bold;'>Reset Password</a>" +
                    "<p style='color: #666; margin-top: 20px;'>If you did not request this change, you can ignore this email.</p>" +
                    "<div style='margin-top: 30px;'><img src='cid:logo' width='50' height='50' alt='NutriTrack Logo' style='margin-bottom: 10px;' />" +
                    "<p style='color: #91b75b; font-weight: bold;'>NutriTrack</p></div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true); // Send HTML content
            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Failed to send email.");
        }
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid or expired token.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Remove token after use
        tokenRepository.delete(resetToken);
    }
}
