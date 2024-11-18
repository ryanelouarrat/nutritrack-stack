package com.nutriTrack.nutriTrack.repositories;

import com.nutriTrack.nutriTrack.models.DailyLogs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyLogsRepository extends JpaRepository<DailyLogs, Long> {
    Optional<DailyLogs> findByUserIdAndDate(Long userId, LocalDate date);

    List<DailyLogs> findByUserIdAndDateBetween(Long userId, LocalDate thirtyDaysAgo, LocalDate today);
}
