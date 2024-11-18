package com.nutriTrack.nutriTrack.repositories;

import com.nutriTrack.nutriTrack.models.FoodItem;
import com.nutriTrack.nutriTrack.models.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByMeal(Meal meal);
}
