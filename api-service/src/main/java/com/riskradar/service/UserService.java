package com.riskradar.service;

import com.riskradar.dto.LoginRequest;
import com.riskradar.dto.SignupRequest;
import com.riskradar.dto.UserDto;
import com.riskradar.model.Role;
import com.riskradar.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    private final Map<String, User> userStore = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        initSeedUsers();
    }

    private void initSeedUsers() {
        // Default Lead Analyst
        User analyst = new User(
                UUID.randomUUID().toString(),
                "analyst@riskradar.io",
                passwordEncoder.encode("password123"),
                "Pranav Lamkhade",
                Role.ROLE_ANALYST,
                "Goldman Sachs RegTech Labs",
                Instant.now()
        );
        userStore.put(analyst.getEmail().toLowerCase(), analyst);

        // Default Admin User
        User admin = new User(
                UUID.randomUUID().toString(),
                "admin@riskradar.io",
                passwordEncoder.encode("admin123"),
                "Lead Compliance Officer",
                Role.ROLE_ADMIN,
                "RiskRadar Global Surveillance",
                Instant.now()
        );
        userStore.put(admin.getEmail().toLowerCase(), admin);
    }

    public User registerUser(SignupRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        if (userStore.containsKey(normalizedEmail)) {
            throw new IllegalArgumentException("User with email " + req.getEmail() + " already exists");
        }

        User newUser = new User(
                UUID.randomUUID().toString(),
                normalizedEmail,
                passwordEncoder.encode(req.getPassword()),
                req.getFullName().trim(),
                req.getRole() != null ? req.getRole() : Role.ROLE_ANALYST,
                req.getInstitution().trim(),
                Instant.now()
        );

        userStore.put(normalizedEmail, newUser);
        return newUser;
    }

    public User authenticate(LoginRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        User user = userStore.get(normalizedEmail);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    public User findByEmail(String email) {
        if (email == null) return null;
        return userStore.get(email.trim().toLowerCase());
    }

    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getInstitution(),
                user.getCreatedAt()
        );
    }
}
