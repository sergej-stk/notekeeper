package com.example.notekeeper.socket;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import com.example.notekeeper.authapi.services.JwtService;

public class SocketAuthorizationListener implements AuthorizationListener {

    @Override
    public AuthorizationResult getAuthorizationResult(HandshakeData data) {
        // TODO Auto-generated method stub
        return new AuthorizationResult(checkIsAuthorized(data));
    }

    private boolean checkIsAuthorized(HandshakeData data) {
        String authHeader = data.getHttpHeaders().get("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer:")) {
            return false;
        }

        JwtService jwtService = new JwtService();
        final String jwt = authHeader.substring(7);
        if (jwt.equals("null")) {
            return false;
        }

        final String userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null) {
            UserDetails userDetails = new User(userEmail, "", new ArrayList<>());

            return jwtService.isTokenValid(jwt, userDetails);
        }

        return false;
    }

}
