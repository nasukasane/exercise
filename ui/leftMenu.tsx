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
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'py-2 block rounded-md text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  );
}

export default function LeftMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div
      className={clsx('overflow-y-auto ', {
        'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
        hidden: !isOpen,
      })}
    >
      <nav className="px-2 pb-24 pt-5">
        {mainMenu.map((section) => {
          return (
            <div key={section.name}>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
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
    </div>

  )
}