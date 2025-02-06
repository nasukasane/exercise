import { Dispatch, SetStateAction } from "react";
import { PickSet, Problem, ChoiceTables } from "./main";

export function getResult(
  choicedNumber: number,
  choicedSet: PickSet,
  answer: number | PickSet,
): boolean {
  if (typeof answer === "number") {
    return (choicedNumber === answer);
  } else {
    return choicedSet.size === answer.size && (new Set([...choicedSet, ...answer])).size === answer.size;
  }
}


export function updateChoiceTable(
  problem: Problem,
  choicedNumber: number, 
  choicedSet: PickSet,
  sectionCount: number, 
  problemCount: number,
  ChoiceTables: ChoiceTables,
  setChoiceTables: Dispatch<SetStateAction<ChoiceTables>>,
){
  setChoiceTables(()=>{
    const ret = [...ChoiceTables];
    if(problem.pickType==='1'){
      ret[sectionCount][problemCount] = choicedNumber;
    }else{
      ret[sectionCount][problemCount] = choicedSet;
    }
    return ret
  })
  
}

// 選択肢取得
export function getOptions(problem: Problem): string[] {
  if (problem.inputType === "strList" || problem.inputType === "mathJList") {
    return problem.options as string[]
  } else if (problem.inputType === "numpad") {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  return []
}


export function getOptionIndexes(
  problem: Problem,
  sectionCount: number,
  problemCount: number,
  indexTables: number[][][],
  setIndexTables: Dispatch<SetStateAction<number[][][]>>) {
  // ランダマイズ化済みなら終了
  if(indexTables[sectionCount][problemCount].length!==0){
    return
  }
  if (problem.inputType === 'numpad') {
    setIndexTables((preIndexTables) => {
      const tables = [...preIndexTables];
      tables[sectionCount][problemCount] = [...Array(10).keys()];
      return tables;
    })
  } else if (problem.options === undefined) {
    setIndexTables((tables) => {
      return tables;
    })// 型縛り
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
    setIndexTables((preIndexTables) => {
      const tables = [...preIndexTables];
      tables[sectionCount][problemCount] = [...array];
      return tables;
    })
  }
}
