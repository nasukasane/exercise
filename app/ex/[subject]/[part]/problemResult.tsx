import { Answer, Chapter, ProblemIndex } from "@/services/type";
import Image from "next/image";

type Props = {
  props: {
    problemLength: number;
    selectedAnswers: Answer[];
    chapters: Chapter[];
    problemIndexes: ProblemIndex[];
    moveView: (destinationCount: number, reset?: boolean) => void;
  }
}

// app/page.tsx

// モックデータ
export default function ProblemResult({props}: Props) {
  const { problemLength, selectedAnswers, chapters, problemIndexes, moveView } = props;
  const chapterCorrect: number[] = new Array(chapters.length).fill(0);
  const sumCorrect = problemIndexes.reduce((sum, {chapterN, sectionN, pickN}, i)=> {
      if(selectedAnswers[i] === undefined){
        return sum;
      } else {
        const correct = Number(selectedAnswers[i] === chapters[chapterN].sections[sectionN].problems[pickN].answer)
        chapterCorrect[chapterN] += correct
        return sum + correct;
      }
    }, 0) ;
  const score = Math.ceil(sumCorrect * 100 / problemLength);

  return (
    // 画面全体を占めるコンテナをflexboxで左右1:1に分割
    <div className="md:flex w-full">
      <div className="flex items-center justify-center flex-1 relative">
        {/* 下地の画像 picture1.png */}
        <Image
          src="/image/chilene.jpg" // publicディレクトリに配置した画像のパス
          alt="リザルト通知画像"
          layout="fill"
          objectFit="cover"
        />

        <Image
          src="/image/chilene.jpg" // publicディレクトリに配置した画像のパス
          alt="リザルト通知画像"
          width={100} // 画像の幅
          height={100} // 画像の高さ
          className="absolute top-10 left-10" // 左上に配置
        />
      </div>

      <div className="md:flex-1 p-4 md:p-8">
        <h1 className="flex justify-center mb-4 mx-auto text-red-600 text-2xl md:text-5xl">{score}点！</h1>

        <div>
          <div className="flex border-b-2 border-gray-400 pb-2 text-sm md:text-xl">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">正解数／問題数</div>
          </div>

          {/* 表の行データ */}
          {chapters.map((chapter, chapterN) => (
            <div key={chapterN} className="flex border-b border-gray-200 py-2 text-sm md:text-xl">
              <div className="flex-1">{chapter.chapterTitle}</div>
              <div className="flex-1 text-center">{chapterCorrect[chapterN]}／{chapters[chapterN].sumPickN}</div>
            </div>
          ))}

          <div className="flex border-t-2 border-gray-400 pb-2 text-sm md:text-xl">
            <div className="flex-1">合計</div>
            <div className="flex-1 text-center">{sumCorrect}／{problemLength}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


