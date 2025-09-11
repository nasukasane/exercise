import { Answer, Problem } from "@/services/type";
import { useState } from "react";
import ProblemOptions from "./problemOptions";
import ProblemFooter from "./problemFooter";

type Props = {
  props: {
    count: number;
    isResult: boolean;
    isLastProblem: boolean;
    selectedAnswer: Answer;
    selectedAnswers: Answer[];
    problem: Problem;
    moveView: (destinationCount: number, reset?: boolean) => void;
    submitAnswer: (selectedOption: Answer) => void;
  }
}

export default function ProblemInput({ props }: Props) {
  const { count, isResult, isLastProblem, selectedAnswer, selectedAnswers,
    problem, submitAnswer, moveView } = props;
  const [selectedOption, setSelectedOption] = useState<Answer>(undefined); //選択
  const [displayCount, setDisplayCount] = useState(count);
    const problemOptionProps = { problem, selectedOption, selectedAnswer, setSelectedOption };
  const problemFooterProps = {
    count, isResult, isLastProblem, selectedOption, selectedAnswer,
    selectedAnswers, moveView, submitAnswer
  };
  // count変化を検知し、selectedOptionを初期化
  if(count !== displayCount){
    setDisplayCount(count);
    setSelectedOption(undefined);
  }

  return(
    <div className="grid grid-cols-1 grid-rows-[auto_70px] md:grid-rows-[auto_90px]">
      {isResult ? <div></div> : <ProblemOptions props={problemOptionProps} />}
      <ProblemFooter props={problemFooterProps} />
    </div>

  )

}