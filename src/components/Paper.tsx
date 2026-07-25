import { SelectedValue } from "../model/common.model";
import { QuestionData } from "../model/trivia.model";
import Question from "./Question";

interface PaperProps {
  questionslist: QuestionData[];
  onlyView?: boolean;
  onChangeOption?: (selectedValue: SelectedValue) => void;
}

const Paper: React.FC<PaperProps> = ({
  questionslist,
  onlyView,
  onChangeOption,
}) => {
  const onSelect = (param: SelectedValue) => {
    if (onChangeOption && !onlyView) {
      onChangeOption(param);
    }
  };

  return (
    <div className="">
      {questionslist.map((question, index) => {
        return (
          <Question
            key={index}
            question={question}
            onChangeOption={onSelect}
            onlyView={onlyView}
          />
        );
      })}
    </div>
  );
};

export default Paper;
