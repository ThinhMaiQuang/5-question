export interface TriviaCategoryResponse {
  trivia_categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

export interface QuestionResponse {
  response_code: number;
  results: QuestionData[];
}

export interface QuestionData {
  id: number;
  category: string;
  correct_answer: string;
  question: string;
  type: string;
  incorrect_answers: string[];
  answers?: string[];
  currentAnswer?: string;
}
