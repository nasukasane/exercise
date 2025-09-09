import { MathJax, MathJaxContext } from "better-react-mathjax";
import { jaxConfig } from "@/services/jaxConfig";
import { Answer, Problem } from "@/services/type";
import { useEffect, useState } from "react";


function MathRender({ problem }: { problem: Problem }) {
  console.log('dog????')
  return (
    <MathJaxContext config={jaxConfig}>
      <MathJax hideUntilTypeset={"first"} renderMode={"post"}>
        {'`' + problem.problemMathJ + '`'}
      </MathJax>
    </MathJaxContext>
  )

}

type Props = {
  props: {
    problem: Problem;
    selectedAnswer: Answer;
  }
}

export default function ProblemMain({ props }: Props) {
  const { problem, selectedAnswer } = props;
    const [showMath, setShowMath] = useState(false);

  // コンポーネントがマウントされた後にMathJaxをレンダリングする
  useEffect(() => {
    // 短い遅延を設けてDOM操作の競合を防ぐ
    const timer = setTimeout(() => {
      setShowMath(true);
    }, 1000); // 100ミリ秒の遅延

    // クリーンアップ関数
    return () => clearTimeout(timer);
  }, []);

  function ToSolve() {
    return (
      <div className="py-2">
        {problem.problemText}

        <div className="py-2 text-sm md:text-xl">
          {problem.problemMathJ && showMath &&
            <MathRender problem={problem} />
          }
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
        <div className="py-1 md:py-2">
          {problem.explanationText}
        </div>
        <div className="py-1 md:py-2">
          {problem.problemMathJ &&
            <></>
            // <MathJaxContext config={jaxConfig}>
            //   <MathJax hideUntilTypeset={"first"}>
            //     {'`' + problem.explanationMathJ + '`'}
            //   </MathJax>
            // </MathJaxContext>
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