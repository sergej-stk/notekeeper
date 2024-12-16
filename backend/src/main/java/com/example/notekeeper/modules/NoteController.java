package com.example.notekeeper.modules;

import java.io.IOException;
import java.util.List;

import com.example.notekeeper.authapi.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.corundumstudio.socketio.HandshakeData;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.example.notekeeper.requests.PostRequestBody;
import com.example.notekeeper.socket.SocketServer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v3/notes")
public class NoteController {

        private final NoteService service;

    private static final Logger log = LoggerFactory.getLogger(NoteController.class);

    private final SocketIONamespace namespace;

    @Autowired
    public NoteController(NoteService service, SocketServer server) {
        this.service = service;

        /*Note note = new Note();
        note.headline = "head";
        note.text = "text";

        this.service.post(note);

        note = new Note();
        note.headline = "head";
        note.text = "text";

        this.service.post(note);
*/
        this.namespace = server.getNamespace("/notes").getSocketIoNamespace();
        //this.namespace.addConnectListener(onConnected());
        // this.namespace.addDisconnectListener(onDisconnected());
        //this.namespace.addEventListener("addNote", PostRequestBody.class, onChatReceived());   
        //server.start();     
    }

    /* DataListener<PostRequestBody> onChatReceived() {
        return (client, data, ackSender) -> {
            log.debug("Client[{}] - Received chat message '{}'", client.getSessionId().toString(), data);
            namespace.getBroadcastOperations().sendEvent("chat", data);
        };
    }

    private ConnectListener onConnected() {
        return client -> {
            HandshakeData handshakeData = client.getHandshakeData();
            log.debug("Client[{}] - Connected to chat module through '{}'", client.getSessionId().toString(), handshakeData.getUrl());
            client.sendEvent("chat", "welcome");
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.debug("Client[{}] - Disconnected from chat module.", client.getSessionId().toString());
        };
    }*/
    @GetMapping
    @CrossOrigin
    public @ResponseBody pb.NoteService.GetAllNotesResponse getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<Note> getOne(@PathVariable int id) {
        Note result = service.getOne(id);
        return result == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    @CrossOrigin
    public void post(@RequestBody PostRequestBody note, HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        try {
            System.out.println("post data+: " + note.toString());
            Note result = service.post(Note.noteFromBody(note, currentUser));
            String requestUrl = request.getRequestURL().toString();
            this.namespace.getBroadcastOperations().sendEvent("addNote", result);
            response.setHeader("location", requestUrl + "/" + result.id);
            response.setStatus(201);
            response.getWriter().write(result.toString());
            response.getWriter().flush();
            //return result == null ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR) : new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (IOException ex) {
        }
    }

    @PutMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<Note> put(@PathVariable int id, @RequestBody PostRequestBody note) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Note result = service.put(id, Note.noteFromBody(note, currentUser));
        this.namespace.getBroadcastOperations().sendEvent("editNote", result);
        return result == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean success = service.delete(id);

        if (success) {
            this.namespace.getBroadcastOperations().sendEvent("removeNote", id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/find")
    @CrossOrigin
    public List<Note> find(@RequestParam("search") String search) {
        return service.find(search);
    }
}
