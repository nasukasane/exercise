'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const CharacterVariablesContext = createContext<string | undefined>(undefined);
const CharacterVariablesSetterContext = createContext<Dispatch<SetStateAction<string>> | undefined>(undefined);

const defaultCharacter = "pattadol";

export default function CharacterContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cheerCharacter, setCheerCharacter] = useState(defaultCharacter);

  return (
    <CharacterVariablesContext.Provider value={cheerCharacter}>
      <CharacterVariablesSetterContext.Provider value={setCheerCharacter}>
        {children}
      </CharacterVariablesSetterContext.Provider>
    </CharacterVariablesContext.Provider>
  );
};

export function useCharacterContext() {
  const context = useContext(CharacterVariablesContext);
  if (context === undefined) {
    throw new Error('CharacterVariablesContext must be used within a ContextProvider');
  }
  return context;
}

export function useCharacterSetterContext() {
  const context = useContext(CharacterVariablesSetterContext);
  if (context === undefined) {
    throw new Error('CharacterVariablesSetterContext must be used within a ContextProvider');
  }
  return context;
}
