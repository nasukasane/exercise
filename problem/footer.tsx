
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { CheckTables } from './main';
import { Dispatch, SetStateAction } from 'react';

const getPrevInfo = (problemCount:number, sectionCount:number, checkTables:CheckTables)=>{
  if(problemCount === 0){
    const prevSection = sectionCount - 1;
    return {
      canGoBack: sectionCount !== 0,
      prevSection,
      prevProblem: sectionCount===0 ? -1 : checkTables[prevSection].length - 1,
    };
  }else{
    return {
      canGoBack: true, 
      prevSection: sectionCount,
      prevProblem: problemCount-1,
    };
  }
}

export function Footer({ 
  props: { submit, canSubmit, problemCount, sectionCount, checkTables, setSectionCount, setProblemCount } }:
  {
    props: {
      submit: () => void,
      canSubmit: boolean,
      problemCount: number, 
      sectionCount: number,
      checkTables: CheckTables,
      setSectionCount:Dispatch<SetStateAction<number>>,
      setProblemCount:Dispatch<SetStateAction<number>>,
    }
  }
) {
  const {canGoBack, prevSection, prevProblem} = getPrevInfo(problemCount, sectionCount, checkTables);
  const goBack = () => {
    setSectionCount(prevSection);
    setProblemCount(prevProblem);
  }

  return (
    <div className="grid grid-cols-3 items-center">
      {canGoBack &&
        <button onClick={goBack}
          className='w-[120px] items-center mt-5 rounded-lg px-4 py-3 bg-blue-900 hover:bg-blue-600'>
           <ArrowLeftCircleIcon className='inline mr-2 w-6 text-gray-200 hover:text-gray-50'/>
          <div className="inline font-medium text-gray-200 hover:text-gray-50">
            前問へ
          </div>
        </button>
      }
      <div className="col-start-2 text-center">
        <button onClick={submit} disabled={!canSubmit}
          className={`w-40 mt-5 rounded-lg px-4 py-3 
        ${canSubmit ?
              'bg-blue-900 hover:bg-blue-600'
              : 'bg-sky-600 '}`} >
          <div className="font-medium text-gray-200 hover:text-gray-50">
            {canSubmit ? 'ぽち' : '選べ'}
          </div>
        </button>
      </div>
    </div>
  )
}