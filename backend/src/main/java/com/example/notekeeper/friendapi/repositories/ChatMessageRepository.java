package com.example.notekeeper.friendapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.friendapi.entities.ChatMessage;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    Optional<Iterable<ChatMessage>> findAllByChatRoomId(Integer id);
}