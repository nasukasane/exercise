'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { mainMenu, type Item } from '@/lib/main-menu';

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close?: () => void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'pl-2 py-2 block rounded-md text-sm font-medium hover:bg-slate-400 md:text-xl',
        {
          'text-gray-700 hover:text-gray-900': !isActive,
          'text-gray-500 hover:text-gray-700': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  );
}

export default function LeftMenu({close}:{close?:()=>void}) {
  return(
      <nav className="px-1 md:px-2 pt-2">
        {mainMenu.map((section) => {
          return (
            <div key={section.name}>
              <div className="mb-2 px-1 md:px-3 tracking-wider">
                {/* <div>{section.name}</div> */}
                <GlobalNavItem key={section.slug} item={section} close={close} />
              </div>

              <div className="px-6">
                {section.items.map((item) => (
                  <GlobalNavItem key={item.slug} item={item} close={close} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

  )
}