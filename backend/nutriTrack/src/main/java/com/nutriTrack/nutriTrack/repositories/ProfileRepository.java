package com.nutriTrack.nutriTrack.repositories;

import com.nutriTrack.nutriTrack.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUserId(Long userId);
}
