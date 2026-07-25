import { useSelector } from "react-redux";
import { SelectedValue } from "../model/common.model";
import { QuestionData } from "../model/trivia.model";
import { RootState } from "../store/store";
import Option, { OptionStatus } from "./Option";

interface QuestionProps {
  question: QuestionData;
  onlyView?: boolean;
  onChangeOption: (selectedValue: SelectedValue) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onlyView,
  onChangeOption,
}) => {
  const answers = useSelector((state: RootState) => state.answer.answers);

  const onSelect = (param: SelectedValue) => {
    onChangeOption(param);
  };

  const check = (ans: string): OptionStatus => {
    const answer = answers.find((a) => a.id === question.id);
    if (answer && !onlyView && answer.currentAnswer === ans) {
      return "correct";
    }
    if (onlyView) {
      if (answer && answer.correct_answer === ans) {
        return "correct";
      } else if (
        answer?.incorrect_answers.includes(ans) &&
        ans === answer.currentAnswer
      ) {
        return "incorrect";
      }
    }
    return "normal";
  };

  return (
    <div className="mb-6">
      <h5>{question.question}</h5>
      <div>
        {question.answers?.map((ans, idx) => {
          return (
            <div className="" key={idx}>
              <Option
                label={ans}
                id={question.id}
                onSelect={onSelect}
                status={check(ans)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
