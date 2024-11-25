package com.example.notekeeper.friendapi.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.friendapi.entities.Friend;

@Repository
public interface FriendRepository extends CrudRepository<Friend, Integer> {
    Optional<Friend> findByUser(User user);
    Optional<Friend> findByTarget(User user);
}