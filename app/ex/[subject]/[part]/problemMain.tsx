import { Answer, Problem } from "@/services/type";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';


type Props = {
  props: {
    problem: Problem;
    selectedAnswer: Answer;
  }
}

export default function ProblemMain({ props }: Props) {
  const { problem, selectedAnswer } = props;

  function ToSolve() {
    return (
      <div className="pt-4">
        {problem.problemText}
        <div className="pb-1 text-sm md:pb-2 md:text-xl">
          {problem.problemTex &&  <BlockMath math={problem.problemTex} />}
        </div>
      </div>
    )
  };

  function Explanation() {
    const isCorrect = (selectedAnswer === problem.answer);
    return (
      <div className={`rounded-lg text-sm md:text-xl ${isCorrect ? "bg-blue-200" : "bg-red-200"}`}>
        <div className={`rounded-t-lg p-1 w-full text-base md:text-2xl md:p-2 ${isCorrect ? "bg-blue-300" : "bg-red-300"}`}>
          解説
        </div>
        <div className="pt-1 md:pt-2">
          {problem.explanationText}
        </div>
        <div className="pb-1 text-sm md:pb-2 md:text-xl">
          {problem.explanationTex &&  <BlockMath math={problem.explanationTex} />}
        </ div>
      </div>)
  };



  return (
    <div className="text-center text-base md:text-2xl">
      <ToSolve />
      {selectedAnswer !== undefined && <Explanation />}
    </div>
  )

}