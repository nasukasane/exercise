import { Answer, Problem } from '@/services/type';
import Image from 'next/image';

type Props = {
  judgeOption: undefined | Answer;
  judgeTimer: NodeJS.Timeout | undefined;
  correctCharacterUrl: undefined|string;
  wrongCharacterUrl: undefined|string;
  problem: Problem;
  afterJudge: (selectedOption: Answer) => void;
};

export default function Judge({ children, props }: {
  children: React.ReactNode,
  props: Props,
}) {
  const { judgeOption, judgeTimer, correctCharacterUrl, wrongCharacterUrl,
    problem, afterJudge } = props;
  const isCorrect = (judgeOption === problem.answer);

  return (
    <div className="relative size-full">
      {children}

      {/* ロック状態であればオーバーレイを表示 */}
      {judgeOption !== undefined && (
        <button
          className={`absolute inset-0 z-50 flex items-center justify-center
            ${isCorrect ? 'bg-green-200/50' : 'bg-black/50'} `}
          // クリックイベントをキャプチャし、伝播を阻止
          onClick={(e) => {
            e.stopPropagation();
            clearTimeout(judgeTimer);
            afterJudge(judgeOption);
          }

          }
        >
          <div className={`relative w-[400px] h-[400px] ${isCorrect ? 'animate-slide-in-fade' : 'animate-shake-x'} `}>
            {/* 背景側 */}
            <Image
              src={`/image/${isCorrect ? "correctJudge" : "wrongJudge"}.png`}
              alt="Correct text"
              fill
              className="absolute -top-20 z-10 object-contain"
            />

            {/* 前景側 */}
            { correctCharacterUrl && wrongCharacterUrl &&
            <Image
              src={`${isCorrect ? correctCharacterUrl : wrongCharacterUrl}`}
              alt="Celebration character"
              width={150}
              height={150}
              className="absolute z-20 bottom-0"
            />
            }
          </div>

        </button>
      )}

    </div>
  );
}