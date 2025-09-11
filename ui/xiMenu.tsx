import { Bars3Icon } from '@heroicons/react/24/solid';
import { mainMenu} from '@/lib/main-menu';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';


export default function XiMenu() {
  return (
    <div className='md:hidden'>
      <Menu>
        <MenuButton className="w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300">
          <Bars3Icon className="" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="rounded-xl border max-w-[500px] border-gray-600 bg-white p-1
           transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
           focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {mainMenu.map((section) => {
            return (
              <MenuItem key={section.name}>
                <div className="mb-2 px-2">
                  <Link
                    href={`/${section.slug}`}
                    className="px-2 py-2 block rounded-md font-medium text-gray-600 hover:bg-slate-200 hover:text-gray-800"
                  >
                    {section.name}
                  </Link>
                </div>
              </ MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  )
}