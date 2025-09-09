import { Dispatch, SetStateAction } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Answer, Problem } from "@/services/type";
import { jaxConfig } from "@/services/jaxConfig";

type Props = {
  props: {
    problem: Problem;
    selectedOption: Answer;
    selectedAnswer: Answer;
    setSelectedOption: Dispatch<SetStateAction<Answer>>;
  }
}

// 選択ビュー
export default function ProblemOptions({ props }: Props) {
  const { problem, selectedOption, selectedAnswer, setSelectedOption } = props;


  // 回答選択肢取得
  // 選択肢クリック時動作
  const handleClick = (index: number) => {
    setSelectedOption(index);
  };

  // ボタン本体
  const OptionButton = ({ optionIndex, optionText }:
    { optionIndex: number, optionText: string }) => {
    // ボタン内容
    const ButtonContent = () => {
      const radioChecked = (optionIndex === selectedOption || optionIndex === selectedAnswer)
      return (
        <div className="relative p-2 md:p-4">
          <input type="radio" className="absolute top-0 left-0 m-1 w-3 h-3 md:m-2 md:w-4 md:h-4" checked={radioChecked} readOnly disabled />
          {/* 選択肢 */}
          <div className="text-base md:text-2xl" >
            {problem.optionUseMathJ ?
              // 数式表示
              <MathJaxContext config={jaxConfig}>
                <MathJax hideUntilTypeset={"first"} className="text-xl">
                  {'`' + optionText + '`'}
                </MathJax>
              </MathJaxContext>
              // 文字列表示
              : optionText}
          </div>
        </div >
      )
    }
    if (selectedAnswer === undefined) {
      // 解答前：選択可能時
      return (
        <button
          className={`rounded-lg border-2 text-gray-800 hover:text-gray-1000
            ${optionIndex === selectedOption ?
              'bg-blue-300 border-blue-800 hover:bg-blue-400'
              : 'bg-gray-200 border-gray-400 hover:bg-gray-400'}`}
          onClick={() => handleClick(optionIndex)}
        >
          <ButtonContent />
        </button>
      )
    } else {
      // 解答後：選択不可時
      return (
        <button
          disabled
          className={
            `rounded-lg border-2 text-gray-400
              ${(optionIndex === problem.answer) ?
                'bg-green-300 border-green-500 text-gray-800'  :
                optionIndex === selectedAnswer ?
                'bg-red-200 border-red-300' : 'bg-gray-200 border-gray-400'}
            `}
        >
          <ButtonContent />
        </button>
      )
    }
  }

  // 4択の場合
  if (problem.options !== undefined) {
    return (
      <div className={`${problem.optionType === "2x2" ?
      "grid gap-5 grid-cols-2" :
      "grid grid-cols-1"}`}>
        {problem.options.map((optionText, optionIndex) => {
          return (<OptionButton key={optionIndex} optionIndex={optionIndex} optionText={optionText} />)
        })}
      </div>
    );
  } else {
    // numpadの場合
    return (
      <div className="grid gap-2 grid-cols-5">
        {[...Array(10)].map((_, optionIndex) => {
          const optionText = String(optionIndex);
          return (<OptionButton key={optionIndex} optionIndex={optionIndex} optionText={optionText} />)
        })}
      </div>
    );
  }

}