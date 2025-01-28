import { Dispatch, SetStateAction } from "react";
import { PickSet, Problem } from "./main";

export function getResult(
  choicedNumber: number,
  choicedSet: PickSet,
  answer: number | PickSet,
): boolean {
  if (typeof answer === "number") {
    return (choicedNumber === answer);
  } else {
    console.log(choicedSet, answer);
    return choicedSet.size === answer.size && (new Set([...choicedSet, ...answer])).size === answer.size;
  }
}

export function getOptionIndexes(
  problem: Problem,
  setOptionIndexes: Dispatch<SetStateAction<number[]>>) {
  if (problem.inputType === 'numpad') {
    setOptionIndexes([...Array(10).keys()]);
  } else if (problem.options === undefined) {
    setOptionIndexes([]); // 型縛り
  } else {
    const n = problem.options.length;
    // 0からn-1までの数値の配列を作成
    const array = [...Array(n).keys()];
    if (problem.randomizeOption) {
      // Fisher-Yatesシャッフル
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    setOptionIndexes(array);
  }
}
