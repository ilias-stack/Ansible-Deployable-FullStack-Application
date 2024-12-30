package cherkaoui.soulaimane.chatbot.mappers;

import cherkaoui.soulaimane.chatbot.entities.Answer;
import cherkaoui.soulaimane.chatbot.entities.Question;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonConverter {

    public static Question convertJsonStringToQuestion(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonString, Question.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        String jsonString = """
        {
            "question": "The question text.",
            "answers": [
                {"text": "Answer 1", "correct": true},
                {"text": "Answer 2", "correct": false},
                {"text": "Answer 3", "correct": false},
                {"text": "Answer 4", "correct": false}
            ],
            "explication": "Explication of why it's the correct answer and not the others."
        }
        """;

        Question question = convertJsonStringToQuestion(jsonString);
        if (question != null) {
            System.out.println("Question: " + question.getQuestion());
            for (Answer answer : question.getAnswers()) {
                System.out.println("Answer: " + answer.getText() + " - Correct: " + answer.isCorrect());
            }
            System.out.println("Explication: " + question.getExplication());
        } else {
            System.out.println("Failed to convert JSON string to Question object.");
        }
    }
}
