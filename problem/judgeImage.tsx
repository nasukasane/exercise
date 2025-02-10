import Image from "next/image";
import { CheckTables } from "./main";

type PropType = {
  props: {
    showJudge: boolean,
    sectionCount: number,
    problemCount: number,
    checkTables: CheckTables,
  };
}

export default function JudgeImage({ props: { showJudge, sectionCount, problemCount, checkTables } }: PropType) {
  return (
    <div>
      {showJudge &&
      <Image
        src={checkTables[sectionCount][problemCount] === 'C'
          ? "/image/chilene.jpg"
          : "/image/tima.png"}
        alt="正解・不正解結果通知画像"
        width={200}
        height={200}
        className="absolute top-400 left-400"
      />
      }
    </div>
  )
}