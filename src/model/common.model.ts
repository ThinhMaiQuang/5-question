export interface CommonOption {
  value: number | string;
  name: string;
}

export const QuizDifficulty: CommonOption[] = [
  { value: "easy", name: "Easy" },
  { value: "medium", name: "Medium" },
  { value: "hard", name: "Hard" },
];

export interface SelectedValue {
  label: string;
  id: number;
}
