import '@/styles/globals.css';
import HeaderMenu from '@/ui/headerMenu';
import { Metadata } from 'next';
import VolumeContext from './volumeContext';
import MenuContext from './menuContext';

export const metadata: Metadata = {
  title: {
    default: 'ねこかわいい',
    template: '%s | ねこぺーじ',
  },
  // metadataBase: new URL('https://app-router.vercel.app'),
  description: 'ねこがかわいいページ',
  // openGraph: {
  //   title: 'Next.js App Router Playground',
  //   description: 'いぬもかわいい',
  //   images: [`/api/og?title=Next.js App Router`],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ja">
      <body className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
        <div className="hidden bg-slate-400 md:block md:w-[250px] p-2 md:flex-none">
          めにゅー
        </div>
        <div className='mx-auto max-w-4xl size-full'>
          <VolumeContext>
            <MenuContext>
              <div className="size-full grid grid-cols-1 grid-rows-[40px_1fr] md:grid-rows-[50px_1fr]">
                <HeaderMenu />
                {children}
              </div>
            </MenuContext>
          </VolumeContext>
        </div>
      </body>

    </html>
  );
}