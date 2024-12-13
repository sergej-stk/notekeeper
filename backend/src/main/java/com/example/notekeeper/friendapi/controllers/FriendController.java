package com.example.notekeeper.friendapi.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.repositories.UserRepository;
import com.example.notekeeper.friendapi.entities.Friend;
import com.example.notekeeper.friendapi.repositories.FriendRepository;
import com.example.notekeeper.validation.GrpcValidation;

import pb.FriendService;
import pb.FriendService.AddFriendRequest;
import pb.FriendService.AddFriendResponse;
import pb.FriendService.AnswerAddFriendRequest;
import pb.FriendServiceValidator.AddFriendRequestValidator;
import pb.FriendServiceValidator.AnswerAddFriendRequestValidator;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/v3/friend")
@RestController
public class FriendController {

    UserRepository userRepository = null;
    FriendRepository friendRepository = null;

    @Autowired
    public FriendController(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    
   @RequestMapping(method = RequestMethod.POST, produces = "application/json")
   @CrossOrigin
   @GrpcValidation(validatorClass = AddFriendRequestValidator.class)
    public @ResponseBody AddFriendResponse addFriend(@RequestBody AddFriendRequest addFriendRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        User targetUser = this.userRepository.findByEmail(addFriendRequest.getUsername()).orElse(null);

        if (targetUser == null) {
            return null;
        }

        Friend friend = new Friend();
        friend.setUser(currentUser);
        friend.setTarget(targetUser);
        friend.setAccapted(false);
        this.friendRepository.save(friend);

        return AddFriendResponse.newBuilder().setSuccess(true).build(); 
    }

    @RequestMapping(value = "/answer", method = RequestMethod.POST, produces = "application/json")
    @CrossOrigin
    @GrpcValidation(validatorClass = AnswerAddFriendRequestValidator.class)
    public @ResponseBody Boolean answerFriend(@RequestBody AnswerAddFriendRequest answerAddFriendRequest) {
        User user = this.userRepository.findByEmail(answerAddFriendRequest.getUsername()).orElse(null);

        if (user == null) {
            return null;
        }

        Friend friend = this.friendRepository.findByUser(user).orElse(null);

        if (friend == null) {
            return null;
        }   
        
        friend.setAccapted(answerAddFriendRequest.getAccept());
        this.friendRepository.save(friend);
        return true; 
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    @CrossOrigin
    public @ResponseBody FriendService.GetFriendListResponse getFriends() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        List<Friend> dbFriends = this.friendRepository.findByUserOrTarget(currentUser);

        if (dbFriends == null) {
            return null;
        }

        List<FriendService.Friend> friends = new ArrayList<>();

        for (Friend friend : dbFriends) {
            String friendUsername = friend.getOther(currentUser).getUsername();

            friends.add(FriendService.Friend.newBuilder().setUsername(friendUsername).setAccept(friend.getAccepted()).build());
        }

        return FriendService.GetFriendListResponse.newBuilder().addAllFriends(friends).build();
    }
}