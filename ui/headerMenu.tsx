'use client';

import XiMenu from './xiMenu';
import ProblemSetting from './problemSetting';
import { usePathname } from 'next/navigation';
import ProblemMenu from './problemMenu';
import SpeakerButton from './speakerButton';


export default function HeaderMenu() {
  const pathname = usePathname();
  const isProblemUrl = /^\/ex\/[^/]+\/[^/]+$/.test(pathname);

  return (
    <div className="flex w-full z-10 items-center justify-between p-1 bg-gray-200 md:p-4">
      {/* 左側のコンテナ */}
      <div className="w-[35px] md:w-[50px]">
        <XiMenu />
      </div>

      {/* 中央のコンテナ */}
      <div className="">
        {isProblemUrl && <ProblemMenu />}
      </div>

      {/* 右側のコンテナ */}
      <div className="flex items-center md:space-x-2">
        <div className="hidden md:w-[50px] md:block">
          <SpeakerButton />
        </div>
        <div className="w-[35px] md:w-[50px]">
          <ProblemSetting />
        </div>
      </div>
    </div>
  )
}
