import { Answer, Problem } from "@/services/type"



type Props = {
  props: {
    count: number;
    isResult: boolean;
    isLastProblem: boolean;
    selectedOption: Answer;
    selectedAnswer: Answer;
    selectedAnswers: Answer[];
    moveView: (destinationCount: number, reset?: boolean) => void;
    submitAnswer: (selectedOption: Answer) => void;
  }
}

export default function ProblemFooter({ props }: Props) {
  const { count, isResult, isLastProblem, selectedOption, selectedAnswer, selectedAnswers,
    submitAnswer, moveView } = props;

  const isAnswered = (selectedAnswer !== undefined); //解答済みフラグ
  const CenterButton = () => {
    if (isResult) {
      // リザルト画面時
      if (selectedAnswers.some(a => a === undefined)) {
        // 全問回答済みでない場合
        return (<div></div>)
      }
      else {
        // 全問回答済みの場合
        return (
          <button onClick={() => moveView(0, true)}
            className='w-full rounded-lg text-gray-200 hover:text-gray-50 bg-blue-600 hover:bg-blue-800 px-2 py-2 md:px-4 md:py-3' >
            再挑戦
          </button>
        )
      }
    } else if (isAnswered) {
      // 解答済み
      return (<></>)
    } else {
      // 問題画面時
      const canSubmit = (selectedOption !== undefined);
      return (
        <button onClick={()=>submitAnswer(selectedOption)} disabled={!canSubmit}
          className={`w-full rounded-lg text-gray-200 hover:text-gray-50 px-2 py-2 md:px-4 md:py-3
          ${canSubmit ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-600 '}`} >
          提出
        </button>
      )
    }
  }

  const RightButton = () => {
    if (isResult) {
      // リザルト画面時
      // todo: 次partに移る
      return (
        <button disabled
          className='w-full rounded-lg bg-blue-600 hover:bg-blue-800 text-gray-200 hover:text-gray-50 px-2 py-2 md:px-4 md:py-3'>
          次章へ
        </button>
      );
    } else if (isAnswered) {
      return (
        <button onClick={() => { moveView(count + 1) }}
          className='w-full rounded-lg bg-blue-600 hover:bg-blue-800 text-gray-200 hover:text-gray-50 px-2 py-2 md:px-4 md:py-3'>
          {isLastProblem ? "リザルト" : "次問"}
          {/* <ChevronRightIcon className='inline w-6 text-gray-200 hover:text-gray-50' /> */}
        </button>
      )
    } else {
      // 未回答時
      return (<></>)

    }
  }


  return (
    <div className="mt-2 rounded-lg flex justify-between items-center bg-blue-200 px-2 text-base md:px-4 md:text-xl">
      {/* 左ボタン */}
      <div className='w-20 md:w-40'>
        {count !== 0 &&
          <button onClick={() => { moveView(count - 1) }}
            className='w-full rounded-lg bg-blue-600 hover:bg-blue-800 text-gray-200 hover:text-gray-50 px-2 py-2 md:px-4 md:py-3'>
            前問
          </button>
        }
      </div>

      {/* 中央ボタン */}
      <div className="w-20 md:w-40">
        <CenterButton />
      </div>

      {/* 右ボタン */}
      <div className="w-20 md:w-40">
        <RightButton />
      </div>

    </div>
  );
}