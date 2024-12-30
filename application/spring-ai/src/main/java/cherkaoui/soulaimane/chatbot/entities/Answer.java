package cherkaoui.soulaimane.chatbot.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Answer {
    @JsonProperty("text")
    private String text;

    @JsonProperty("correct")
    private boolean correct;

    // Getters and Setters

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
}

