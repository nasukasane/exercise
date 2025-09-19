
import { MenuVariablesContext } from '@/app/_contexts/menuContext';
import { Chapter } from '@/services/type';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react';


export default function ProblemMenu() {
  const menuVariables = useContext(MenuVariablesContext);
  if (menuVariables === undefined) {
    return (<></>)
  }
  const { count, problemLength, isResult, selectedAnswers, problemIndexes, chapters, moveView, jumpChapter } = menuVariables;
  const chapterN0 = isResult ? undefined : problemIndexes[count].chapterN;
  const chapterTitle = typeof chapterN0 === "number" ? chapters[chapterN0].title : "リザルト";
  const allAnswered = selectedAnswers.every(a => { return a !== undefined });
  const remainingProblem = selectedAnswers.filter(element => element === undefined).length;

  const Marks = ({ chapter }: { chapter: Chapter }) => {
    return (
      <div className="w-[100px] text-left flex" >
        {chapter.counts.map((countN) => {
          const { chapterN, sectionN, pickN } = problemIndexes[countN];
          const problemAnswer = chapters[chapterN].sections[sectionN].problems[pickN].answer;
          if (selectedAnswers[countN] === undefined) {
            return (
              <div className='inline w-6' key={countN}>
                <QuestionMarkCircleIcon />
              </div>
            )
          }
          else if (selectedAnswers[countN] === problemAnswer) {
            return (
              <div className='inline w-6 text-green-600' key={countN}>
                <CheckIcon />
              </div>
            )
          } else {
            return (<div className='inline w-6 text-red-600' key={countN}>
              <XMarkIcon />
            </div>
            )
          }
        })
        }
      </div>
    )
  }
  return (
    <div className="text-sm md:text-lg">
      <Menu>
        <MenuButton
          className="items-center rounded-md 
           bg-gray-200 py-1.5 px-1 font-semibold text-gray-800  
           focus:outline-none data-[hover]:bg-gray-300 data-[open]:bg-gray-400
           border-gray-700 border
           data-[focus]:outline-1 data-[focus]:outline-gray-700
           md:px-3">
          <div className='flex w-[240px] md:w-[400px] '>
            <ChevronDownIcon className="flex-none w-3 fill-gray-800 md:w-6" />
            <div className='flex-auto text-center'>{chapterTitle}</div>
            <div className='flex-none bg-slate-300 text-xs md:text-base md:w-20'>残り{remainingProblem}問</div>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="rounded-xl border z-20 max-w-[300px] border-gray-600 bg-white p-1
           transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
           focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0  md:max-w-[500px]"
        >
          <MenuItem>
            <div className='px-2'>
              <div className='py-1'>選択した問題に移動</div>
              <hr className='border-gray-500' />
            </div>
          </MenuItem>

          {chapters.map((chapter, chapterN) => {
            return (
              <MenuItem key={chapterN}>
                <button onClick={() => jumpChapter(chapter)}
                  className="group flex w-full items-center gap-2 rounded-lg py-2 px-1 hover:bg-blue-200 content-center md:px-3">
                  <div className="w-[10px] md:w-[20px]" >{chapterN === chapterN0 && <ChevronRightIcon className='w-5' />}</div>
                  <div className="w-[200px] text-left md:w-[380px]">{chapter.title}</div>
                  <Marks key={chapterN} chapter={chapter} />
                </button>
              </MenuItem>
            )
          })}
          {(allAnswered || isResult) ? (
            <MenuItem>
              <div>
                <hr className='border-gray-500' />
                <button onClick={() => moveView(problemLength)}
                  className='group w-full rounded-lg py-2 px-1 hover:bg-blue-200 md:px-3'>
                  <div className='flex items-center gap-2 content-center'>
                    <div className="w-[10px] md:w-[20px]" >{count === problemLength && <ChevronRightIcon className='w-5' />}</div>
                    <div className="w-[200px] text-left md:w-[380px]">リザルト</div>
                  </div>
                </button>
              </div>
            </MenuItem>) :
            <MenuItem><div></div></MenuItem>
          }
        </MenuItems>
      </Menu>
    </div >

  )
}
