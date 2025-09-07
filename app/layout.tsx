import '@/styles/globals.css';
import { GlobalNav } from '@/ui/global-nav';
import { Metadata } from 'next';

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
    // <html lang="ja" className="[color-scheme:dark]">
    <html lang="ja">
      {/* <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36"> */}
      {/* <body className="overflow-y-scroll bg-gray-100 pb-36"> */}
      <body className="bg-gray-100">
        <GlobalNav />
        <div className="mx-auto max-w-6xl space-y-2 px-2 md:px-2 md:pl-72">
          {children}
        </div>
      </body>
    </html>
  );
}