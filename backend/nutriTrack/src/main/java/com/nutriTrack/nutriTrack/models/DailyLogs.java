package com.nutriTrack.nutriTrack.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "daily_logs", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "date"})
})
public class DailyLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore // Avoid circular reference with User
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "calories_consumed", nullable = false)
    private double caloriesConsumed;

    @Column(name = "protein_consumed")
    private double proteinConsumed;

    @Column(name = "carbs_consumed")
    private double carbsConsumed;

    @Column(name = "fats_consumed")
    private double fatsConsumed;

    @Column(name = "weight", nullable = false)
    private double weight;

    @ManyToMany
    @JoinTable(
            name = "daily_logs_meals",
            joinColumns = @JoinColumn(name = "daily_log_id"),
            inverseJoinColumns = @JoinColumn(name = "meal_id")
    )
    @JsonIgnore // Prevent circular reference with Meal
    private List<Meal> meals;
}
