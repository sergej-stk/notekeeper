package com.example.notekeeper.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;

import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

public class SocketNamespace {
    private final SocketIONamespace namespace;

    private final HashMap<String, ArrayList<UUID>> usersSessions = new HashMap<>();
    private final HashMap<String, ArrayList<String>> userRooms = new HashMap<>();

    public SocketNamespace(SocketIOServer socketIoServer, String name) {
        this.namespace = socketIoServer.addNamespace(name);
        this.namespace.addConnectListener(onConnected());
        this.namespace.addDisconnectListener(onDisconnected());
    }

    private ConnectListener onConnected() {
        return client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            String userEmail = handshakeData.getHttpHeaders().get("x-username");

            ArrayList<UUID> userSessions = usersSessions.get(userEmail);

            if (userSessions == null) {
                userSessions = new ArrayList<UUID>();
                usersSessions.put(userEmail, userSessions);
            }

            userSessions.add(client.getSessionId());

            ArrayList<String> rooms = userRooms.get(userEmail);

            if (rooms == null) {
                rooms = new ArrayList<String>();
                userRooms.put(userEmail, rooms);
                return;
            }
            
            if (rooms.size() == 0) {
                return;
            }

            for (String room : rooms) {
                System.out.println("Join room " + userEmail);
                client.joinRoom(room);
                client.sendEvent("join-room", room);
            }
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            String userEmail = handshakeData.getHttpHeaders().get("x-username");

            ArrayList<UUID> userSessions = usersSessions.get(userEmail);

            if (userSessions == null) {
                userSessions = new ArrayList<UUID>();
                usersSessions.put(userEmail, userSessions);
                return;
            }

            userSessions.remove(client.getSessionId());
        };
    }

    public void addUserToRoom(String username, String room) {
        ArrayList<String> rooms = userRooms.get(username);

        if (rooms == null) {
            rooms = new ArrayList<String>();
            userRooms.put(username, rooms);
            return;
        }

        if (rooms.contains(room)) {
            //Error
            return;
        }
        ArrayList<SocketIOClient> clients = getClientsByUsername(username);
        for (SocketIOClient client : clients) {
            System.out.println("Join room " + username);
            client.joinRoom(room);
            client.sendEvent("join-room", room);
        }
        rooms.add(room);
    }

    public void removeUserFromRoom(String username, String room) {
        ArrayList<String> rooms = userRooms.get(username);

        if (rooms != null) {
            rooms.remove(room);
        }

        ArrayList<SocketIOClient> clients = getClientsByUsername(username);
        for (SocketIOClient client : clients) {
            client.leaveRoom(room);
        }
    }

    public ArrayList<SocketIOClient> getClientsByUsername(String username) {
        ArrayList<SocketIOClient> clients = new ArrayList<>();

        for (UUID uuid : usersSessions.get(username)) {
            clients.add(this.namespace.getClient(uuid));
        }

        return clients;
    }

    public SocketIONamespace getSocketIoNamespace() {
        return this.namespace;
    }
}
