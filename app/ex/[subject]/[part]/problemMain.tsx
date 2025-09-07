import { MathJax, MathJaxContext } from "better-react-mathjax";
import { jaxConfig } from "@/services/jaxConfig";
import { Answer, Problem } from "@/services/type";


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
      <div className="py-2">
        {problem.problemText}

        <div className="py-2 text-sm md:text-xl">
          {problem.problemMathJ &&
            <MathJaxContext config={jaxConfig}>
              <MathJax hideUntilTypeset={"first"}>
                {'`' + problem.problemMathJ + '`'}
              </MathJax>
            </MathJaxContext>
          }
        </div>
      </div>
    )
  };

  function Explanation() {
    const isCorrect = (selectedAnswer === problem.answer);
    return (
      <div className={`rounded-lg text-sm md:text-xl ${isCorrect ? "bg-blue-200" : "bg-red-200"}`}>
        <div className={`rounded-t-lg p-1 w-full text-base md:text-2xl md:p-2 ${isCorrect? "bg-blue-300" : "bg-red-300"}`}>
          解説
        </div>
        <div className="py-1 md:py-2">
          {problem.explanationText}
        </div>
        <div className="py-1 md:py-2">
          {problem.problemMathJ &&
            <MathJaxContext config={jaxConfig}>
              <MathJax hideUntilTypeset={"first"}>
                {'`' + problem.explanationMathJ + '`'}
              </MathJax>
            </MathJaxContext>
          }
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