package com.interiordesign.platform.dto;

public class LoginResponse {
    private String token;
    private String email;
    private Long id;
    private String name;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, Long id) {
        this.token = token;
        this.email = email;
        this.id = id;
    }

    public LoginResponse(String token, String email, Long id, String name, String role) {
        this.token = token;
        this.email = email;
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}