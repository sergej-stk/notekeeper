package com.example.notekeeper.friendapi.services;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.repositories.UserRepository;
import com.example.notekeeper.friendapi.entities.Friend;
import com.example.notekeeper.friendapi.repositories.FriendRepository;
import com.example.notekeeper.socket.SocketServer;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    public FriendService(UserRepository userRepository, FriendRepository friendRepository, SocketServer socketServer) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public Friend getFriendship(User user, User target) {
        return this.friendRepository.findByUserAndTarget(user, target).orElse(null);
    }
}