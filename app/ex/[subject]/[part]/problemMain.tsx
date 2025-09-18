import { Answer, CharacterProperty, Problem, TextOut } from "@/services/type";
import GetTextOut from "@/ui/getTextOut";
import 'katex/dist/katex.min.css';
import Image from "next/image";


function getExplanationStampUrl(isCorrect: boolean, characterProperty: CharacterProperty) {
  if (characterProperty.hasExplanationImage) {
    const explanationStampUrl = isCorrect ?
      `/image/${characterProperty.characterName}/explanationCorrectStamp.png` :
      `/image/${characterProperty.characterName}/explanationWrongStamp.png`;
    return explanationStampUrl;
  }
  const explanationStampUrl = isCorrect ?
    '/image/explanationCorrectStamp.png' :
    '/image/explanationWrongStamp.png';
  return explanationStampUrl;
}

function RenderText({ textOut }: { textOut: TextOut[] }) {
  return (
    <div className="">
      {textOut.map(({ type, size, text }, index) => {
        return <GetTextOut key={index} props={{type, size, text}}/>;
      })}
    </div>
  )
};

type Props = {
  props: {
    problem: Problem;
    selectedAnswer: Answer;
    characterProperty: CharacterProperty;
  }
}

export default function ProblemMain({ props }: Props) {
  const { problem, selectedAnswer, characterProperty } = props;


  function Explanation() {
    const isCorrect = (selectedAnswer === problem.options.answer);
    const explanationStampUrl = getExplanationStampUrl(isCorrect, characterProperty);
    return (
      <div className={`relative rounded-lg text-sm md:text-xl ${isCorrect ? "bg-blue-200" : "bg-red-200"}`}>
        <h2 className={`rounded-t-lg p-1 w-full text-base md:text-xl md:p-2 ${isCorrect ? "bg-blue-300" : "bg-red-300"}`}>
          解説
        </h2>
        <div className="py-2">
          <RenderText textOut={problem.explanation} />
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
      </div>)
  };



  return (
    <div className="text-center">
      <div className="p-2">
        <RenderText textOut = {problem.toSolve} />
      </div>
      {selectedAnswer !== undefined && <Explanation />}
    </div>
  )

}