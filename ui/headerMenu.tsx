'use client';

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import XiMenu from './xiMenu';
import ProblemSetting from './problemSetting';
import { useVolumeContext, useVolumeSetterContext } from '@/app/volumeContext';
import { usePathname } from 'next/navigation';
import ProblemMenu from './problemMenu';


const Speaker = () => {
  const { speakerOn, volume } = useVolumeContext();
  const { setSpeakerOn, setVolume } = useVolumeSetterContext();
  return (
    <button
      onClick={() => setSpeakerOn(!speakerOn)}
      className='w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300'>
      {speakerOn ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
    </button>
  )
};

export default function HeaderMenu() {
  const pathname = usePathname();
  const isProblemUrl = /^\/ex\/[^/]+\/[^/]+$/.test(pathname);

  return (
    <div className="flex w-full items-center justify-between p-1 bg-gray-200 md:p-4">
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
          <Speaker />
        </div>
        <div className="w-[35px] md:w-[50px]">
          <ProblemSetting />
        </div>
      </div>
    </div>
  )
}
