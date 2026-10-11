package com.riskradar.dto;

import com.riskradar.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private Role role;
    private String institution;

    public SignupRequest() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Role getRole() { return role != null ? role : Role.ROLE_ANALYST; }
    public void setRole(Role role) { this.role = role; }

    public String getInstitution() { return institution != null && !institution.isBlank() ? institution : "Independent"; }
    public void setInstitution(String institution) { this.institution = institution; }
}
