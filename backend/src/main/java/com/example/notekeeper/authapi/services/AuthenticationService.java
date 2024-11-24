package com.example.notekeeper.authapi.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.notekeeper.authapi.dtos.LoginUserDto;
import com.example.notekeeper.authapi.dtos.RegisterUserDto;
import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.repositories.UserRepository;
import com.example.notekeeper.validation.GrpcValidation;

import pb.AuthService;
import pb.AuthService.LoginRequest;
import pb.AuthService.RegisterRequest;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterRequest input) {
        User user = new User()
                .setFullName(input.getFullName())
                .setEmail(input.getUsername())
                .setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }


    public User authenticate(LoginRequest input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getUsername())
                .orElseThrow();
    }
}