package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.FoodItem;

import java.util.List;
import java.util.Optional;

public interface FoodItemService {
    FoodItem createFoodItem(FoodItem foodItem);
    Optional<FoodItem> getFoodItemById(Long id);
    List<FoodItem> getFoodItemsByMealId(Long mealId);
    FoodItem updateFoodItem(Long id, FoodItem foodItem);
    void deleteFoodItem(Long id);
}
