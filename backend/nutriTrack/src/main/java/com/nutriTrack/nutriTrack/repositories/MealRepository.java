package com.nutriTrack.nutriTrack.repositories;

import com.nutriTrack.nutriTrack.models.Meal;
import com.nutriTrack.nutriTrack.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUser(User user);

    List<Meal> findByUserIdAndIsFavorite(Long userId, boolean isFavorite);
    List<Meal> findByUserIdAndDate(Long userId, LocalDate date);

}
