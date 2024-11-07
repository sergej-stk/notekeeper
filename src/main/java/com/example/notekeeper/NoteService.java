package com.example.notekeeper;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private List<Note> notelist = new ArrayList<>();

    public Note get(UUID id)
    {
        Note foundNote = null;

        for (Note note : notelist) {
            if (note.getId() == id) {
                foundNote = note;
                break;
            }
        }

        return foundNote;
    }

    public List<Note> getAll()
    {
        return notelist;
    }

    public Note post(Note note)
    {
        notelist.add(note);
        return note;
    }

    public boolean delete(UUID id)
    {
        Note note = this.get(id);

        if (note == null) {
            return false;
        }

        notelist.remove(notelist.indexOf(note));
        return true;
    }
}
