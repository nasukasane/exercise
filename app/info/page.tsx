import Link from "next/link";

export default function Page() {
  return (
    <div className='p-4 space-y-2'>
      <p>テスト中のページです。</p>
      <div className="w-auto text-blue-700 hover:text-blue-900 hover:bg-blue-200">
        <Link  href='https://x.com/MigimeKasane'>
          ついったー
        </Link>
      </div>
      <div className=" text-blue-700 hover:text-blue-900 hover:bg-blue-200">
        <Link href='https://soundeffect-lab.info/'>
          音声素材はこちらをお借りしました。
        </Link>
      </div>
        ありがとうございます。
    </div>
  )
}