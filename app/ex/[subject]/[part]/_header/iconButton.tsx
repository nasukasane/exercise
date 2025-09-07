import { MenuButton } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
}

export function IconButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick}
      className="w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300">
      {children}
    </button>
  )
}


export function IconMenuButton({ children }: { children: React.ReactNode; }) {
  return (
    <MenuButton className="w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300">
      {children}
    </MenuButton>
  )
}