package com.nutriTrack.nutriTrack.controllers;

import com.nutriTrack.nutriTrack.models.DailyLogs;
import com.nutriTrack.nutriTrack.models.Meal;
import com.nutriTrack.nutriTrack.models.User;
import com.nutriTrack.nutriTrack.repositories.DailyLogsRepository;
import com.nutriTrack.nutriTrack.repositories.MealRepository;
import com.nutriTrack.nutriTrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
 @RequestMapping("/dailylogs")
public class DailyLogsController {

    @Autowired
    private DailyLogsRepository dailyLogsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MealRepository mealRepository;

    @PostMapping("/create")
    public ResponseEntity<DailyLogs> createOrUpdateDailyLog(@RequestBody DailyLogs dailyLogs, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        dailyLogs.setUser(user);

        // Check if a daily log for this user and date already exists
        Optional<DailyLogs> existingLog = dailyLogsRepository.findByUserIdAndDate(userId, dailyLogs.getDate());

        if (existingLog.isPresent()) {
            // Update the existing daily log
            DailyLogs logToUpdate = existingLog.get();
            logToUpdate.setCaloriesConsumed(dailyLogs.getCaloriesConsumed());
            logToUpdate.setProteinConsumed(dailyLogs.getProteinConsumed());
            logToUpdate.setCarbsConsumed(dailyLogs.getCarbsConsumed());
            logToUpdate.setFatsConsumed(dailyLogs.getFatsConsumed());
            logToUpdate.setWeight(dailyLogs.getWeight());
            DailyLogs updatedLog = dailyLogsRepository.save(logToUpdate);
            return ResponseEntity.ok(updatedLog);
        } else {
            // Create a new daily log
            dailyLogs.setDate(LocalDate.now());  // Make sure the date is set properly
            DailyLogs savedDailyLog = dailyLogsRepository.save(dailyLogs);
            return new ResponseEntity<>(savedDailyLog, HttpStatus.CREATED);
        }
    }

    @GetMapping("/user/{userId}/last30days")
    public ResponseEntity<List<DailyLogs>> getWeightLogsForLast30Days(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysAgo = today.minusDays(30);

        List<DailyLogs> weightLogs = dailyLogsRepository.findByUserIdAndDateBetween(userId, thirtyDaysAgo, today);
        return ResponseEntity.ok(weightLogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyLogs> getDailyLogById(@PathVariable Long id) {
        Optional<DailyLogs> dailyLog = dailyLogsRepository.findById(id);
        return dailyLog.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<DailyLogs>> getDailyLogsByUserAndDate(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Optional<DailyLogs> dailyLogs = dailyLogsRepository.findByUserIdAndDate(userId, date);
        return ResponseEntity.ok(dailyLogs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyLogs> updateDailyLog(@PathVariable Long id, @RequestBody DailyLogs updatedDailyLog) {
        Optional<DailyLogs> existingDailyLog = dailyLogsRepository.findById(id);
        if (existingDailyLog.isPresent()) {
            DailyLogs dailyLog = existingDailyLog.get();
            dailyLog.setCaloriesConsumed(updatedDailyLog.getCaloriesConsumed());
            dailyLog.setProteinConsumed(updatedDailyLog.getProteinConsumed());
            dailyLog.setCarbsConsumed(updatedDailyLog.getCarbsConsumed());
            dailyLog.setFatsConsumed(updatedDailyLog.getFatsConsumed());
            dailyLog.setWeight(updatedDailyLog.getWeight());
            return ResponseEntity.ok(dailyLogsRepository.save(dailyLog));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyLog(@PathVariable Long id) {
        if (dailyLogsRepository.existsById(id)) {
            dailyLogsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/meals")
    public ResponseEntity<DailyLogs> addMealsToDailyLog(@PathVariable Long id, @RequestBody List<Long> mealIds) {
        Optional<DailyLogs> optionalDailyLog = dailyLogsRepository.findById(id);
        if (optionalDailyLog.isPresent()) {
            DailyLogs dailyLog = optionalDailyLog.get();
            List<Meal> meals = mealRepository.findAllById(mealIds);
            dailyLog.getMeals().addAll(meals);
            return ResponseEntity.ok(dailyLogsRepository.save(dailyLog));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/meals/{mealId}")
    public ResponseEntity<DailyLogs> removeMealFromDailyLog(@PathVariable Long id, @PathVariable Long mealId) {
        Optional<DailyLogs> optionalDailyLog = dailyLogsRepository.findById(id);
        if (optionalDailyLog.isPresent()) {
            DailyLogs dailyLog = optionalDailyLog.get();
            dailyLog.getMeals().removeIf(meal -> meal.getMealId().equals(mealId));
            return ResponseEntity.ok(dailyLogsRepository.save(dailyLog));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}