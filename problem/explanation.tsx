import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Problem } from './main'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Explanation({ props: { problem, isExplaining, goForward, setIsExplaining } }:
  {
    props: {
      problem: Problem,
      isExplaining: boolean,
      goForward: () => void,
      setIsExplaining: Dispatch<SetStateAction<boolean>>,
    }
  }) {
  function close() {
    setIsExplaining(false)
  }

  return (
    <Dialog open={isExplaining} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-gray-700 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="grid grid-cols-3 bg-slate-600">
              <DialogTitle as="h3" className="col-start-2 text-base/7 font-medium text-white text-center ">
                解説
              </DialogTitle>
              <div className='text-right mt-1'>
                <button
                  onClick={() => setIsExplaining(false)}
                  className="text-gray-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-sm/6 text-white/90">
              {problem.explanation}
            </p>
            <div className="mt-4 text-center">
              <Button
                className="rounded-md bg-blue-600 py-1.5 px-3 font-medium text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-800"
                onClick={() => {
                  setIsExplaining(false);
                  goForward();
                }}
              >
                次問へ進む
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}