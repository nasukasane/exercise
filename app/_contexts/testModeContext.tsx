'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const TestModeVariablesContext = createContext<boolean | undefined>(undefined);
const TestModeVariablesSetterContext = createContext<Dispatch<SetStateAction<boolean>> | undefined>(undefined);

export default function TestModeContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [testMode, setTestMode] = useState(false);

  return (
    <TestModeVariablesContext.Provider value={testMode}>
      <TestModeVariablesSetterContext.Provider value={setTestMode}>
        {children}
      </TestModeVariablesSetterContext.Provider>
    </TestModeVariablesContext.Provider>
  );
};

export function useTestModeContext() {
  const context = useContext(TestModeVariablesContext);
  if (context === undefined) {
    throw new Error('TestModeVariablesContext must be used within a ContextProvider');
  }
  return context;
}

export function useTestModeSetterContext() {
  const context = useContext(TestModeVariablesSetterContext);
  if (context === undefined) {
    throw new Error('TestModeVariablesSetterContext must be used within a ContextProvider');
  }
  return context;
}
