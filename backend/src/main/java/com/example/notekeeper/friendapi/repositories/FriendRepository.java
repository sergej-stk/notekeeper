package com.example.notekeeper.friendapi.repositories;

import java.util.List;
import java.util.Optional;

import com.example.notekeeper.friendapi.entities.ChatRoom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.friendapi.entities.Friend;

// https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html
@Repository
public interface FriendRepository extends CrudRepository<Friend, Integer> {
    Optional<Friend> findByUser(User user);
    Optional<Friend> findByTarget(User user);

    @Query("select f from Friend f where f.user = ?1 and f.target = ?2 or f.user = ?2 and f.target = ?1")
    Optional<Friend> findByUserAndTarget(User user, User target);

    @Query("select f from Friend f where f.user = ?1 or f.target = ?1")
    List<Friend> findByUserOrTarget(User user);
}