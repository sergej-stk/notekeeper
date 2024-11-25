package com.example.notekeeper.friendapi.services;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.repositories.UserRepository;
import com.example.notekeeper.socket.SocketServer;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendService {
    private final UserRepository userRepository;

    public FriendService(UserRepository userRepository, SocketServer socketServer) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}