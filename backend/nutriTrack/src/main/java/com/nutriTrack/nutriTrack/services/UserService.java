package com.nutriTrack.nutriTrack.services;

import com.nutriTrack.nutriTrack.models.User;
import org.springframework.security.core.userdetails.*;

import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> findByEmail(String email);  // Update to return Optional<User>
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);

    User findById(Long userId);

    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;
}
