package com.example.notekeeper.friendapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    private final SocketIONamespace chatNamespace;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatService(SocketServer socketServer, UserRepository userRepository, ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository) {
        this.socketServer = socketServer;
        this.userRepository = userRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatNamespace = this.socketServer.getNamespace("/chat").getSocketIoNamespace();
    }

    public StartChatResponse startChat(StartChatRequest request) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setName("test");
        List<String> users = request.getUsernamesList();
        for (String username : users) {
            User user = this.userRepository.findByEmail(username).orElse(null);
            if (user == null) {
                continue;
            }
            chatRoom.addUser(user);
        }

        chatRoom = this.chatRoomRepository.save(chatRoom);

        return StartChatResponse.newBuilder().setChatRoomId(chatRoom.getId()).build();
    }  
    
    public boolean addChatMessage(Integer id, SendChatMessageRequest request) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).orElse(null);

        if (chatRoom == null) {
            return false;
        }

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setText(request.getChatMessage().getMessage());
        chatMessage.setChatRoom(chatRoom);
        chatRoom.getChatMessages().add(chatMessage);

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
