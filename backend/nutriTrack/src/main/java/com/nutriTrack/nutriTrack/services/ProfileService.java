package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.*;
import com.nutriTrack.nutriTrack.repositories.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.time.*;
import java.util.*;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private DailyLogsRepository dailyLogsRepository;

    public Map<String, Double> getRemainingMacros(Long userId, LocalDate date) {
        Profile profile = profileRepository.findByUserId(userId);
        Optional<DailyLogs> optionalDailyLog = dailyLogsRepository.findByUserIdAndDate(userId, date);

        Map<String, Double> remainingMacros = new HashMap<>();

        if (optionalDailyLog.isPresent()) {
            DailyLogs dailyLog = optionalDailyLog.get();
            remainingMacros.put("calories", profile.getTargetCalories() - dailyLog.getCaloriesConsumed());
            remainingMacros.put("protein", profile.getTargetProteins() - dailyLog.getProteinConsumed());
            remainingMacros.put("carbs", profile.getTargetCarbs() - dailyLog.getCarbsConsumed());
            remainingMacros.put("fats", profile.getTargetFats() - dailyLog.getFatsConsumed());
        } else {
            // If no log is found, assume no macros have been consumed, so remaining equals the target.
            remainingMacros.put("calories", profile.getTargetCalories());
            remainingMacros.put("protein", profile.getTargetProteins());
            remainingMacros.put("carbs", profile.getTargetCarbs());
            remainingMacros.put("fats", profile.getTargetFats());
        }

        return remainingMacros;
    }
}
