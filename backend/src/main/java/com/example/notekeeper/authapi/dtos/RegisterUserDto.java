package com.example.notekeeper.authapi.dtos;

public class RegisterUserDto {
    private String email;
    
    private String password;
    
    private String fullName;
    
    // getters and setters here...
    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setEmail(String value) {
        this.email = value;
    }

    public void setPassword(String value) {
        this.password = value;
    }

    public void setFullName(String value) {
        this.fullName = value;
    }
}