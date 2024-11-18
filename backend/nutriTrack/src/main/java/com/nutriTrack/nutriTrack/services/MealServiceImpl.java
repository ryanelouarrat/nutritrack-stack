package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.*;
import com.nutriTrack.nutriTrack.repositories.MealRepository;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MealServiceImpl implements MealService {

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    @Override
    public List<Meal> getFavoriteMealsByUserId(Long userId) {
        return mealRepository.findByUserIdAndIsFavorite(userId, true);
    }

    @Override
    public Optional<Meal> getMealById(Long id) {
        return mealRepository.findById(id);
    }

    @Override
    public List<Meal> getMealsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return mealRepository.findByUser(user);
    }

    @Override
    @Transactional
    public Meal updateMeal(Long id, Meal mealDetails) {
        Meal meal = mealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));

        meal.setName(mealDetails.getName());
        meal.setDate(mealDetails.getDate());

        return mealRepository.save(meal);
    }

    @Override
    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }

    @Override
    public List<Meal> findAll() {
        return mealRepository.findAll();
    }
    @Override
    public List<Meal> recommendMealsByMacros(Long userId, double remainingCalories, double remainingProteins, double remainingCarbs, double remainingFats) {
        // Fetch favorite meals of the user
        List<Meal> favoriteMeals = mealRepository.findByUserIdAndIsFavorite(userId, true);
        List<Meal> recommendedMeals = new ArrayList<>();
        // Loop through favorite meals and filter based on remaining macros
        for (Meal meal : favoriteMeals) {
            double totalCalories = 0;
            double totalProteins = 0;
            double totalCarbs = 0;
            double totalFats = 0;
            // Calculate the macros of each meal based on its food items
            for (FoodItem foodItem : meal.getFoodItems()) {
                totalCalories += foodItem.getCalories();
                totalProteins += foodItem.getProteins();
                totalCarbs += foodItem.getCarbs();
                totalFats += foodItem.getFats();
            }
            // Check if the meal fits within the remaining macros
            if (totalCalories <= remainingCalories &&
                    totalProteins <= remainingProteins &&
                    totalCarbs <= remainingCarbs &&
                    totalFats <= remainingFats) {
                recommendedMeals.add(meal);
            }
        }
        return recommendedMeals;
    }
}
