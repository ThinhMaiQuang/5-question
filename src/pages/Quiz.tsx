import React, { useEffect, useState } from "react";
import { URLConstants } from "../constant/url.constant";
import { useFetch } from "../hooks/useFetch";
import {
  Category,
  QuestionData,
  QuestionResponse,
  TriviaCategoryResponse,
} from "../model/trivia.model";
import Selectbox from "../components/Selectbox";
import {
  CommonOption,
  QuizDifficulty,
  SelectedValue,
} from "../model/common.model";
import Paper from "../components/Paper";
import { shuffleArray } from "../services/quiz.service";
import { AppDispatch, choose, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const Quiz: React.FC = () => {
  const initialCategory: TriviaCategoryResponse = { trivia_categories: [] }; // Initial empty list
  const { isFetching, fetchedData: triviaCategories } =
    useFetch<TriviaCategoryResponse>(URLConstants.CATEGORY, initialCategory);
  const { fetchedData: quizes, fetchData } = useFetch<QuestionResponse>("", []);
  const [categories, setCategories] = useState<CommonOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const answers = useSelector((state: RootState) => state.answer.answers);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (triviaCategories && triviaCategories.trivia_categories) {
      const options: CommonOption[] = triviaCategories.trivia_categories?.map(
        (item: Category) => {
          return { value: item.id.toString(), name: item.name };
        }
      );
      setCategories(options);
    }
  }, [triviaCategories]);

  const changeCategory = (cat: string): void => {
    setSelectedCategory(cat);
  };

  const changeDifficulty = (dif: string): void => {
    setSelectedDifficulty(dif);
  };

  const getQuiz = async () => {
    fetchData(
      URLConstants.SEARCH_QUESTION(selectedCategory, selectedDifficulty),
      (result: QuestionResponse) => {
        if (result) {
          result.results.forEach((r, index: number) => {
            r.id = index;
            r.answers = shuffleArray([
              ...[r.correct_answer],
              ...r.incorrect_answers,
            ]);
          });
          setQuestions(result.results);
        }
      }
    );
  };

  const onChangeOption = (value: SelectedValue) => {
    const answer: QuestionData = questions.find((q) => q.id === value.id);
    const temp: QuestionData = { ...answer };
    if (answer) {
      temp.currentAnswer = value.label;
      dispatch(choose(temp));
    }
  };

  const toReview = () => {
    navigate("/result");
  };

  if (isFetching) {
    return <>Loading...</>;
  }
  return (
    <>
      <h3 className="mb-6">QUIZ MAKER</h3>
      <div className="flex w-[50vw] items-center">
        <Selectbox
          id="categorySelect"
          options={categories}
          initOption="Select a category"
          onChangeOption={changeCategory}
        />
        <Selectbox
          id="difficultySelect"
          options={QuizDifficulty}
          initOption="Select difficulty"
          onChangeOption={changeDifficulty}
        />
        <button
          id="createBtn"
          disabled={!selectedCategory || !selectedDifficulty}
          onClick={getQuiz}
        >
          Create
        </button>
      </div>
      <Paper questionslist={questions} onChangeOption={onChangeOption} />
      <>
        {answers.length === 5 && (
          <button
            className="w-full disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
            disabled={answers.length < 5}
            onClick={toReview}
          >
            Submit
          </button>
        )}
      </>
    </>
  );
};

export default Quiz;
