import { Answer, Problem } from '@/services/type';
import Image from 'next/image';

type Props = {
  showJudge: boolean;
  judgeTimer: NodeJS.Timeout | undefined;
  selectedOption: Answer;
  problem: Problem;
  afterJudge: () => void;
};

export default function Judge({ children, props }: {
  children: React.ReactNode,
  props: Props,
}) {
  const { showJudge, judgeTimer, selectedOption, problem, afterJudge } = props;
  const isCorrect = (selectedOption === problem.answer);

  return (
    <div className="relative">
      {children}

      {/* ロック状態であればオーバーレイを表示 */}
      {showJudge && (
        <button
          className={`absolute inset-0 z-50 flex items-center justify-center
            ${isCorrect ? 'bg-green-200/50' : 'bg-black/50'} `}
          // クリックイベントをキャプチャし、伝播を阻止
          onClick={(e) => {
            e.stopPropagation();
            clearTimeout(judgeTimer);
            afterJudge();
          }

          }
        >
          <Image
            src="/image/chilene.jpg" // publicディレクトリに配置した画像のパス
            alt="判定画像"
            width={200} // 画像の幅
            height={200} // 画像の高さ
            className={`${isCorrect ? 'animate-slide-in-fade' : 'animate-shake-x'} `}
          />
        </button>
      )}

    </div>
  );
}