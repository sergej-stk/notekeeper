package com.example.notekeeper;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.notekeeper.requests.PostRequestBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/v3/notes")
public class NoteController {
    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;

        Note note = new Note();
        note.headline = "head";
        note.text = "text";
        
        this.service.post(note);

        note = new Note();
        note.headline = "head";
        note.text = "text";
        
        this.service.post(note);
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Note>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
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
        try {
            System.out.println("post data+: " + note.toString());
            Note result = service.post(Note.noteFromBody(note));
            String requestUrl = request.getRequestURL().toString();
            response.setHeader("location", requestUrl + "/" + result.id);
            response.setStatus(201);
            response.getWriter().write(result.toString());
            response.getWriter().flush();
            //return result == null ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR) : new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (IOException ex) {
        }
    }

    @PutMapping
    @CrossOrigin
    public ResponseEntity<Note> put(@PathVariable int id, @RequestBody PostRequestBody note) {
        Note result = service.put(id, Note.noteFromBody(note));
        return result == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<?> delete(@PathVariable int id) {
        boolean success = service.delete(id);

        if (success) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
