import { Dispatch, SetStateAction } from "react";
import { PickSet, Problem, config } from "./main";
import { MathJax, MathJaxContext } from "better-react-mathjax";

// 選択肢取得
function getOptions(problem: Problem): string[] {
  if (problem.inputType === "strList" || problem.inputType === "mathJList") {
    return problem.options as string[]
  } else if (problem.inputType === "numpad") {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  return []
}

// 選択ビュー
export default function Options(
  { problem, choicedNumber, choicedSet, optionIndexes, setChoicedNumber, setChoicedSet, setCanSubmit }: {
    problem: Problem,
    choicedNumber: number,
    choicedSet: PickSet,
    optionIndexes: number[],
    setChoicedNumber: Dispatch<SetStateAction<number>>,
    setChoicedSet: Dispatch<SetStateAction<PickSet>>,
    setCanSubmit: Dispatch<SetStateAction<boolean>>,
  }) {
  // 回答選択肢取得
  const options = getOptions(problem);
  // 選択肢クリック時動作
  const handleClick = (index:number)=>{
    // 択一タイプ選択肢
    if (problem.pickType === '1') {
      setChoicedNumber(index);
      setCanSubmit(true);
    // 全択タイプ選択肢
    } else if (problem.pickType === 'a') {
      if (choicedSet.has(index)) {
        const newSet = new Set([...choicedSet])
        newSet.delete(index)
        setChoicedSet(newSet);
        setCanSubmit(newSet.size !== 0)
      } else {
        setChoicedSet(new Set([...choicedSet, index]));
        setCanSubmit(true);
      }
    }

  }

  return (
    <div className={`grid gap-5 ${problem.inputType === "numpad" ? "grid-cols-5" : "grid-cols-2"}`}>
      {optionIndexes.map(index => {
        return (
          <button
            key={index}
            className={`space-y-1.5 rounded-lg px-5 py-3 border-2
                          ${index === choicedNumber || choicedSet.has(index) ?
                'bg-blue-300 border-blue-800 hover:bg-blue-400'
                : 'bg-gray-200 hover:bg-gray-400'}`}
            onClick={() => handleClick(index)}
          >
            <div className="font-medium text-gray-800 hover:text-gray-1000" >
              {problem.inputType === 'mathJList' ?
                // 数式表示
                <MathJaxContext config={config}>
                  <MathJax hideUntilTypeset={"first"}>
                    {options[index]}
                  </MathJax>
                </MathJaxContext>
                // 文字列表示
                : options[index]}
            </div>
          </button>
        );
      })}
    </div>
  )
}