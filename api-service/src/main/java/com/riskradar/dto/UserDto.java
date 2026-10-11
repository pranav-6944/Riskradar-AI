package com.riskradar.dto;

import com.riskradar.model.Role;
import java.time.Instant;

public class UserDto {
    private String id;
    private String email;
    private String fullName;
    private Role role;
    private String institution;
    private Instant createdAt;

    public UserDto() {}

    public UserDto(String id, String email, String fullName, Role role, String institution, Instant createdAt) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.institution = institution;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
