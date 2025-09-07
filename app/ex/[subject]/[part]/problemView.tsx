'use client';

import { Chapter, ProblemIndex, Answer } from "@/services/type"
import { useState } from "react";
import ProblemHeader from "./problemHeader";
import ProblemOptions from "./problemOptions";
import ProblemFooter from "./problemFooter";
import ProblemMain from "./problemMain";
import Judge from "./judge";
import ProblemResult from "./problemResult";

type Props = {
  chapters: Chapter[];
  problemIndexes: ProblemIndex[];
}





export default function ProblemView({ props }: { props: Props }) {
  const { chapters, problemIndexes } = props;
  const problemLength = problemIndexes.length; //問題長
  const [count, setCount] = useState(0); //問題番号
  const [selectedOption, setSelectedOption] = useState<Answer>(undefined); //選択
  const [selectedAnswers, setSelectedAnswers] =
    useState<Answer[]>(new Array(problemLength).fill(undefined)); //回答ログ
  const [showJudge, setShowJudge] = useState(false); //結果表示フラグ

  const [judgeTimer, setJudgeTimer] = useState<NodeJS.Timeout | undefined>(undefined);


  // 画面遷移
  const moveView = (destinationCount: number, reset = false) => {
    setSelectedOption(undefined);
    setCount(destinationCount);
    if (reset) {
      setSelectedAnswers((new Array(problemLength).fill(undefined)));
    }
  };

  // 回答提出
  const submitAnswer = () => {
    const judgeTimer = setTimeout(() => {
      afterJudge();
    }, 1000);
    setShowJudge(true); //判定画像表示
    setJudgeTimer(judgeTimer); //タイマーID取得（クリック時タイマー解除のために）
  };

  // 判定表示後後処理
  const afterJudge = () => {
    setShowJudge(false);
    if (selectedOption === problem.answer) {
      moveView(count + 1);
    }

    setSelectedAnswers(selectedAnswers => {
      const ret = [...selectedAnswers];
      ret[count] = selectedOption;
      return (ret)
    })

  };

  // ??はリザルト時cout=problemLengthになることを考慮
  const { chapterN, sectionN, pickN } = problemIndexes[count] ?? { chapterN: 0, sectionN: 0, pickN: 0 };
  const problem = chapters[chapterN].sections[sectionN].problems[pickN];
  const isResult = (count === problemLength); //リザルト画面フラグ
  const isLastProblem = (count === problemLength - 1); //最終問題フラグ
  const selectedAnswer = selectedAnswers[count];


  
  const problemResultProps =  { problemLength, selectedAnswers, chapters, problemIndexes, moveView };
  const judgeProps = { showJudge, judgeTimer, selectedOption, problem, afterJudge };
  const problemHeaderProps={isResult, count, problemLength, selectedAnswers, chapters, problemIndexes, moveView};
  const problemMainProps = { problem, selectedAnswer };
  const problemOptionProps = { problem, selectedOption, selectedAnswer, setSelectedOption };
  const problemFooterProps = { count, isResult, isLastProblem, selectedOption, selectedAnswer, 
    selectedAnswers, moveView, submitAnswer };

  return (
    <Judge props={judgeProps}>
      <div className="h-screen grid grid-cols-1 grid-rows-[40px_1fr_auto_70px] md:grid-rows-[50px_1fr_auto_90px]">
        <ProblemHeader props={problemHeaderProps}/>
        <div className="overflow-y-auto ">
          {isResult ? <ProblemResult props={problemResultProps} />
                    : <ProblemMain props={problemMainProps} />}
        </div>
        {isResult ? <div></div> : <ProblemOptions props={problemOptionProps} />}
        <ProblemFooter props={problemFooterProps} />
      </div>
    </Judge>
  )
}