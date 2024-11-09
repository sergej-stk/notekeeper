package com.example.notekeeper;

import java.sql.Timestamp;

import com.example.notekeeper.requests.PostRequestBody;

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
        return 
            "Note{" + 
            "id=" + id +
            ", headline='" + headline + '\'' +
            ", text='" + text + '\'' + 
            ", timestamp=" + timestamp.toString() +
            "}";
    }

    public static Note noteFromBody(PostRequestBody body) {
        Note note = new Note();
        note.headline = "body.headline";
        note.text = body.text;
        return note;
    }
}
