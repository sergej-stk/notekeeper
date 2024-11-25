package com.example.notekeeper.friendapi.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.friendapi.entities.ChatRoom;
import com.example.notekeeper.friendapi.entities.Friend;

@Repository
public interface ChatRoomRepository extends CrudRepository<ChatRoom, Integer> {

}