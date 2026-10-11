package com.riskradar.service;

import com.riskradar.dto.LoginRequest;
import com.riskradar.dto.SignupRequest;
import com.riskradar.dto.UserDto;
import com.riskradar.entity.UserEntity;
import com.riskradar.model.Role;
import com.riskradar.model.User;
import com.riskradar.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Map<String, User> cache = new ConcurrentHashMap<>();

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        initSeedUsers();
    }

    private void initSeedUsers() {
        // Seed Lead Analyst into Database
        if (!userRepository.existsByEmailIgnoreCase("analyst@riskradar.io")) {
            UserEntity analyst = new UserEntity(
                    UUID.randomUUID().toString(),
                    "analyst@riskradar.io",
                    passwordEncoder.encode("password123"),
                    "Pranav Lamkhade",
                    Role.ROLE_ANALYST,
                    "Goldman Sachs RegTech Labs",
                    Instant.now()
            );
            userRepository.save(analyst);
        }

        // Seed Admin into Database
        if (!userRepository.existsByEmailIgnoreCase("admin@riskradar.io")) {
            UserEntity admin = new UserEntity(
                    UUID.randomUUID().toString(),
                    "admin@riskradar.io",
                    passwordEncoder.encode("admin123"),
                    "Lead Compliance Officer",
                    Role.ROLE_ADMIN,
                    "RiskRadar Global Surveillance",
                    Instant.now()
            );
            userRepository.save(admin);
        }

        // Populate cache from DB
        userRepository.findAll().forEach(entity -> {
            cache.put(entity.getEmail().toLowerCase(), entityToModel(entity));
        });
    }

    public User registerUser(SignupRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new IllegalArgumentException("User with email " + req.getEmail() + " already exists in database");
        }

        UserEntity entity = new UserEntity(
                UUID.randomUUID().toString(),
                normalizedEmail,
                passwordEncoder.encode(req.getPassword()),
                req.getFullName().trim(),
                req.getRole() != null ? req.getRole() : Role.ROLE_ANALYST,
                req.getInstitution().trim(),
                Instant.now()
        );

        UserEntity saved = userRepository.save(entity);
        User model = entityToModel(saved);
        cache.put(normalizedEmail, model);
        return model;
    }

    public User authenticate(LoginRequest req) {
        String normalizedEmail = req.getEmail().trim().toLowerCase();
        Optional<UserEntity> entityOpt = userRepository.findByEmailIgnoreCase(normalizedEmail);
        
        if (entityOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), entityOpt.get().getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        User user = entityToModel(entityOpt.get());
        cache.put(normalizedEmail, user);
        return user;
    }

    public User findByEmail(String email) {
        if (email == null) return null;
        String normalized = email.trim().toLowerCase();
        User cached = cache.get(normalized);
        if (cached != null) return cached;

        return userRepository.findByEmailIgnoreCase(normalized)
                .map(this::entityToModel)
                .orElse(null);
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

    private User entityToModel(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getEmail(),
                entity.getPasswordHash(),
                entity.getFullName(),
                entity.getRole(),
                entity.getInstitution(),
                entity.getCreatedAt()
        );
    }
}
