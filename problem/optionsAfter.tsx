import { Problem, ChoiceTables, config } from "./main";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { getOptions } from "./logics";

// 選択ビュー
export default function OptionsAfter(
  { props: { sectionCount, problemCount, problem, optionIndexes, choiceTables} }:
    {
      props: {
        sectionCount : number,
        problemCount : number,
        problem: Problem,
        optionIndexes: number[],
        choiceTables: ChoiceTables,
      }
    }) {
  // 回答選択肢取得
  const options = getOptions(problem);
  const correctIndex = typeof problem.answer === "number" ? problem.answer as number : -1;
  const correctArray = typeof problem.answer !== "number" ? problem.answer as number[] : [-1];
  const submit = choiceTables[sectionCount][problemCount];
  const submitIndex = typeof submit === "number" ? submit as number : -1;
  const submitSet = typeof submit !== "number" ? submit as Set<number> : new Set();

  return (
    <div className={`grid gap-5 ${problem.inputType === "numpad" ? "grid-cols-5" : "grid-cols-2"}`}>
      {optionIndexes.map(index => {
        return (
          // ボタン本体
          <button
            key={index}
            disabled
            className={
              `flex space-y-1.5 rounded-lg px-5 py-3 border-2
              ${(index === correctIndex || correctArray.includes(index) ) &&
              'bg-green-300 border-green-500' }
              ${index !== correctIndex && !correctArray.includes(index) && 
                ( index === submitIndex || submitSet.has(index) )?
              'bg-red-200 border-red-300' : 'bg-gray-200 border-gray-400' }
              `}
          >
            {/* ラジオボタン/チェックボックス */}
            <input type={problem.pickType==='1' ? 'radio' : 'checkbox'}
              className="flex-none" 
              checked={ index === submitIndex || submitSet.has(index) } readOnly/>
            {/* 選択肢 */}
            <div className={`flex-1 flex justify-center items-center text-2xl
                ${index === correctIndex || correctArray.includes(index) ? 
                'text-gray-800' : 'text-gray-400'}`} >
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