import { Answer, CharacterProperty, Problem } from "@/services/type";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Image from "next/image";


function getExplanationStampUrl(isCorrect: boolean, characterProperty: CharacterProperty) {
  if (characterProperty.hasExplanationImage) {
    const explanationStampUrl = isCorrect ? 
      `/image/${characterProperty.characterName}/explanationCorrectStamp.png` : 
      `/image/${characterProperty.characterName}/explanationWrongStamp.png` ;
    return explanationStampUrl;
  }
  const explanationStampUrl = isCorrect ?
   '/image/explanationCorrectStamp.png' :
   '/image/explanationWrongStamp.png';
  return explanationStampUrl;
}

type Props = {
  props: {
    problem: Problem;
    selectedAnswer: Answer;
    characterProperty: CharacterProperty;
  }
}

export default function ProblemMain({ props }: Props) {
  const { problem, selectedAnswer, characterProperty } = props;

  function ToSolve() {
    return (
      <div className="pt-4">
        {problem.problemText}
        <div className="pb-1 text-sm md:pb-2 md:text-xl">
          {problem.problemTex && <BlockMath math={problem.problemTex} />}
        </div>
      </div>
    )
  };

  function Explanation() {
    const isCorrect = (selectedAnswer === problem.answer);
    const explanationStampUrl = getExplanationStampUrl(isCorrect, characterProperty);
    return (
      <div className={`relative rounded-lg text-sm md:text-xl ${isCorrect ? "bg-blue-200" : "bg-red-200"}`}>
        <h2 className={`rounded-t-lg p-1 w-full text-base md:text-2xl md:p-2 ${isCorrect ? "bg-blue-300" : "bg-red-300"}`}>
          解説
        </h2>
        <div className="pt-1 md:pt-2">
          {problem.explanationText}
        </div>
        <div className="absolute right-0 bottom-0 opacity-50 pointer-events-none">
          <Image
            src={explanationStampUrl}
            alt={isCorrect ? "正解判定スタンプ" : "不正解判定スタンプ"}
            width={120}   // 横幅だけ指定
            height={0}    // dummy（Next.jsは必須だが無視される）
            style={{ height: "auto" }} // アスペクト比維持
            className=""
          />
        </div>
        <div className="relative z-10">
          {problem.explanationTex && <BlockMath math={problem.explanationTex} />}
        </div>
      </div>)
  };



  return (
    <div className="text-center text-base md:text-2xl">
      <ToSolve />
      {selectedAnswer !== undefined && <Explanation />}
    </div>
  )

}