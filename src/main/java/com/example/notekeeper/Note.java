package com.example.notekeeper;

import java.sql.Timestamp;
import java.util.UUID;

public class Note {
    
    private final UUID id = new UUID(0L, 0L);
    public String headline = "";
    public String text = "";
    private final Timestamp timestamp;

    public Note() {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public UUID getId() {
        return this.id;
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
