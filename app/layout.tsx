import '@/styles/globals.css';
import { AddressBar } from '@/ui/address-bar';
import Byline from '@/ui/byline';
import { GlobalNav } from '@/ui/global-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'ねこかわいい',
    template: '%s | ねこぺーじ',
  },
  metadataBase: new URL('https://app-router.vercel.app'),
  description: 'ねこがかわいいページ',
  openGraph: {
    title: 'Next.js App Router Playground',
    description: 'いぬもかわいい',
    images: [`/api/og?title=Next.js App Router`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="ja" className="[color-scheme:dark]">
    <html lang="ja">
    <body className="overflow-y-scroll bg-gray-1100 bg-[url('/grid.svg')] pb-36">
        <GlobalNav />

        <div className="lg:pl-72">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
            </div>
            <Byline />
          </div>
        </div>
      </body>
    </html>
  );
}