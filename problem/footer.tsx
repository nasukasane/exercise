
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { CheckTables } from './main';
import { Dispatch, SetStateAction } from 'react';

const getPrevInfo = (problemCount: number, sectionCount: number, checkTables: CheckTables) => {
  if (problemCount === 0) {
    const prevSection = sectionCount - 1;
    return {
      canGoBack: sectionCount !== 0,
      prevSection,
      prevProblem: sectionCount === 0 ? -1 : checkTables[prevSection].length - 1,
    };
  } else {
    return {
      canGoBack: true,
      prevSection: sectionCount,
      prevProblem: problemCount - 1,
    };
  }
}

const getNextInfo = (problemCount: number, sectionCount: number, checkTables: CheckTables) => {
  // 未回答の問題の場合、提出ボタンで先に進めさせる
  if (checkTables[sectionCount][problemCount] === 'N') {
    return {
      canGoForward: false,
      nextProblem: problemCount + 1,
      nextSection: sectionCount,
    }
    // 章末問題の場合
  } else if (problemCount === checkTables[sectionCount].length - 1) {
    return {
      canGoForward: sectionCount !== checkTables.length - 1,
      nextProblem: 0,
      nextSection: sectionCount + 1,
    }
  } else {
    return {
      canGoForward: true,
      nextProblem: problemCount + 1,
      nextSection: sectionCount,
    }
  };
}

export function Footer({
  props: { submit, showJudge, canSubmit, problemCount, sectionCount, checkTables, setSectionCount, setProblemCount } }:
  {
    props: {
      submit: () => void,
      showJudge: boolean,
      canSubmit: boolean,
      problemCount: number,
      sectionCount: number,
      checkTables: CheckTables,
      setSectionCount: Dispatch<SetStateAction<number>>,
      setProblemCount: Dispatch<SetStateAction<number>>,
    }
  }
) {
  const { canGoBack, prevSection, prevProblem } = getPrevInfo(problemCount, sectionCount, checkTables);
  const { canGoForward, nextSection, nextProblem } = getNextInfo(problemCount, sectionCount, checkTables);
  const goBack = () => {
    setSectionCount(prevSection);
    setProblemCount(prevProblem);
  };
  const goForward = () => {
    setSectionCount(nextSection);
    setProblemCount(nextProblem);
  };

  return (
    <div className="flex justify-between items-center">
      <div className='w-12 h-12 items-center '>
        {canGoBack &&
          <button onClick={goBack}
            className='w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-800'>
            <ChevronLeftIcon className='inline w-6 text-gray-200 hover:text-gray-50' />
          </button>
        }
      </div>
      <div className="text-center">
        <button onClick={submit} disabled={!canSubmit}
          className={`w-40 rounded-lg px-4 py-3
        ${canSubmit ?
              'bg-blue-600 hover:bg-blue-800'
              : 'bg-gray-600 '}`} >
          <div className="text-xl text-gray-200 hover:text-gray-50">
            提出
          </div>
        </button>
      </div>
      <div className='w-12 h-12 items-center '>
        {canGoForward && !showJudge &&
          <button onClick={goForward}
            className='w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-800'>
            <ChevronRightIcon className='inline w-6 text-gray-200 hover:text-gray-50' />
          </button>
        }
      </div>
    </div>
  )
}