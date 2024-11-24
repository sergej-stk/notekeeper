package com.example.notekeeper.friendapi.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.friendapi.entities.ChatRoom;

@Repository
public interface ChatRoomRepository extends CrudRepository<ChatRoom, Integer> {

    }