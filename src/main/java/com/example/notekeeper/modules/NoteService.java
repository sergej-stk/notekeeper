package com.example.notekeeper.modules;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note getOne(int id)
    {
        Optional<?> op = this.noteRepository.findById(id);

        if (!op.isPresent()) {
            return null;
        }

        return (Note) op.get();
    }

    public List<Note> find(String string) {
        List<Note> noteList = this.getAll();
        List<Note> foundNotes = new ArrayList<>();

        for (Note note : noteList) {
            if (!note.text.contains(string)) {
                continue;
            }
            foundNotes.add(note);
        }

        return foundNotes;
    }

    public List<Note> getAll()
    {
        return (List<Note>) this.noteRepository.findAll();
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
        Note savedNote = this.noteRepository.save(note);
        return savedNote;
    }

    public boolean delete(Integer id)
    {
        Note note = this.getOne(id);

        if (note == null) {
            return false;
        }

        this.noteRepository.delete(note);
        return true;
    }
}
