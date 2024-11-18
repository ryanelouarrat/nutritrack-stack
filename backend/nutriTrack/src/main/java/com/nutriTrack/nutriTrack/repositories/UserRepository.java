package com.nutriTrack.nutriTrack.repositories;


import com.nutriTrack.nutriTrack.models.Profile;
import com.nutriTrack.nutriTrack.models.User;
import com.nutriTrack.nutriTrack.models.Meal;
import com.nutriTrack.nutriTrack.models.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

