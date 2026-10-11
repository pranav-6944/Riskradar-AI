package com.riskradar.controller;

import com.riskradar.dto.AuthResponse;
import com.riskradar.dto.LoginRequest;
import com.riskradar.dto.SignupRequest;
import com.riskradar.dto.UserDto;
import com.riskradar.model.User;
import com.riskradar.security.JwtTokenProvider;
import com.riskradar.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserService userService, JwtTokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
        try {
            User user = userService.registerUser(request);
            String token = tokenProvider.generateToken(user);
            AuthResponse response = new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole(),
                    user.getInstitution()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.authenticate(request);
            String token = tokenProvider.generateToken(user);
            AuthResponse response = new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole(),
                    user.getInstitution()
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User is not authenticated"));
        }
        UserDto dto = userService.toDto(user);
        return ResponseEntity.ok(dto);
    }
}
