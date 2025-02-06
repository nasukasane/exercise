import { Dispatch, SetStateAction } from "react";
import { PickSet, Problem, config } from "./main";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getOptions } from "./logics";

// 選択ビュー
export default function Options(
  { props: { problem, choicedNumber, choicedSet,
    optionIndexes, setChoicedNumber, setChoicedSet, setCanSubmit } }:
    {
      props: {
        problem: Problem,
        choicedNumber: number,
        choicedSet: PickSet,
        optionIndexes: number[],
        setChoicedNumber: Dispatch<SetStateAction<number>>,
        setChoicedSet: Dispatch<SetStateAction<PickSet>>,
        setCanSubmit: Dispatch<SetStateAction<boolean>>,
      }
    }) {
  // 回答選択肢取得
  const options = getOptions(problem);
  // 選択肢クリック時動作
  const handleClick = (index: number) => {
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
          // ボタン本体
          <button
            key={index}
            className={`flex space-y-1.5 rounded-lg px-5 py-3 border-2
                          ${index === choicedNumber || choicedSet.has(index) ?
                'bg-blue-300 border-blue-800 hover:bg-blue-400'
                : 'bg-gray-200 border-gray-400 hover:bg-gray-400'}`}
            onClick={() => handleClick(index)}
          >
            {/* ラジオボタン/チェックボックス */}
            <input type={problem.pickType==='1' ? 'radio' : 'checkbox'}
              className="flex-none" 
              checked={index === choicedNumber || choicedSet.has(index)} readOnly/>
            {/* 選択肢 */}
            <div className="flex-1 flex justify-center items-center text-2xl text-gray-800 hover:text-gray-1000" >
              {problem.inputType === 'mathJList' ?
                // 数式表示
                <MathJaxContext config={config}>
                  <MathJax hideUntilTypeset={"first"} className="text-xl">
                    {'`' + options[index] + '`'}
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