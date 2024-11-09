package com.example.notekeeper.requests;

public class PostRequestBody {
    private String headline = "";
    public String text = "";

    public String toString() {
        return "Headline: " + this.headline + " Text: " + this.text;
    }
}
