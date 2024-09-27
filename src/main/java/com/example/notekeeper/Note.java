package com.example.notekeeper;

import java.sql.Timestamp;
import java.util.UUID;

public class Note {
    public UUID id = new UUID(0L, 0L);
    public String headline = "";
    public String text = "";
    public Timestamp timestamp;

    public Note() {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    @Override
    public String toString() {
        return 
            "Note{" + 
            "id=" + id.toString() +
            ", headline='" + headline + '\'' +
            ", text='" + text + '\'' + 
            ", timestamp=" + timestamp.toString()    +
            "}"; 
    }
}
