import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogPanel, Switch, Transition, TransitionChild } from '@headlessui/react';
import { useState } from 'react';
import { SpeakerWithSlider } from './speakerButton';
import Image from 'next/image';
import { characterList } from '@/services/characterList';
import { useCharacterContext, useCharacterSetterContext } from '@/app/_contexts/characterContext';
import { useTestModeContext, useTestModeSetterContext } from '@/app/_contexts/testModeContext';

function Contents() {
  const cheerCharacter = useCharacterContext();
  const setCheerCharacter = useCharacterSetterContext();
  const testMode = useTestModeContext();
  const setTestMode = useTestModeSetterContext();

  return (
    <div className='px-2'>
      {/* 音量設定 */}
      <div className='border-t py-2'>
        <SpeakerWithSlider />
      </div>
      {/* キャラクター設定 */}
      <div className='border-t py-2'>
        <div className='grid grid-cols-3 gap-4 '>
          {characterList.map((characterName, index) => {
            return (
              <button key={index} className={`flex justify-center rounded-full items-center w-[65px] h-[65px]
                 ${cheerCharacter === characterName && 'border-4 border-blue-600'}`}
                onClick={() => { setCheerCharacter(characterName) }}>
                <Image src={`/image/icons/${characterName}.png`}
                  alt={`${characterName} icon`}
                  width={60}
                  height={60}
                  className={`rounded-full hover:opacity-70
                      ${cheerCharacter === characterName ? 'opacity-100' : 'opacity-50'}`}
                />
              </button>
            )
          })}
        </div>
      </div>
      {/* テストモード */}
      <div className='border-t py-2 flex'>
        <div className='pl-2 pr-4'>テストモード</div>
        <Switch
          checked={testMode}
          onChange={setTestMode}
          className={`group inline-flex h-6 w-11 items-center rounded-full transition
            ${testMode ? 'bg-blue-400' : ' bg-gray-200'}`} >
          <span className={`size-4 translate-x-1 rounded-full transition bg-white
            ${testMode ? 'translate-x-6' : 'translate-x-1 '}`} />
        </Switch>
      </div>
    </div>
  )
}

export default function ProblemSetting() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className='w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300'>
        <Cog6ToothIcon />
      </button>

      <Transition show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          {/* メニューのオーバーレイ（背景） */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* サイドメニュー本体 */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                <TransitionChild
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-[250px] ">
                    {/* メニューの中身 */}
                    <div className="flex h-full flex-col overflow-y-auto bg-white p-1 shadow-xl">
                      <div className='flex justify-end'>
                        <button onClick={() => { setIsOpen(false) }}
                          className='rounded-lg mr-1 text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300 w-[35px] md:mr-2 md:w-[50px]'>
                          <XMarkIcon />
                        </button>
                      </div>
                      <Contents />
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}