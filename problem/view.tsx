'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import chilene from "./image/chilene.jpg";
import tima from "./image/tima.png";
import correctSound from "./sound/correct.mp3";
import wrongSound from "./sound/wrong.mp3";
import { config, type Section, type CheckTables, type PickSet } from "./main";
import useSound from "use-sound";
import Volume from "./volume";
import { getResult, getOptionIndexes } from "./logics";
import Options from "./options";
import { Checks, updateCheckTable } from "./check";
import { MathJax, MathJaxContext } from "better-react-mathjax";



export function View({ sections, sectionInit, initCheckTables }: {
  sections: Section[],
  sectionInit: number,
  initCheckTables: CheckTables,
}) {
  const [choicedNumber, setChoicedNumber] = useState(-1); //択一回答選択肢index
  const [choicedSet, setChoicedSet] = useState<PickSet>(new Set()); //前線択一回答選択肢index
  const [problemCount, setProblemCount] = useState(0); //問題番号
  const [sectionCount, setSectionCount] = useState(sectionInit); //分類番号
  const [isShowImage, setIsShowImage] = useState(false); //結果表示フラグ
  const [checkTables, setCheckTables] = useState(initCheckTables); //丸付け表
  const [isCorrect, setIsCorrect] = useState(false); //提出結果
  const [canSubmit, setCanSubmit] = useState(false); //提出可否
  const [optionIndexes, setOptionIndexes] = useState<number[]>([])
  const [volume, setVolume] = useState(1); //音量
  const [playCorrect] = useSound(correctSound, { volume }); //正解音声
  const [playWrong] = useSound(wrongSound, { volume }); //不正解音声

  const section = sections[sectionCount]
  const problem = section.problems[problemCount];
  const pick = section.pick
  const answer = (typeof problem.answer) === 'number' ? problem.answer as number : new Set(problem.answer as number[]);

  useEffect(()=>{ getOptionIndexes(problem, setOptionIndexes); }, [problemCount]);

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
        <Volume volume={volume} setVolume={setVolume} />

        <p>[{section.name}]、分類{sectionCount + 1}、問題{problemCount + 1}/{pick}</p>
        <Checks checkTable={checkTables[sectionCount]} />
        <div className="text-center">
        {problem.problemText}
      
        {/* 問題本文 */}
        {problem.problemMathJ &&
          <MathJaxContext config={config}>
            <MathJax hideUntilTypeset={"first"}>
              {problem.problemMathJ}
            </MathJax>
          </MathJaxContext>
        }
        </div>

        {/* 選択肢 */}
        <Options problem={problem} choicedNumber={choicedNumber} optionIndexes={optionIndexes} 
        choicedSet={choicedSet} setChoicedNumber={setChoicedNumber} setChoicedSet={setChoicedSet} 
        setCanSubmit={setCanSubmit} />

        {/* 提出ボタン */}
        <button onClick={submit} disabled={!canSubmit}
          className={`mt-5 rounded-lg px-4 py-3 
            ${canSubmit ?
              'bg-blue-900 hover:bg-blue-600'
              : 'bg-sky-600 '}`} >
          <div className="font-medium text-gray-200 hover:text-gray-50">
            {canSubmit ? 'ぽち' : '選べ'}
          </div>
        </button>
      </div>
    </div>
  );
}