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
