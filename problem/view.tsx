'use client'
import { Dispatch, useState, type SetStateAction } from "react";
import Image from 'next/image';
import chilene from "./image/chilene.jpg"
import tima from "./image/tima.png"
import correctSound from "./sound/correct.mp3"
import wrongSound from "./sound/wrong.mp3"
import { type Section, type CheckTables, type CheckTable, type PickSet, Problem } from "./main"
import useSound from "use-sound";


function getResult(
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

function Checks({ checkTable }: { checkTable: CheckTable }) {
  return (
    <div className="text-xl">
      {checkTable.map((check, index) => {
        if (check === 'N') {
          return (<div key={index} className="inline">-</div>)
        } else if (check === 'C') {
          return (<div key={index} className="inline text-green-600">o</div>)
        } else if (check === 'W') {
          return (<div key={index} className="inline text-red-600">x</div>)
        }
        return check
      })}
    </div>
  )
}

function updateCheckTable(
  result: boolean,
  sectionCount: number,
  problemCount: number,
  checkTables: CheckTables,
  setCheckTables: Dispatch<SetStateAction<CheckTables>>) {
  // checkTable更新
  setCheckTables(checkTables.map((checkTable, i) => {
    if (i === sectionCount) {
      return checkTable.map((check, j) => {
        if (j === problemCount) {
          return (result ? 'C' : 'W');
        } else {
          return check;
        }
      });
    } else {
      return checkTable
    }
  }));
}

function getOptions(problem:Problem): string[]{
  if(problem.inputType==="strList"){
    return problem.options as string[]
  }else if(problem.inputType==="numpad"){
    return ["0","1","2","3","4","5","6","7","8","9"];
  }
  return []
}

// 選択ビュー
function Options(
  {problem, choicedNumber, choicedSet, setChoicedNumber, setChoicedSet, setCanSubmit}:{
  problem: Problem,
  choicedNumber: number,
  choicedSet: PickSet,
  setChoicedNumber: Dispatch<SetStateAction<number>>,
  setChoicedSet: Dispatch<SetStateAction<PickSet>>,
  setCanSubmit: Dispatch<SetStateAction<boolean>>,
  }){
  const options = getOptions(problem);
  return (
    <div className={`grid gap-5 ${problem.inputType==="numpad" ? "grid-cols-5" : "grid-cols-2"}`}>
      {options.map((item, index) => {
        return (
          <button
            key={index}
            className={`space-y-1.5 rounded-lg px-5 py-3 border-2
                          ${index === choicedNumber || choicedSet.has(index) ?
                'bg-blue-300 border-blue-800 hover:bg-blue-400'
                : 'bg-gray-200 hover:bg-gray-400'}`}
            onClick={() => {
              if(problem.pickType === '1'){
                setChoicedNumber(index);
                setCanSubmit(true);
              }else if(problem.pickType === 'a'){
                if(choicedSet.has(index)){
                  const newSet = new Set([...choicedSet])
                  newSet.delete(index)
                  setChoicedSet(newSet);
                  setCanSubmit(newSet.size !== 0)
                }else{
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

export function View({ sections, sectionInit, initCheckTables }: {
  sections: Section[],
  sectionInit: number,
  initCheckTables: CheckTables,
}) {
  const [choicedNumber, setChoicedNumber] = useState(-1);
  const [choicedSet, setChoicedSet] = useState<PickSet>(new Set());
  const [problemCount, setProblemCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(sectionInit);
  const [isShowImage, setIsShowImage] = useState(false);
  const [checkTables, setCheckTables] = useState(initCheckTables);
  const [isCorrect, setIsCorrect] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  const section = sections[sectionCount]
  const problem = section.problems[problemCount];
  const pick = section.pick
  const answer = (typeof problem.answer) === 'number' ? problem.answer as number : new Set(problem.answer as number[]);

  // 回答提出時処理
  const submit = () => {
    const result = getResult(choicedNumber, choicedSet, answer); // 答え合わせ
    updateCheckTable(result, sectionCount, problemCount, checkTables, setCheckTables); // checkTable更新
    setIsCorrect(result); // 答え更新
    setIsShowImage(true); // 画像表示
    result ? playCorrect() : playWrong() // 結果音再生
    // 後処理
    setTimeout(() => {
      // 問題/区分カウンタ更新
      if (problemCount < pick - 1) {
        setProblemCount(problemCount + 1);
      } else {
        setProblemCount(0);
        setSectionCount(sectionCount + 1)
      }
      setIsShowImage(false); // 結果画像非表示
      setChoicedNumber(-1); // 回答選択初期化
      setChoicedSet(new Set()); // 回答選択初期化
      setCanSubmit(false); //回答可能フラグ初期化
    }, 1000); // 1秒後に非表示
  };

  // ビュー
  return (
    <div className="relative">
      {isShowImage &&
        <Image
          src={isCorrect ? chilene : tima}
          alt="正解画像"
          width={200}
          height={200}
          className="absolute top-400 left-400"
        />
      }
      <div className="space-y-8">
        <p>[{section.name}]、分類{sectionCount + 1}、問題{problemCount + 1}/{pick}</p>
        <Checks checkTable={checkTables[sectionCount]} />
        <p>{problem.problemText}</p>

        <Options problem={problem} choicedNumber={choicedNumber} choicedSet={choicedSet} setChoicedNumber={setChoicedNumber} setChoicedSet={setChoicedSet} setCanSubmit={setCanSubmit} />

        <button onClick={submit} disabled={!canSubmit}
          className={`mt-5 rounded-lg px-4 py-3 
            ${canSubmit ?
              'bg-blue-900 hover:bg-blue-600'
            : 'bg-sky-600 '}`} >
          <div className="font-medium text-gray-200 hover:text-gray-50">
            {canSubmit? 'ぽち' : '選べ'}
          </div>
        </button>
      </div>
    </div>
  );
}