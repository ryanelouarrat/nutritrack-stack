package com.nutriTrack.nutriTrack.controllers;

import com.nutriTrack.nutriTrack.config.JwtUtil;
import com.nutriTrack.nutriTrack.models.*;
import com.nutriTrack.nutriTrack.repositories.ProfileRepository;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import com.nutriTrack.nutriTrack.services.UserService;

import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


    // User login
   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            String token = jwtUtil.generateToken(existingUser.get().getEmail());

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true); // Set to true in production with HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds

            // Add cookie to response
            response.addCookie(cookie);

            // Manually set the SameSite=None attribute
            response.addHeader("Set-Cookie",
                    String.format("token=%s; HttpOnly; Secure; Path=/; Max-Age=%d; SameSite=None",
                            token, 7 * 24 * 60 * 60));

            return ResponseEntity.ok(Map.of("userId", existingUser.get().getId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    } catch (BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

    // User registration
    // User registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> userData) {
        String email = (String) userData.get("email");
        String password = (String) userData.get("password");
        String name = (String) userData.get("name");

        // Check if the user already exists
        Optional<User> existingUser = userService.findByEmail(email);
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(password);

        // Create the User object
        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setName(name);
        user.setGoal((String) userData.get("goal"));
        user.setHeight(userData.containsKey("height") ? Double.parseDouble(String.valueOf(userData.get("height"))) : 0);
        user.setWeight(userData.containsKey("weight") ? Double.parseDouble(String.valueOf(userData.get("weight"))) : 0);

        // Check and set the Profile fields from userData
        Map<String, Object> profileData = (Map<String, Object>) userData.get("profile");
        if (profileData == null) {
            return ResponseEntity.badRequest().body("Profile data cannot be null");
        }

        Profile profile = new Profile();
        profile.setAge(profileData.containsKey("age") ? (Integer) profileData.get("age") : 0);
        profile.setGender((String) profileData.getOrDefault("gender", "unknown"));
        profile.setActivityLevel((String) profileData.getOrDefault("activityLevel", "sedentary"));
        profile.setFavoriteItems((String) profileData.getOrDefault("favoriteItems", ""));

        // Calculate BMR and calories based on goal and activity level
        double bmr = profile.getGender().equalsIgnoreCase("female")
                ? 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * profile.getAge() - 161
                : 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * profile.getAge() + 5;

        Map<String, Double> activityFactors = Map.of(
                "sedentary", 1.2,
                "lightly_active", 1.375,
                "moderately_active", 1.55,
                "very_active", 1.725,
                "extra_active", 1.9
        );

        double activityMultiplier = activityFactors.getOrDefault(profile.getActivityLevel(), 1.2);
        double totalCalories = bmr * activityMultiplier;

        // Adjust target calories based on the goal
        switch (user.getGoal()) {
            case "weight_loss":
                profile.setTargetCalories(totalCalories - 500);
                break;
            case "maintenance":
                profile.setTargetCalories(totalCalories);
                break;
            case "bulking":
                profile.setTargetCalories(totalCalories + 500);
                break;
            default:
                profile.setTargetCalories(totalCalories);
        }

        // Calculate macros
        profile.setTargetProteins((0.3 * profile.getTargetCalories()) / 4);
        profile.setTargetCarbs((0.5 * profile.getTargetCalories()) / 4);
        profile.setTargetFats((0.2 * profile.getTargetCalories()) / 9);

        // Link the profile with the user
        user.setProfile(profile);
        profile.setUser(user);

        // Save user and profile
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("userId", user.getId(), "message", "User registered successfully"));
    }

    // Create a profile and associate it with a user
    @PostMapping("/{userId}/profile")
    public ResponseEntity<?> createProfile(@PathVariable Long userId, @RequestBody Profile profile) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setProfile(profile);
            userRepository.save(user);
            return new ResponseEntity<>(profile, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update user weight
    @PutMapping("/{userId}/weight")
    public ResponseEntity<?> updateUserWeight(@PathVariable Long userId, @RequestParam double weight) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setWeight(weight);
            userRepository.save(user);
            return new ResponseEntity<>(Map.of(
                    "userId", user.getId(),
                    "weight", user.getWeight()
            ), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Fetch a user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(null); // Exclude password from the response
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/verifyToken")
    public ResponseEntity<Map<String, Boolean>> verifyToken(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromCookies(request);
        if (token != null && jwtUtil.validateToken(token)) {
            return ResponseEntity.ok(Map.of("isAuthenticated", true));
        }
        return ResponseEntity.ok(Map.of("isAuthenticated", false));
    }

    // Secure endpoint to fetch the authenticated user's profile
    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromCookies(request);
        if (token == null || !jwtUtil.validateToken(token)) {
            return new ResponseEntity<>("Invalid or missing token", HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.extractUsername(token);
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(null); // Exclude password from the response
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // Add to UserController
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear the cookie by setting its max age to 0
        Cookie cookie = new Cookie("token", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // Set to zero to delete the cookie
        response.addCookie(cookie);

        return new ResponseEntity<>(Map.of("message", "Logged out successfully"), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(HttpServletRequest request, @RequestBody Map<String, String> updates) {
        String token = jwtUtil.extractTokenFromCookies(request);
        if (token == null || !jwtUtil.validateToken(token)) {
            return new ResponseEntity<>("Invalid or missing token", HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.extractUsername(token);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Profile profile = user.getProfile();

            // Update profile fields
            if (updates.containsKey("name")) {
                user.setName(updates.get("name"));
            }
            if (updates.containsKey("goal")) {
                user.setGoal(updates.get("goal"));
            }
            if (updates.containsKey("activityLevel")) {
                profile.setActivityLevel(updates.get("activityLevel"));
            }
            if (updates.containsKey("favoriteItems")) {
                profile.setFavoriteItems(updates.get("favoriteItems"));
            }

            // Recalculate macros
            double bmr = profile.getGender().equalsIgnoreCase("Female")
                    ? 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * profile.getAge() - 161
                    : 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * profile.getAge() + 5;

            Map<String, Double> activityFactors = Map.of(
                    "sedentary", 1.2,
                    "lightly_active", 1.375,
                    "moderately_active", 1.55,
                    "very_active", 1.725,
                    "extra_active", 1.9
            );

            double activityMultiplier = activityFactors.getOrDefault(profile.getActivityLevel(), 1.2);
            double totalCalories = bmr * activityMultiplier;

            switch (user.getGoal()) {
                case "weight_loss":
                    profile.setTargetCalories(totalCalories - 500);
                    break;
                case "maintenance":
                    profile.setTargetCalories(totalCalories);
                    break;
                case "bulking":
                    profile.setTargetCalories(totalCalories + 500);
                    break;
                default:
                    profile.setTargetCalories(totalCalories);
            }

            profile.setTargetProteins((0.3 * profile.getTargetCalories()) / 4);
            profile.setTargetCarbs((0.5 * profile.getTargetCalories()) / 4);
            profile.setTargetFats((0.2 * profile.getTargetCalories()) / 9);

            userRepository.save(user);
            return new ResponseEntity<>(Map.of("message", "Profile updated successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Change user password
    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody Map<String, String> passwordData) {
        String token = jwtUtil.extractTokenFromCookies(request);
        if (token == null || !jwtUtil.validateToken(token)) {
            return new ResponseEntity<>("Invalid or missing token", HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.extractUsername(token);
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");

            // Verify current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return new ResponseEntity<>("Current password is incorrect", HttpStatus.FORBIDDEN);
            }

            // Update to new password
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return new ResponseEntity<>(Map.of("message", "Password changed successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
