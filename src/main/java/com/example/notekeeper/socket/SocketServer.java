package com.example.notekeeper.socket;

import java.io.IOException;
import java.util.HashMap;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;


import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.example.notekeeper.authapi.services.JwtService;

import jakarta.servlet.ServletException;

public class SocketServer {
 
    private final SocketIOServer socketIoServer; 

    private HashMap<String, SocketIONamespace> namespaces = new HashMap<String, SocketIONamespace>();

    public SocketServer(String host, Integer port) {
        Configuration configuration = new Configuration();
        configuration.setAuthorizationListener(new SocketAuthorizationListener());

        configuration.setHostname(host);
        configuration.setPort(port);

        this.socketIoServer = new SocketIOServer(configuration);
        this.socketIoServer.start();
    }

    public void registerNamespace(String name) {
        SocketIONamespace namespace = this.socketIoServer.addNamespace(name);
        this.namespaces.put(name, namespace);
    }   

    public SocketIONamespace getNamespace(String name) {
        return this.namespaces.get(name);
    }

    public SocketIOServer getSocketIoServer() {
        return this.socketIoServer;
    }

}
