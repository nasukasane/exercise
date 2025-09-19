'use client';

import { Chapter, ProblemIndex, Answer, WinPerCharacter } from "@/services/type"
import { useEffect, useState } from "react";
import ProblemMain from "./problemMain";
import Judge from "./judge";
import ProblemResult from "./problemResult";
import getSounds from "@/services/getSounds";
import ProblemInput from "./problemInput";
import { useMenuVariablesSetterContext } from "@/app/_contexts/menuContext";
import { useVolumeContext } from "@/app/_contexts/volumeContext";
import getJudgeImage from "@/services/getJudgeImage";
import { useCharacterContext } from "@/app/_contexts/characterContext";
import { getCharacterList, getCharacterProperty } from "@/services/characterList";


type Props = {
  chapters: Chapter[];
  problemIndexes: ProblemIndex[];
  hasNext: boolean;
}

export default function ProblemView({ props }: { props: Props }) {
  const { chapters, problemIndexes } = props;
  const problemLength = problemIndexes.length; //問題長
  const [count, setCount] = useState(0); //問題番号
  const [selectedAnswers, setSelectedAnswers] =
    useState<Answer[]>(new Array(problemLength).fill(undefined)); //回答ログ
  const cheerCharacter = useCharacterContext();

  //結果表示
  const [judgeOption, setJudgeOption] = useState<undefined | Answer>(undefined); //結果表示フラグ
  const [judgeTimer, setJudgeTimer] = useState<NodeJS.Timeout | undefined>(undefined); //判定表示時に使用するタイマーのID
  const [winStreak, setWinStreak] = useState(0); //連勝数
  const characterProperty = getCharacterProperty()[cheerCharacter];
  const {correctCharacterUrl, wrongCharacterUrl} = getJudgeImage(winStreak, cheerCharacter, characterProperty);
  const [winPerCharacter, setWinPerCharacter] = useState<WinPerCharacter>(
    getCharacterList().reduce((accumulator:{[character:string]:number}, currentValue:string) => {
    accumulator[currentValue] = 0;
    return accumulator;
  }, {}));

  // 音声
  const { speakerOn, volume } = useVolumeContext();
  const { playCorrect, playWrong } = getSounds(winStreak, volume, cheerCharacter, characterProperty);

  // 画面遷移
  const moveView = (destinationCount: number, reset = false) => {
    setCount(destinationCount);
    if (reset) {
      setSelectedAnswers((new Array(problemLength).fill(undefined)));
    }
  };

  // 回答提出
  const submitAnswer = (selectedOption: Answer) => {
    const judgeTimer = setTimeout(() => {
      afterJudge(selectedOption);
    }, 1050);
    setJudgeOption(selectedOption); //判定画像表示
    setJudgeTimer(judgeTimer); //タイマーID取得（クリック時タイマー解除のために）
    //正解時処理
    if (selectedOption === problem.answer) {
      setWinPerCharacter(winPerCharacter=>{
        const ret = {...winPerCharacter};
        ret[cheerCharacter] += 1;
        return ret
      })
      if (speakerOn) {
        playCorrect();
      }
      setWinStreak(winStreak + 1);
    //不正解時処理
    } else {
      if (speakerOn) {
        playWrong();
      }
      setWinStreak(0);
    }
  };

  // 判定表示後後処理
  const afterJudge = (selectedOption: Answer) => {
    setJudgeOption(undefined);
    if (selectedOption === problem.answer) {
      moveView(count + 1);
    }

    setSelectedAnswers(selectedAnswers => {
      const ret = [...selectedAnswers];
      ret[count] = selectedOption;
      return (ret)
    })

  };

  // chapterの中の未解答問題の一番最初に飛ぶ
  // すべてに回答している場合は第1問に飛ぶ
  const jumpChapter = (chapter: Chapter) => {
    let foundUndefined = false;
    for (const jumpCount of chapter.counts) {
      if (selectedAnswers[jumpCount] === undefined) {
        moveView(jumpCount);
        foundUndefined = true
        break
      }
    }
    if (!foundUndefined) {
      moveView(chapter.counts[0]);
    }
  };


  // ??はリザルト時cout=problemLengthになることを考慮
  const { chapterN, sectionN, pickN } = problemIndexes[count] ?? { chapterN: 0, sectionN: 0, pickN: 0 };
  const problem = chapters[chapterN].sections[sectionN].problems[pickN];
  const isResult = (count === problemLength); //リザルト画面フラグ
  const isLastProblem = (count === problemLength - 1); //最終問題フラグ
  const selectedAnswer = selectedAnswers[count];


  //menuコンテキスト設定
  const setMenuVariablesContext = useMenuVariablesSetterContext()
  useEffect(() => {
    setMenuVariablesContext({ isResult, count, selectedAnswers, chapters, problemLength, problemIndexes, moveView, jumpChapter });
  })


  //props設定
  const problemResultProps = {
    problemLength, selectedAnswers, chapters, problemIndexes,
    characterProperty, winPerCharacter, jumpChapter
  };
  const judgeProps = { judgeOption, judgeTimer, correctCharacterUrl, wrongCharacterUrl, problem, afterJudge };
  const problemMainProps = { problem, selectedAnswer, characterProperty };
  const problemInputProps = {
    count, isResult, isLastProblem, selectedAnswer,
    selectedAnswers, problem, moveView, submitAnswer
  };

  return (
    <Judge props={judgeProps}>
      <div className="absolute -top-[40px] md:-top-[50px] pt-[40px] md:pt-[50px]  h-screen w-full bg-slate-100 flex flex-col">
        <div className="flex-1 overflow-y-auto ">
          {isResult ? <ProblemResult props={problemResultProps} />
            : <ProblemMain props={problemMainProps} />}
        </div>
        <ProblemInput props={problemInputProps} />
      </div>
    </Judge>
  )
}