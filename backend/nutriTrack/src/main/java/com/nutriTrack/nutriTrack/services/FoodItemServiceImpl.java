package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.FoodItem;
import com.nutriTrack.nutriTrack.models.Meal;
import com.nutriTrack.nutriTrack.repositories.FoodItemRepository;
import com.nutriTrack.nutriTrack.repositories.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemServiceImpl implements FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private MealRepository mealRepository;

    @Override
    public FoodItem createFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    @Override
    public Optional<FoodItem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

    @Override
    public List<FoodItem> getFoodItemsByMealId(Long mealId) {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + mealId));
        return foodItemRepository.findByMeal(meal);
    }

    @Override
    @Transactional
    public FoodItem updateFoodItem(Long id, FoodItem foodItemDetails) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodItem not found with id: " + id));

        foodItem.setName(foodItemDetails.getName());
        foodItem.setCalories(foodItemDetails.getCalories());
        foodItem.setProteins(foodItemDetails.getProteins());
        foodItem.setCarbs(foodItemDetails.getCarbs());
        foodItem.setFats(foodItemDetails.getFats());

        return foodItemRepository.save(foodItem);
    }

    @Override
    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }
}
