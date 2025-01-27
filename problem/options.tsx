import { Dispatch, SetStateAction } from "react";
import { PickSet, Problem } from "./main";

export function getOptions(problem: Problem): string[] {
  if (problem.inputType === "strList") {
    return problem.options as string[]
  } else if (problem.inputType === "numpad") {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  return []
}


// 選択ビュー
export default function Options(
  { problem, choicedNumber, choicedSet, setChoicedNumber, setChoicedSet, setCanSubmit }: {
    problem: Problem,
    choicedNumber: number,
    choicedSet: PickSet,
    setChoicedNumber: Dispatch<SetStateAction<number>>,
    setChoicedSet: Dispatch<SetStateAction<PickSet>>,
    setCanSubmit: Dispatch<SetStateAction<boolean>>,
  }) {
  const options = getOptions(problem);
  return (
    <div className={`grid gap-5 ${problem.inputType === "numpad" ? "grid-cols-5" : "grid-cols-2"}`}>
      {options.map((item, index) => {
        return (
          <button
            key={index}
            className={`space-y-1.5 rounded-lg px-5 py-3 border-2
                          ${index === choicedNumber || choicedSet.has(index) ?
                'bg-blue-300 border-blue-800 hover:bg-blue-400'
                : 'bg-gray-200 hover:bg-gray-400'}`}
            onClick={() => {
              if (problem.pickType === '1') {
                setChoicedNumber(index);
                setCanSubmit(true);
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
            }}
          >
            <div className="font-medium text-gray-800 hover:text-gray-1000" >
              {item}
            </div>
          </button>
        );
      })}
    </div>
  )
}