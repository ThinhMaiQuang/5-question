import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionData } from "../model/trivia.model";

// Define the initial state type
interface AnswerState {
  answers: QuestionData[];
}

// Initial state
const initialState: AnswerState = {
  answers: [],
};

const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    choose: (state, action: PayloadAction<QuestionData>) => {
      const checkedAnswer: QuestionData = state.answers.find(
        (ans) => ans.id === action.payload.id
      );
      if (!checkedAnswer) {
        state.answers.push(action.payload);
      } else {
        checkedAnswer.currentAnswer = action.payload.currentAnswer;
      }
    },
    reset: (state) => {
      state.answers = [];
    },
  },
});

const store = configureStore({
  reducer: {
    answer: answerSlice.reducer,
  },
});

export const { choose, reset } = answerSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
