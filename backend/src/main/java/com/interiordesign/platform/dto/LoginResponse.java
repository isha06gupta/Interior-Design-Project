package com.interiordesign.platform.dto;

public class LoginResponse {
    private String token;
    private String email;
    private Long id;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, Long id) {
        this.token = token;
        this.email = email;
        this.id = id;
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
}