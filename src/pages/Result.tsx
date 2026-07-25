import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, reset, RootState } from "../store/store";
import Paper from "../components/Paper";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const answers = useSelector((state: RootState) => state.answer.answers);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const createSession = () => {
    dispatch(reset());
    navigate("/");
  };

  const numberCorrect = () => {
    const correct = answers.filter(
      (ans) => ans.currentAnswer === ans.correct_answer
    );
    return correct.length;
  };

  const messageClass: Record<string, string> = {
    green:
      "text-black bg-green-500 border border-green-500 rounded px-4 py-1 hover:bg-gray-100",
    yellow:
      "text-black bg-yellow-500 border border-yellow-500 rounded px-4 py-1 hover:bg-yellow-600",
    red: "text-black bg-red-500 border border-red-500 rounded px-4 py-1 hover:bg-red-600",
  };

  const msgClass = () => {
    if (numberCorrect() < 2) {
      return "red";
    }
    if (numberCorrect() > 3) {
      return "green";
    }
    return "yellow";
  };

  return (
    <>
      <h3 className="mb-6">RESULTS</h3>
      <Paper questionslist={answers} onlyView={true} />
      <p className={messageClass[msgClass()]}>
        You scored {numberCorrect()} out of 5
      </p>
      {
        <button
          className="w-full disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={answers.length < 5}
          onClick={createSession}
        >
          Create a new Quiz
        </button>
      }
    </>
  );
};

export default Result;
