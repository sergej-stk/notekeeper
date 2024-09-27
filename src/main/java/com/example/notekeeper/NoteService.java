package com.example.notekeeper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class NoteService {
    public List<Note> getAll()
    {
        List<Note> notelist = new ArrayList<>();
        notelist.add(new Note());
        return notelist;
    }
}
