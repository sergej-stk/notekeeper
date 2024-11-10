package com.example.notekeeper;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final List<Note> notelist = new ArrayList<>();

    private int nextId = 0;

    public Note getOne(int id)
    {
        Note foundNote = null;

        for (Note note : notelist) {
            if (Objects.equals(note.getId(), id)) {
                foundNote = note;
                break;
            }
        }

        return foundNote;
    }

    private int getNextId() {
        final int id = nextId;
        nextId++;
        return id;
    }

    public List<Note> getAll()
    {
        return notelist;
    }

    public Note put(int id, Note node) {
        Note foundNote = this.getOne(id);

        if (foundNote == null) {
            return null;
        }
        foundNote.headline = node.headline;
        foundNote.text = node.text;
        return foundNote;
    }

    public Note post(Note note)
    {
        if (note.getId() == -1) {
            note.setId(this.getNextId());
        }
        notelist.add(note);
        return note;
    }

    public boolean delete(Integer id)
    {
        Note note = this.getOne(id);

        if (note == null) {
            return false;
        }

        notelist.remove(notelist.indexOf(note));
        return true;
    }
}
