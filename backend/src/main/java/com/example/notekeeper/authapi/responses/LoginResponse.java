package com.example.notekeeper.authapi.responses;

public class LoginResponse {
    private String token;

    private long expiresIn;

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String value) {
        this.token = value;
        return this;
    }

    public LoginResponse setExpiresIn(long value) {
        this.expiresIn = value;
        return this;
    }
 // Getters and setters...
}