import { MathJax, MathJaxContext } from "better-react-mathjax";
import { config, type Problem } from "./main";


export default function ProblemText( {props: {problem}}:{
  props:{
    problem: Problem
}}) {
  return (
    <div className="text-center">
      {problem.problemText}

      {/* 問題本文 */}
      {problem.problemMathJ &&
        <MathJaxContext config={config}>
          <MathJax hideUntilTypeset={"first"}>
            {'`' + problem.problemMathJ + '`'}
          </MathJax>
        </MathJaxContext>
      }
    </div>
  )
}