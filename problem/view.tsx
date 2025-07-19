'use client'
import { useEffect, useState } from "react";
import correctSound from "./sound/correct.mp3";
import wrongSound from "./sound/wrong.mp3";
import { type Section, type CheckTables, type PickSet, ChoiceTables } from "./main";
import useSound from "use-sound";
import Volume from "./volume";
import { getResult, getOptionIndexes, updateChoiceTable, getPrevNext } from "./logics";
import Options from "./options";
import { Checks, updateCheckTable } from "./check";
import { Footer } from "./footer";
import Explanation from "./explanation";
import JudgeImage from "./judgeImage";
import ProblemText from "./text";
import ProblemHeader from "./problemHeader";



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
  const [showJudge, setShowJudge] = useState(false); //結果表示フラグ
  const [isResult, setIsResult] = useState(false); //リザルト行きフラグ
  const [checkTables, setCheckTables] = useState(initCheckTables); //丸付け表
  const [choiceTables, setChoiceTables] = useState<ChoiceTables>(initChoiceTables); //丸付け表
  const [canSubmit, setCanSubmit] = useState(false); //提出可否
  const [indexTables, setIndexTables] = useState<number[][][]>(initIndexTables) //選択肢index
  const [isExplaining, setIsExplaining] = useState(false) //説明開閉
  const [volume, setVolume] = useState(1); //音量
  const [playCorrect] = useSound(correctSound, { volume }); //正解音声
  const [playWrong] = useSound(wrongSound, { volume }); //不正解音声

  const section = sections[sectionCount]
  const problem = section.problems[problemCount];
  const pick = section.pick
  const answer = (typeof problem.answer) === 'number' ? problem.answer as number : new Set(problem.answer as number[]);
  const checkResult = checkTables[sectionCount][problemCount];
  const canExplain = checkResult !== 'N';
  useEffect(() => {
    getOptionIndexes(problem, sectionCount, problemCount, indexTables, setIndexTables);
  }, [sectionCount, problemCount]);
  const optionIndexes = indexTables[sectionCount][problemCount];

  const { canGoBack, prevSection, prevProblem, canGoForward, nextSection, nextProblem, isLastProblem }
   = getPrevNext(problemCount, sectionCount, checkTables);
  
  const jumpSection= (sectionNumber:number)=>{
    if(sectionCount != sectionNumber){
      setChoicedNumber(-1); // 回答選択初期化
      setChoicedSet(new Set()); // 回答選択初期化
      setSectionCount(sectionNumber);
      setProblemCount(0);
    }
  };

  const goBack = () => {
    if(isResult){
      setIsResult(false);
    }else{
      setSectionCount(prevSection);
      setProblemCount(prevProblem);
    }
  };
  
  const goForward = () => {
    if(isLastProblem){
      setIsResult(true);
    }else{
      setSectionCount(nextSection);
      setProblemCount(nextProblem);
    }
  };
  
  const resetProblem = () =>{
    setProblemCount(0);
    setSectionCount(0);
    setIsResult(false);
    setCheckTables([...initCheckTables]);
    setChoiceTables([...initChoiceTables]);
    setIndexTables([...initIndexTables]);
  };

  const openExplain =() =>{
    setIsExplaining(true);
  };

  // 回答提出時処理
  const submit = () => {
    setCanSubmit(false); //多重押し阻止・回答可能フラグ初期化
    const result = getResult(choicedNumber, choicedSet, answer); // 答え合わせ
    updateChoiceTable(problem, choicedNumber, choicedSet, sectionCount, problemCount, choiceTables, setChoiceTables);
    updateCheckTable(result, sectionCount, problemCount, checkTables, setCheckTables); // checkTable更新
    setShowJudge(true); // 画像表示
    result ? playCorrect() : playWrong() // 結果音再生
    // 後処理
    setTimeout(() => {
      // 問題/区分カウンタ更新
      result ? goForward() : setIsExplaining(true);
      setShowJudge(false); // 結果画像非表示
      setChoicedNumber(-1); // 回答選択初期化
      setChoicedSet(new Set()); // 回答選択初期化
    }, 1000); // 1秒後に非表示
  };



  // ビュー
  return (
    <div className='h-screen grid grid-rows-[1fr_400px] grid-cols-1 lg:pl-72'>
      <div className='overflow-y-auto'>
        <div className="mx-auto max-w-4xl pt-20 lg:pt-8">
          <div className="mt-2 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="relative rounded-lg bg-white p-3.5 lg:p-6">
              <JudgeImage props={{ showJudge, sectionCount, problemCount, checkTables }} />

              <div className="space-y-8">
                <Volume volume={volume} setVolume={setVolume} />
                <ProblemHeader props={{sectionCount, sections, checkTables, jumpSection}} />
                <p>[{section.name}]、分類{sectionCount + 1}、問題{problemCount + 1}/{pick}</p>
                <Checks checkTable={checkTables[sectionCount]} />
                {isResult ?
                  'リザルト！' : <ProblemText props={{ problem }} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="z-10 w-full text-center">{/* 提出ボタン */}

        <div className='mx-auto max-w-4xl'>
          {!isResult &&
            <div className='mt-2 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20'>
              <div className="rounded-lg bg-white p-3.5 lg:p-6">
                <Options props={{
                  sectionCount, problemCount, choiceTables, problem, choicedNumber, choicedSet, checkResult, optionIndexes, setChoicedNumber, setChoicedSet, setCanSubmit
                }} />
              </div>
            </div>}
          <div className='rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20'>
            <div className="rounded-lg bg-white p-3.5 lg:p-6">
              <Footer props={{
                isResult, showJudge, canSubmit, canGoBack, canGoForward, canExplain,
                goForward, goBack, submit, resetProblem, openExplain
              }} />
            </div>
          </div>
        </div>


      </footer>
      <Explanation props={{problem, isExplaining, goForward, setIsExplaining}}/>
    </div>
  );
}