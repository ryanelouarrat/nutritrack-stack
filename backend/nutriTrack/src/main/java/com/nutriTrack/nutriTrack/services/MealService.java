package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.Meal;

import java.util.List;
import java.util.Optional;

public interface MealService {
    Meal createMeal(Meal meal);
    Optional<Meal> getMealById(Long id);
    List<Meal> getMealsByUserId(Long userId);
    Meal updateMeal(Long id, Meal meal);
    void deleteMeal(Long id);
    List<Meal> getFavoriteMealsByUserId(Long userId);
    List<Meal> recommendMealsByMacros(Long userId, double remainingCalories, double remainingProteins, double remainingCarbs, double remainingFats);

    List<Meal> findAll();
}
