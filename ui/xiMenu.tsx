import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { useState } from 'react';
import LeftMenu from './leftMenu';


export default function XiMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button onClick={() => setIsOpen(true)} className='w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300'>
        <Bars3Icon />
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
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 ">
                <TransitionChild
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-[250px] ">
                    {/* メニューの中身 */}
                    <div className="flex h-full flex-col overflow-y-auto bg-white p-1 shadow-xl">
                      <button onClick={()=>{setIsOpen(false)}}
                        className='rounded-lg w-[35px] text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300'>
                        <XMarkIcon />
                      </button>
                      <LeftMenu close={()=>setIsOpen(false)} />
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