package com.example.notekeeper;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class NoteService {
    public Note get(UUID id)
    {
        return new Note();            
    }

    public List<Note> getAll()
    {
        List<Note> notelist = new ArrayList<>();
        notelist.add(new Note());

        return notelist;
    }

    public Note post(Note note)
    {
        return note;
    }

    public boolean delete(UUID id)
    {
        return true;
    }
}
