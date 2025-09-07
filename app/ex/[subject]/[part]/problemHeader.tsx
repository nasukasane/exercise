import { Answer, Chapter, ProblemIndex } from '@/services/type';
import ProblemMenu from './_header/problemMenu';
import XiMenu from './_header/xiMenu';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ProblemSetting from './_header/problemSetting';
import {IconButton} from './_header/iconButton';

type Props = {
  props: {
    isResult: boolean;
    count: number;
    problemLength: number;
    selectedAnswers: Answer[];
    chapters: Chapter[];
    problemIndexes: ProblemIndex[];
    moveView: (destinationCount: number, reset?: boolean) => void;
  }
}

export default function ProblemHeader({ props }: Props) {
  const [speakerOn, setSpeakerOn] = useState(false);
  const Speaker = () => {
    return (
      <IconButton onClick={() => setSpeakerOn(!speakerOn)}>
        {speakerOn ?
          <SpeakerWaveIcon />
          : <SpeakerXMarkIcon />
        }
      </IconButton>
    )
  };

  return (
    <div className="flex items-center justify-between p-1 bg-gray-200 md:p-4">
      {/* 左側のコンテナ */}
      <div className="w-[35px] md:w-[50px]">
        <XiMenu />
      </div>

      {/* 中央のコンテナ */}
      <div className="">
        <ProblemMenu props={props} />
      </div>

      {/* 右側のコンテナ */}
      <div className="flex items-center md:space-x-2">
        <div className="hidden md:w-[50px] md:block">
          <Speaker />
        </div>
        <div className="w-[35px] md:w-[50px]">
          <ProblemSetting />
        </div>
      </div>
    </div>
  )
}
