'use client'
import { useState } from "react";
import Image from 'next/image';
import chilene from "./image/chilene.jpg"
import tima from "./image/tima.png"
import { type Section, type CheckTables, type CheckTable } from "./main"


function Checks({checkTable}: {checkTable: CheckTable}){
  return(
    <div className="text-xl">
      {checkTable.map((check, index)=>{
        if(check==='N'){
          return(<div key={index} className="inline">-</div>)
        }else if(check==='C'){
          return(<div key={index} className="inline text-green-600">o</div>)
        }else if(check==='W'){
          return(<div key={index} className="inline text-red-600">x</div>)
        }
        return check
      })}
    </div>
  )
}

export function View({ sections, sectionInit, initCheckTables }: {
    sections: Section[],
    sectionInit: number,
    initCheckTables: CheckTables,
  } ) {
  const [choice, setChoice] = useState(-1);
  const [problemCount, setProblemCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(sectionInit);
  const [isShowImage, setIsShowImage] = useState(false);
  const [checkTables, setCheckTables]=useState(initCheckTables);
  const [isCorrect, setIsCorrect] = useState(false);

  const section = sections[sectionCount]
  const problem = section.problems[problemCount];
  const pick = section.pick

  const submit = () => {
    // 答え合わせ
    const correct = (choice === problem.answer)
    // checkTable更新
    setCheckTables(checkTables.map((checkTable, i)=>{
      if(i===sectionCount){
        return checkTable.map((check, j)=>{
          if(j===problemCount){
            return (correct ? 'C' : 'W');
          }else{
            return check;
          }
        });
      }else{
        return checkTable
      }
    }));
    // 答え更新
    setIsCorrect(correct);
    // 画像表示
    setIsShowImage(true);
    // 後処理
    setTimeout(() => {

      // 問題/区分カウンタ更新
      if(problemCount < pick-1){
        setProblemCount(problemCount + 1);
      }else{
        setProblemCount(0);
        setSectionCount(sectionCount + 1)
      }
      // 表示取り消し
      setIsShowImage(false);
      // 回答選択初期化
      setChoice(-1);
    }, 1000); // 1秒後に非表示
  };
  const choiceAnswer = (index: number) => {
    setChoice(index);
  };
  // const problem = data.problems[problemCount];
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
        <p>[{section.name}]、分類{sectionCount+1}、問題{problemCount+1}/{pick}</p>
        <Checks checkTable={checkTables[sectionCount]}/>
        <p>{problem.problemText}</p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {problem.options.map((item, index) => {
            return (
              <button
                key={index}
                className={`space-y-1.5 rounded-lg px-5 py-3 border-2
                          ${index === choice ?
                    'bg-blue-300 border-blue-800 hover:bg-blue-400'
                    : 'bg-gray-200 hover:bg-gray-400'}`}
                onClick={() => choiceAnswer(index)}
              >
                <div className="font-medium text-gray-800 hover:text-gray-1000">
                  {item}
                </div>
              </button>
            );
          })}
        </div>

        <button onClick={submit}
          className="mt-5 rounded-lg bg-blue-900 px-4 py-3 hover:bg-blue-600">
          <div className="font-medium text-gray-200 hover:text-gray-50">
            ぽち
          </div>
        </button>
      </div>
    </div>
  );
}