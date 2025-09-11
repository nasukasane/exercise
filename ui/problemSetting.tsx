import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function ProblemSetting() {
  return (
    <Menu>
      <MenuButton className="w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300">
        <Cog6ToothIcon />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="rounded-xl border text-sm max-w-[300px] border-gray-600 bg-white p-1
           transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
           focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0
           md:max-w-[500px] md:text-xl"
      >
        <MenuItem><div>いぬ</div></ MenuItem>
        <MenuItem><div>ねこ</div></ MenuItem>
        <MenuItem><div>とり</div></ MenuItem>
      </MenuItems>
    </Menu>
  )
}