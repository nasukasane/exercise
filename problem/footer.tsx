
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function CenterButton({ props: { canExplain, isResult, canSubmit, openExplain, resetProblem, submit } }: {
  props: {
    canExplain: boolean,
    isResult: boolean,
    canSubmit: boolean,
    openExplain: () => void,
    resetProblem: () => void,
    submit: () => void,
  }
}) {
  if (isResult) {
    return (
      <button onClick={resetProblem}
        className='w-40 rounded-lg px-4 py-3 bg-green-700 hover:bg-green-900' >
        <div className="text-gray-200 hover:text-gray-50">
          再挑戦
        </div>
      </button>
    )
  } if (canExplain) {
    return (
      <button onClick={openExplain}
        className='w-40 rounded-lg px-4 py-3 bg-pink-600 hover:bg-pink-800' >
        <div className="text-gray-200 hover:text-gray-50">
          解説
        </div>
      </button>
    )
  } else {
    return (
      <button onClick={submit} disabled={!canSubmit}
        className={`w-40 rounded-lg px-4 py-3
          ${canSubmit ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-600 '}`} >
        <div className="text-gray-200 hover:text-gray-50">
          提出
        </div>
      </button>
    )
  }
}

export function Footer({
  props: {
    isResult, showJudge, canSubmit, canGoBack, canGoForward, canExplain,
    goForward, goBack, submit, resetProblem, openExplain } }:
  {
    props: {
      isResult: boolean,
      showJudge: boolean,
      canSubmit: boolean,
      canGoBack: boolean,
      canGoForward: boolean,
      canExplain: boolean,
      goForward: () => void,
      goBack: () => void,
      submit: () => void,
      resetProblem: () => void,
      openExplain: () => void,
    }
  }
) {
  return (
    <div className="flex justify-between items-center text-xl">
      <div className='w-40 '>
        {canGoBack &&
          <button onClick={goBack}
            className='w-40 rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-800 text-gray-200 hover:text-gray-50'>
            前問へ
          </button>
        }
      </div>

      {/* 中央ボタン */}

      <div className="w-40">
        <CenterButton props={{ canExplain, isResult, canSubmit, openExplain, resetProblem, submit }} />
      </div>

      {/* 右ボタン */}
      {isResult ?
        // 結果画面
        <div className='w-40'>
          <button onClick={goForward} disabled
            className='w-40 rounded-lg px-4 py-3 bg-green-700 hover:bg-green-900 text-gray-200 hover:text-gray-50'>
            次章へ
          </button>
        </div>
        :
        // 問題画面
        <div className='w-40'>
          {canGoForward && !showJudge &&
            <button onClick={goForward}
              className='w-40 rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-800 text-gray-200 hover:text-gray-50'>
              次問へ
              {/* <ChevronRightIcon className='inline w-6 text-gray-200 hover:text-gray-50' /> */}
            </button>
          }
        </div>
      }
    </div>
  );
}