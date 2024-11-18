package com.nutriTrack.nutriTrack.controllers;

import com.nutriTrack.nutriTrack.models.FoodItem;
import com.nutriTrack.nutriTrack.models.Meal;
import com.nutriTrack.nutriTrack.models.User;
import com.nutriTrack.nutriTrack.repositories.FoodItemRepository;
import com.nutriTrack.nutriTrack.repositories.MealRepository;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import com.nutriTrack.nutriTrack.services.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
 @RequestMapping("/meals")
public class MealController {

    private final MealRepository mealRepository;
    @Autowired
    private MealService mealService;
    private final FoodItemRepository foodItemRepository;

    @Autowired
    public MealController(MealRepository mealRepository, FoodItemRepository foodItemRepository) {
        this.mealRepository = mealRepository;
        this.foodItemRepository = foodItemRepository;
    }
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        // Check if the user exists
        if (meal.getUser() != null && meal.getUser().getId() != null) {
            Optional<User> optionalUser = userRepository.findById(meal.getUser().getId());
            if (!optionalUser.isPresent()) {
                // If user doesn't exist, return a Bad Request response
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            // Set the persistent user to the meal
            meal.setUser(optionalUser.get());
        } else {
            // Return a Bad Request response if user info is missing
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Save the meal with a persistent user
        Meal createdMeal = mealService.createMeal(meal);
        return ResponseEntity.ok(createdMeal);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        return mealService.getMealById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Meal>> getMealsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(mealService.getMealsByUserId(userId));
    }
    @GetMapping("/favorites/{userId}")
    public ResponseEntity<List<Meal>> getFavoriteMeals(@PathVariable Long userId) {
        List<Meal> favoriteMeals = mealService.getFavoriteMealsByUserId(userId);
        return ResponseEntity.ok(favoriteMeals);
    }
    @GetMapping("/{mealId}/fooditems")
    public ResponseEntity<List<FoodItem>> getFoodItemsByMealId(@PathVariable Long mealId) {
        Optional<Meal> meal = mealRepository.findById(mealId);

        if (meal.isPresent()) {
            // Use FoodItemRepository directly to find food items by the Meal
            List<FoodItem> foodItems = foodItemRepository.findByMeal(meal.get());
            return ResponseEntity.ok(foodItems);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/user/{userId}/date")
    public ResponseEntity<List<Meal>> getMealsByUserIdAndDate(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Meal> meals = mealRepository.findByUserIdAndDate(userId, date);
        return ResponseEntity.ok(meals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal meal) {
        return ResponseEntity.ok(mealService.updateMeal(id, meal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.ok().build();
    }
}
