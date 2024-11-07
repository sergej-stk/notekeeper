package com.example.notekeeper;

import java.sql.Timestamp;

public class Note {
    
    private Integer id = -1;
    public String headline = "";
    public String text = "";
    private final Timestamp timestamp;

    public Note() {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Integer getId() {
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
