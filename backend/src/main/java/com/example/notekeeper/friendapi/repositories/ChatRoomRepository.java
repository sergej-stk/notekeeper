package com.example.notekeeper.friendapi.repositories;

import com.example.notekeeper.authapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.friendapi.entities.ChatRoom;

import java.util.List;
import java.util.Optional;

// https://springjava.com/spring-data-jpa/find-by-contains/
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    List<ChatRoom> findByUsersIn(List<User> users);
}