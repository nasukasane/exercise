import { Answer, Chapter, CharacterProperty, ProblemIndex, WinPerCharacter } from "@/services/type";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";


function getImageUrl(
  allDone: boolean,
  isExcellent: boolean,
  characterProperty: CharacterProperty
) {
  let resultImageUrl = '/image/defaultResult.png';
  let stampImageUrl = '/image/notDoneDefaultStamp.png';
  if (allDone) {
    // 優秀判定
    if (isExcellent) {
      stampImageUrl = '/image/excellentStamp.png';
      if(characterProperty.hasExcellentResultImage){
        resultImageUrl = `/image/${characterProperty.characterName}/excellentResult.png`;
      }
      // 凡判定
    } else {
      stampImageUrl = '/image/normalStamp.png';
      if(characterProperty.hasNormalResultImage){
        resultImageUrl = `/image/${characterProperty.characterName}/normalResult.png`;
      }
    }
    // 未完
  } else if (characterProperty.hasNotDoneImage){ 
    resultImageUrl = `/image/${characterProperty.characterName}/notDoneResult.png`;
  }

  return { resultImageUrl, stampImageUrl };
}

type Props = {
  props: {
    problemLength: number;
    selectedAnswers: Answer[];
    chapters: Chapter[];
    problemIndexes: ProblemIndex[];
    characterProperty: CharacterProperty;
    winPerCharacter: WinPerCharacter;
    jumpChapter: (chapter: Chapter) => void;
  }
}

// モックデータ
export default function ProblemResult({ props }: Props) {
  const { problemLength, selectedAnswers, chapters, problemIndexes,
    characterProperty, winPerCharacter, jumpChapter } = props;
  const chapterCorrect: number[] = new Array(chapters.length).fill(0); //chapterごとの正解数
  const chapterDone: boolean[] = new Array(chapters.length).fill(true); //chapterごとの全問回答済みフラグ
  const sumCorrect = problemIndexes.reduce((sum, { chapterN, sectionN, pickN }, i) => {
    if (selectedAnswers[i] === undefined) {
      chapterDone[chapterN] = false;
      return sum;
    } else {
      const correct = Number(selectedAnswers[i] === chapters[chapterN].sections[sectionN].problems[pickN].options.answer)
      chapterCorrect[chapterN] += correct
      return sum + correct;
    }
  }, 0); //合計正解数
  const score = Math.ceil(sumCorrect * 100 / problemLength); //100点満点スコア
  const allDone = chapterDone.every(done => done);
  const isExcellent = (winPerCharacter[characterProperty.characterName] / problemLength) > 0.9 //優秀判定

  // 画像URL 全て回答済みか/優秀か/凡か
  const { resultImageUrl, stampImageUrl } = getImageUrl(allDone, isExcellent, characterProperty);

  return (
    // 画面全体を占めるコンテナをflexboxで左右1:1に分割
    <div className="flex flex-col md:flex-row w-full">
      <div className="flex items-center justify-center flex-1 relative md:flex-row">
        <Image
          src={resultImageUrl}
          alt="リザルト通知画像"
          width={600} // 画像の幅
          height={600} // 画像の高さ
          className="px-10 md:px-0"
        />

        <Image
          src={stampImageUrl}
          alt="結果判定スタンプ"
          width={100} // 画像の幅
          height={100} // 画像の高さ
          className="absolute top-5 left-10 md:top-10 md:left-10" // 左上に配置
        />
      </div>

      <div className="md:flex-1 p-4 md:p-8">
        {allDone ?
          <h1 className="flex justify-center mb-4 mx-auto text-red-600 text-2xl md:text-5xl">{score}点！</h1>
          : <h1 className="flex justify-center mb-4 mx-auto text-red-600 text-base md:text-2xl">
            <div className="w-6 mr-1 md:w-8 md:mr-2"><ExclamationCircleIcon /></div>
            <div>まだ回答の途中です！</div>
          </h1>
        }

        <div>
          <div className="flex w-full border-b-2 border-gray-400 pb-2 text-sm md:text-xl">
            <div className="flex-auto"></div>
            <div className="w-[100px] text-center md:text-base md:w-[130px]">正解数／問題数</div>
          </div>

          {/* 表の行データ */}
          {chapters.map((chapter, chapterN) => (
            <button
              key={chapterN}
              className={`flex w-full border-b border-gray-200 py-2 text-sm md:text-xl ${chapterDone[chapterN] || "bg-red-200 hover:bg-red-300"}`}
              onClick={() => { jumpChapter(chapter) }}
              disabled={chapterDone[chapterN]}
            >
              <div className="flex-auto mr-2">{chapter.chapterTitle}</div>
              <div className="w-[100px] text-center md:w-[130px]">
                {chapterDone[chapterN] ?
                  `${chapterCorrect[chapterN]}／${chapters[chapterN].sumPickN}`
                  : <div className="text-slate-100 bg-red-600 rounded-lg mx-2">途中</div>
                }
              </div>
            </button>
          ))}

          {
            allDone && (
              <div className="flex border-t-2 border-gray-400 pb-2 text-sm md:text-xl">
                <div className="flex-auto mr-2 text-center">合計</div>
                <div className="w-[100px] text-center md:w-[130px]">{sumCorrect}／{problemLength}</div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
}


