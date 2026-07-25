import { describe, it, expect } from "vitest";
import store, { choose, reset } from "../store/store";
import { QuestionData } from "../model/trivia.model";

describe("Redux Store", () => {
  const mockQuestion: QuestionData = {
    id: 1,
    category: "Science",
    correct_answer: "Paris",
    question: "What is the capital of France?",
    type: "multiple",
    incorrect_answers: ["London", "Berlin", "Madrid"],
    currentAnswer: "Paris",
  };

  it("should have initial empty answers state", () => {
    const state = store.getState();
    expect(state.answer.answers).toEqual([]);
  });

  it("should add answer when choose action is dispatched", () => {
    store.dispatch(choose(mockQuestion));

    const state = store.getState();
    expect(state.answer.answers).toHaveLength(1);
    expect(state.answer.answers[0]).toEqual(mockQuestion);
  });

  it("should update existing answer instead of adding duplicate", () => {
    // Add first answer
    store.dispatch(choose(mockQuestion));

    // Update same question with different answer
    const updatedQuestion = { ...mockQuestion, currentAnswer: "London" };
    store.dispatch(choose(updatedQuestion));

    const state = store.getState();
    expect(state.answer.answers).toHaveLength(1);
    expect(state.answer.answers[0].currentAnswer).toBe("London");
  });

  it("should handle multiple different questions", () => {
    const question1: QuestionData = {
      id: 1,
      category: "Science",
      correct_answer: "Paris",
      question: "What is the capital of France?",
      type: "multiple",
      incorrect_answers: ["London", "Berlin", "Madrid"],
      currentAnswer: "Paris",
    };

    const question2: QuestionData = {
      id: 2,
      category: "Math",
      correct_answer: "4",
      question: "What is 2+2?",
      type: "multiple",
      incorrect_answers: ["3", "5", "6"],
      currentAnswer: "4",
    };

    store.dispatch(reset());
    store.dispatch(choose(question1));
    store.dispatch(choose(question2));

    const state = store.getState();
    expect(state.answer.answers).toHaveLength(2);
    expect(state.answer.answers[0].id).toBe(1);
    expect(state.answer.answers[1].id).toBe(2);
  });

  it("should clear all answers when reset action is dispatched", () => {
    // Add some answers
    store.dispatch(choose(mockQuestion));

    // Reset
    store.dispatch(reset());

    const state = store.getState();
    expect(state.answer.answers).toEqual([]);
  });

  it("should preserve other question properties when updating answer", () => {
    const initialQuestion: QuestionData = {
      id: 5,
      category: "History",
      correct_answer: "1945",
      question: "When did WWII end?",
      type: "multiple",
      incorrect_answers: ["1944", "1946", "1943"],
      currentAnswer: "1944",
    };

    store.dispatch(reset());
    store.dispatch(choose(initialQuestion));

    const updatedQuestion = { ...initialQuestion, currentAnswer: "1945" };
    store.dispatch(choose(updatedQuestion));

    const state = store.getState();
    const savedQuestion = state.answer.answers[0];

    expect(savedQuestion.category).toBe("History");
    expect(savedQuestion.correct_answer).toBe("1945");
    expect(savedQuestion.question).toBe("When did WWII end?");
    expect(savedQuestion.currentAnswer).toBe("1945");
  });
});
