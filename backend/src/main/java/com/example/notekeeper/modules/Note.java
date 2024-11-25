package com.example.notekeeper.modules;

import java.sql.Timestamp;

import com.example.notekeeper.requests.PostRequestBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Note {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public int id = -1;
    public String headline = "";
    public String text = "";
    public final Timestamp timestamp;

    public Note() {
        this.timestamp = new Timestamp(System.currentTimeMillis());
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
