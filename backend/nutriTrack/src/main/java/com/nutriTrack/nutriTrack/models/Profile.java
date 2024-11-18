package com.nutriTrack.nutriTrack.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int age;
    private String gender;
    private String activityLevel;
    private double targetCalories;
    private double targetCarbs;
    private double targetProteins;
    private double targetFats;
    private String favoriteItems;

    @OneToOne(mappedBy = "profile")
    @JsonIgnore
    private User user;
}