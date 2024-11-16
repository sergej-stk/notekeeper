package com.example.notekeeper.authapi.dtos;

public class LoginUserDto {
    private String email;
    
    private String password;
    
    // getters and setters here...
    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setEmail(String value) {
        this.email = value;
    }

    public void setPassword(String value) {
        this.password = value;
    }
}