'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

// import OtherChild from "./components/OtherChild";
type VolumeVariablesProps = {
  speakerOn: boolean;
  volume: number;
};

type VolumeVariablesSetterProps = {
  setSpeakerOn: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
};

const VolumeVariablesContext = createContext<VolumeVariablesProps | undefined>(undefined);
const VolumeVariablesSetterContext = createContext<VolumeVariablesSetterProps | undefined>(undefined);

export default function VolumeContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [volume, setVolume] = useState(0.5);
  const [speakerOn, setSpeakerOn] = useState(true);

  return (
    <VolumeVariablesContext.Provider value={{ speakerOn, volume }}>
      <VolumeVariablesSetterContext.Provider value={{ setSpeakerOn, setVolume }}>
                {children}
      </VolumeVariablesSetterContext.Provider>
    </VolumeVariablesContext.Provider>
  );
};

export function useVolumeContext() {
  const context = useContext(VolumeVariablesContext);
  if (context === undefined) {
    throw new Error('VolumeContext must be used within a ContextProvider');
  }
  return context;
}

export function useVolumeSetterContext() {
  const context = useContext(VolumeVariablesSetterContext);
  if (context === undefined) {
    throw new Error('VolumeSetterContext must be used within a ContextProvider');
  }
  return context;
}
