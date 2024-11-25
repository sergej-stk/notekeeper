package com.example.notekeeper.authapi.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.services.AuthenticationService;
import com.example.notekeeper.authapi.services.JwtService;
import com.example.notekeeper.validation.GrpcValidation;

import pb.AuthService.LoginResponse;
import pb.AuthService.RegisterRequest;
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

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    @CrossOrigin
    @GrpcValidation(validatorClass = pb.AuthServiceValidator.LoginRequestValidator.class)
    public @ResponseBody LoginResponse authenticate(@RequestBody pb.AuthService.LoginRequest loginUserDto) {
   //   try {

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

       LoginResponse lr = LoginResponse.newBuilder().setToken(jwtToken).build();

      //  response.setStatus(200);
       // response.getWriter().write(result.toString());
        //response.getWriter().flush();
        return lr;
    //  } catch (IOException e) {
    //    return ResponseEntity.notFound();
    //  }
    }
}