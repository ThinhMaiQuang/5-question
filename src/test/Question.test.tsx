import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import Question from "../components/Question";
import { QuestionData } from "../model/trivia.model";

const mockQuestion: QuestionData = {
  id: 1,
  category: "Science",
  correct_answer: "Paris",
  question: "What is the capital of France?",
  type: "multiple",
  incorrect_answers: ["London", "Berlin", "Madrid"],
  answers: ["Paris", "London", "Berlin", "Madrid"],
};

const createMockStore = (initialAnswers: QuestionData[] = []) => {
  return configureStore({
    reducer: {
      answer: (state = { answers: initialAnswers }) => state,
    },
  });
};

describe("Question Component", () => {
  it("should render question text", () => {
    const store = createMockStore();
    const mockOnChange = vi.fn();

    render(
      <Provider store={store}>
        <Question
          question={mockQuestion}
          onlyView={false}
          onChangeOption={mockOnChange}
        />
      </Provider>,
    );

    expect(
      screen.getByText("What is the capital of France?"),
    ).toBeInTheDocument();
  });

  it("should render all answer options", () => {
    const store = createMockStore();
    const mockOnChange = vi.fn();

    render(
      <Provider store={store}>
        <Question
          question={mockQuestion}
          onlyView={false}
          onChangeOption={mockOnChange}
        />
      </Provider>,
    );

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
  });

  it("should call onChangeOption when an option is selected", async () => {
    const store = createMockStore();
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Question
          question={mockQuestion}
          onlyView={false}
          onChangeOption={mockOnChange}
        />
      </Provider>,
    );

    await user.click(screen.getByText("Paris"));

    expect(mockOnChange).toHaveBeenCalledWith({ label: "Paris", id: 1 });
  });

  it("should show correct answer in view mode", () => {
    const answeredQuestion = { ...mockQuestion, currentAnswer: "Paris" };
    const store = createMockStore([answeredQuestion]);
    const mockOnChange = vi.fn();

    const { container } = render(
      <Provider store={store}>
        <Question
          question={mockQuestion}
          onlyView={true}
          onChangeOption={mockOnChange}
        />
      </Provider>,
    );

    // In view mode, correct answer should have correct styling
    expect(container.querySelector(".bg-green-500")).toBeInTheDocument();
  });
});
