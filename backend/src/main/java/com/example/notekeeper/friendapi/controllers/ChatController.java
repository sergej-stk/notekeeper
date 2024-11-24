package com.example.notekeeper.friendapi.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.notekeeper.friendapi.services.ChatService;
import com.example.notekeeper.validation.GrpcValidation;

import pb.ChatService.GetAllChatMessagesResponse;
import pb.ChatService.SendChatMessageRequest;
import pb.ChatService.StartChatRequest;
import pb.ChatService.StartChatResponse;
import pb.ChatServiceValidator.SendChatMessageRequestValidator;
import pb.ChatServiceValidator.StartChatRequestValidator;

@RequestMapping("/api/v3/chat")
@RestController
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    
   @RequestMapping(method = RequestMethod.POST, produces = "application/json")
   @CrossOrigin
   @GrpcValidation(validatorClass = StartChatRequestValidator.class)
    public @ResponseBody StartChatResponse startChat(@RequestBody StartChatRequest request) {
        return this.chatService.startChat(request);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST, produces = "application/json")
    @CrossOrigin
    @GrpcValidation(validatorClass = SendChatMessageRequestValidator.class)
    public @ResponseBody Boolean sendChatMessage(@PathVariable Integer id, @RequestBody SendChatMessageRequest request) {
        request = request.toBuilder().setRoomId(id).build();
        return this.chatService.addChatMessage(id, request);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    @CrossOrigin
    public @ResponseBody GetAllChatMessagesResponse getAllChatMessages(@PathVariable Integer id) {
        return this.chatService.getAllChatMessages(id);
    }


}