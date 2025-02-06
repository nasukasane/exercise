'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import chilene from "./image/chilene.jpg";
import tima from "./image/tima.png";
import correctSound from "./sound/correct.mp3";
import wrongSound from "./sound/wrong.mp3";
import { config, type Section, type CheckTables, type PickSet, ChoiceTables } from "./main";
import useSound from "use-sound";
import Volume from "./volume";
import { getResult, getOptionIndexes, updateChoiceTable } from "./logics";
import Options from "./options";
import { Checks, updateCheckTable } from "./check";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Footer } from "./footer";
import Explanation from "./explanation";
import OptionsAfter from "./optionsAfter";



export function View({ props: {
  sections, sectionInit, initIndexTables, initChoiceTables, initCheckTables } }: {
    props: {
      sections: Section[],
      sectionInit: number,
      initIndexTables: number[][][],
      initChoiceTables: ChoiceTables,
      initCheckTables: CheckTables,
    }
  }) {
  const [choicedNumber, setChoicedNumber] = useState(-1); //択一回答選択肢index
  const [choicedSet, setChoicedSet] = useState<PickSet>(new Set()); //前線択一回答選択肢index
  const [problemCount, setProblemCount] = useState(0); //問題番号
  const [sectionCount, setSectionCount] = useState(sectionInit); //分類番号
  const [isShowImage, setIsShowImage] = useState(false); //結果表示フラグ
  const [goReslt, setGoResult] = useState(false); //リザルト行きフラグ
  const [checkTables, setCheckTables] = useState(initCheckTables); //丸付け表
  const [choiceTables, setChoiceTables] = useState<ChoiceTables>(initChoiceTables); //丸付け表
  const [canSubmit, setCanSubmit] = useState(false); //提出可否
  const [indexTables, setIndexTables] = useState<number[][][]>(initIndexTables) //選択肢index
  const [volume, setVolume] = useState(1); //音量
  const [playCorrect] = useSound(correctSound, { volume }); //正解音声
  const [playWrong] = useSound(wrongSound, { volume }); //不正解音声

  const section = sections[sectionCount]
  const problem = section.problems[problemCount];
  const pick = section.pick
  const answer = (typeof problem.answer) === 'number' ? problem.answer as number : new Set(problem.answer as number[]);
  const checkResult = checkTables[sectionCount][problemCount];
  useEffect(() => {
    getOptionIndexes(problem, sectionCount, problemCount, indexTables, setIndexTables);
  }, [problemCount]);
  const optionIndexes = indexTables[sectionCount][problemCount];

  // 回答提出時処理
  const submit = () => {
    setCanSubmit(false); //多重押し阻止・回答可能フラグ初期化
    const result = getResult(choicedNumber, choicedSet, answer); // 答え合わせ
    updateChoiceTable(problem, choicedNumber, choicedSet, sectionCount, problemCount, choiceTables, setChoiceTables);
    updateCheckTable(result, sectionCount, problemCount, checkTables, setCheckTables); // checkTable更新
    setIsShowImage(true); // 画像表示
    result ? playCorrect() : playWrong() // 結果音再生
    // 後処理
    setTimeout(() => {
      // 問題/区分カウンタ更新
      if (problemCount < pick - 1) {
        setProblemCount(problemCount + 1);
      } else {
        setProblemCount(0);
        if (sectionCount === sections.length - 1) {
          setGoResult(true);
        } else {
          setSectionCount(sectionCount + 1);
        }
      }
      setIsShowImage(false); // 結果画像非表示
      setChoicedNumber(-1); // 回答選択初期化
      setChoicedSet(new Set()); // 回答選択初期化
    }, 1000); // 1秒後に非表示
  };

  // ビュー
  return (
    <div className=''>
      <div className='lg:pl-72'>
        <div className="mx-auto max-w-4xl pt-20 lg:pt-8">
          <div className="mt-2 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="relative rounded-lg bg-white p-3.5 lg:p-6">
              {isShowImage &&
                <Image
                  src={checkTables[sectionCount][problemCount] === 'C' ? chilene : tima}
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
                        {'`' + problem.problemMathJ + '`'}
                      </MathJax>
                    </MathJaxContext>
                  }
                </div>
                {checkResult === 'N' ?
                  <Options props={{
                    problem, choicedNumber, choicedSet, optionIndexes, setChoicedNumber, setChoicedSet, setCanSubmit
                  }} />
                  : <OptionsAfter props={{ sectionCount, problemCount, problem, optionIndexes, choiceTables }} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="z-10 fixed bottom-0 w-full">{/* 提出ボタン */}
        <div className=" lg:pl-72">
          <div className=" mx-auto max-w-4xl  text-center">
            <div className='mt-2 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20'>
              <div className="rounded-lg bg-yellow-200 p-3.5 lg:p-6">
                <p></p>
              </div>
            </div>
            <div className='rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20'>
              <div className="rounded-lg bg-white p-3.5 lg:p-6">
                <Footer props={{ submit, isShowImage, canSubmit, problemCount, sectionCount, checkTables, setSectionCount, setProblemCount }} />
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}