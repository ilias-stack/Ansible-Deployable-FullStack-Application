package cherkaoui.soulaimane.chatbot.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Question {
    @JsonProperty("question")
    private String question;

    @JsonProperty("answers")
    private List<Answer> answers;

    @JsonProperty("explication")
    private String explication;

    // Getters and Setters

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public String getExplication() {
        return explication;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }}

