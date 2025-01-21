'use client'
import { useState } from "react";
import Image from 'next/image';
import chilene from "./data/chilene.jpg"
import tima from "./data/tima.png" 

export type Problem = {
  type: string;
  problemText: string;
  answer: number;
  randomize_option: boolean;
  answerFigure: boolean;
  options: string[];
};

export function View({ data }: { data: { problems: Problem[] } }) {
  const [choice, setChoice] = useState(-1);
  const [problemCount, setProblemCount] = useState(0);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const submit = () => {
    setIsShowImage(true);
    setTimeout(() => {
      setIsShowImage(false);
      setProblemCount(problemCount + 1);
      setChoice(-1);
      setIsCorrect(false);
    }, 1000); // 1秒後に非表示
  };
  const choiceAnswer = (index: number) => {
    setChoice(index);
  };
  const problem = data.problems[problemCount];
  return (
    <div className="relative">
      {isShowImage && 
        <Image
          src={choice === problem.answer ? chilene : tima}
          alt="正解画像"
          width={200}
          height={200}
          className="absolute top-400 left-400"
        />
      }
      <div className="space-y-8">
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