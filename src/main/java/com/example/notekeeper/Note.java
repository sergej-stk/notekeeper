package com.example.notekeeper;

import java.sql.Timestamp;

import com.example.notekeeper.requests.PostRequestBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Note {
    
    public int id = -1;
    public String headline = "";
    public String text = "";
    public final Timestamp timestamp;

    public Note() {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    @Override
    public String toString() {
        try {
            ObjectMapper om = new ObjectMapper();
            return om.writeValueAsString(this);
        } catch (JsonProcessingException ex) {
            return null;
        }
    }

    public static Note noteFromBody(PostRequestBody body) {
        Note note = new Note();
        note.headline = "body.headline";
        note.text = body.text;
        return note;
    }
}
