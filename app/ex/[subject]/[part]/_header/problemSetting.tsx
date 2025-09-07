import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IconMenuButton } from './iconButton';

export default function ProblemSetting() {
  return (
    <Menu>
      <IconMenuButton>
        <Cog6ToothIcon />
      </IconMenuButton>

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