package com.example.notekeeper;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/v1/notes")
public class NoteController {
    private final NoteService service;

    public NoteController(NoteService service) {            
        this.service = service;
    }
    
    @GetMapping
    public List<Note> getAll() {
        return service.getAll();                                        
    }
}
