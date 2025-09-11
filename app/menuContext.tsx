'use client';
import { Answer, Chapter, ProblemIndex } from "@/services/type";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type MenuVariables = {
  isResult: boolean;
  count: number;
  selectedAnswers: Answer[];
  chapters: Chapter[];
  problemIndexes: ProblemIndex[];
  problemLength: number;
  moveView: (destinationCount: number, reset?: boolean) => void;
  jumpChapter: (chapter: Chapter) => void;
}



const MenuVariablesSetterContext = createContext<Dispatch<SetStateAction<MenuVariables | undefined>> | undefined>(undefined);
export const MenuVariablesContext = createContext<MenuVariables | undefined>(undefined);

export default function MenuContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuVariablesContext, setMenuVariablesContext] = useState<MenuVariables | undefined>(undefined);
  return (
            <MenuVariablesContext.Provider value={menuVariablesContext}>
              <MenuVariablesSetterContext.Provider value={setMenuVariablesContext}>
                {children}
              </MenuVariablesSetterContext.Provider>
            </MenuVariablesContext.Provider>
  );
};

export function useMenuVariablesSetterContext() {
  const context = useContext(MenuVariablesSetterContext);
  if (context === undefined) {
    throw new Error('MenuVariablesSetterContext must be used within a ContextProvider');
  }
  return context;
}