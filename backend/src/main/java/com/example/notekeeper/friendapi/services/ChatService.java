package com.example.notekeeper.friendapi.services;

import java.util.ArrayList;
import java.util.List;

import com.example.notekeeper.authapi.services.UserService;
import com.example.notekeeper.friendapi.entities.Friend;
import com.example.notekeeper.socket.SocketNamespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIONamespace;
import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.repositories.UserRepository;
import com.example.notekeeper.friendapi.entities.ChatMessage;
import com.example.notekeeper.friendapi.entities.ChatRoom;
import com.example.notekeeper.friendapi.repositories.*;
import com.example.notekeeper.socket.SocketServer;

import pb.ChatService.GetAllChatMessagesResponse;
import pb.ChatService.SendChatMessageRequest;
import pb.ChatService.StartChatRequest;
import pb.ChatService.StartChatResponse;

@Service
public class ChatService {
    
    private final SocketServer socketServer;
    private final SocketNamespace chatNamespace;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final FriendService friendService;

    @Autowired
    public ChatService(SocketServer socketServer, UserRepository userRepository, ChatRoomRepository chatRoomRepository, FriendService friendService, ChatMessageRepository chatMessageRepository) {
        this.socketServer = socketServer;
        this.userRepository = userRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatNamespace = this.socketServer.getNamespace("/chat");
        this.friendService = friendService;
    }

    public StartChatResponse startChat(StartChatRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<String> usernames = request.getUsernamesList();
        List<User> users = new ArrayList<>();

        for (String username : usernames) {
            User user = this.userRepository.findByEmail(username).orElse(null);
            if (user == null) {
                // error
                return null;
            }

            // check firendship
            Friend friendship = this.friendService.getFriendship(currentUser, user);

            if (friendship == null) {
                return null;
            }

            users.add(user);
        }

        ChatRoom chatRoom = this.chatRoomRepository.findByUsersIn(users).get(0);

        if (chatRoom == null) {
            chatRoom = new ChatRoom();
        }

        for (User user : users) {
            if (chatRoom.getUsers().contains(user)) {
                continue;
            }
            chatRoom.addUser(user);
        }

        chatRoom.setName("test");

        chatRoom = this.chatRoomRepository.save(chatRoom);

        for (String username : usernames) {
            this.chatNamespace.addUserToRoom(username, chatRoom.getId().toString());
        }

        return StartChatResponse.newBuilder().setChatRoomId(chatRoom.getId()).build();
    }  
    
    public boolean addChatMessage(Integer id, SendChatMessageRequest request) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).orElse(null);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (!chatRoom.getUsers().contains(currentUser)) {
            // not a user
            return false;
        }

        if (chatRoom == null) {
            return false;
        }

        pb.ChatService.ChatMessage chatMessage = pb.ChatService.ChatMessage.newBuilder()
                .setUsername(currentUser.getUsername())
                .setMessage(request.getMessage())
                .build();

        this.chatNamespace.emitRoom(chatRoom.getId().toString(), "message", chatMessage);

        ChatMessage chatMessageEntity = new ChatMessage();
        chatMessageEntity.setText(request.getMessage());
        chatMessageEntity.setChatRoom(chatRoom);
        chatRoom.getChatMessages().add(chatMessageEntity);

        this.chatRoomRepository.save(chatRoom);
        return true;
    }

    public GetAllChatMessagesResponse getAllChatMessages(Integer id) {
        Iterable<ChatMessage> messages = this.chatMessageRepository.findAllByChatRoomId(id).orElse(new ArrayList<>());
        List<pb.ChatService.ChatMessage> chatMessages = new ArrayList<>();

        for (ChatMessage message : messages) {
            chatMessages.add(pb.ChatService.ChatMessage.newBuilder().setMessage(message.getText()).setUsername("test").build());
        }

        return GetAllChatMessagesResponse.newBuilder().addAllMessages(chatMessages).build();
    }



    
}
