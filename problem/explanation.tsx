import { FC } from "react";
import { config, Problem } from "./main";
import { MathJax, MathJaxContext, MathJaxContextProps } from "better-react-mathjax";


export default function Explanation({ props: { problem, checkResult } }:
  {
    props: {
      problem: Problem,
      checkResult: string,
    }
  }
) {
  const Answer = () => {
    const options = problem.options as string[];
    // 択一タイプ
    if (problem.pickType === '1') {
      const answer = problem.answer as number;
      if (problem.inputType === 'numpad') {
        return String(answer);
      } else if (problem.inputType === 'strList') {
        // 数式表示
        return options[answer];
      } else if (problem.inputType === 'mathJList') {
        return (
          <div className="items-center flex">
            <div className="inline">正解：</div>
            <div className="inline">
              <MathJaxContext config={config}>
                <MathJax hideUntilTypeset={"first"} className="text-xl">
                  {'`' + options[problem.answer as number] + '`'}
                </MathJax>
              </MathJaxContext>
            </div>
          </div>
        )
      } else {
        return options[answer]
      }
      // 全択タイプ
    } else if (problem.pickType === 'a') {
      const answer = problem.answer as number[];
      answer.map(index => {
        return index;
      })
      return 'a';
    } else {
      return String(problem.answer)
    }
  }
  return (
    <div>
      {checkResult === 'C' ?
        <div>正解！！</div> :
        <Answer />
      }
      <div>説明：{problem.explanation}</div>
    </div>

  )
}