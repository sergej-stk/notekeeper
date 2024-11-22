package com.example.notekeeper.authapi.controller;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.notekeeper.authapi.dtos.LoginUserDto;
import com.example.notekeeper.authapi.dtos.RegisterUserDto;
import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.services.AuthenticationService;
import com.example.notekeeper.authapi.services.JwtService;
import com.example.notekeeper.validation.GrpcValidation;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pb.AuthService.RegisterRequest;
import pb.AuthService.Session;
import pb.AuthServiceValidator;

@RequestMapping("/api/v3/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    @CrossOrigin
    @GrpcValidation(validatorClass = AuthServiceValidator.RegisterRequestValidator.class)
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    @CrossOrigin
    @GrpcValidation(validatorClass = pb.AuthServiceValidator.LoginRequestValidator.class)
    public void authenticate(@RequestBody pb.AuthService.LoginRequest loginUserDto, HttpServletRequest request, HttpServletResponse response) {
      try {

        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);
        //Cookie jwtTokenCookie = new Cookie("token", "Bearer:" + jwtToken);

        //jwtTokenCookie.setMaxAge(86400);
        //jwtTokenCookie.setSecure(true);
        //jwtTokenCookie.setHttpOnly(true);
        //jwtTokenCookie.setPath("/");
        //jwtTokenCookie.setDomain("localhost");
       // LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());
       // response.addCookie(jwtTokenCookie);
ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
ByteArrayOutputStream stream
            = new ByteArrayOutputStream();
Session.newBuilder().setSessionId(jwtToken).build().writeTo(stream);

String finalString = new String(stream.toByteArray());
String carAsString = mapper.writeValueAsString(finalString);
       
        response.setStatus(200);
        response.getWriter().write(carAsString);
       // response.getWriter().write(result.toString());
        response.getWriter().flush();
      } catch (IOException e) {
        response.setStatus(500);
      }
    }
}