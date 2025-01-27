import { Dispatch, useState, type SetStateAction } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

export default function Volume({volume, setVolume}:{
  volume: number,
  setVolume: Dispatch<SetStateAction<number>>,
}){
  const [volumeRange, setVolumeRange] = useState(1);

  const iconXClick = ()=>{
    setVolume(volumeRange);
  };
  const iconClick= ()=>{
    setVolumeRange(volume);
    setVolume(0);
  };

  const sliderChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = Number(e.target.value);
    setVolume(value);
  };
  return(
    <div className="flex items-center">
    {volume === 0 ? 
    <SpeakerXMarkIcon onClick={iconXClick} className="inline w-6 text-gray-400" />
    :<SpeakerWaveIcon onClick={iconClick} className="inline w-6 text-gray-400"/>}
    <input type="range"
        value={volume}
        onChange={sliderChange}
        min={0}
        max={1}
        step={0.05}
        aria-labelledby="continuous-slider"
        className="inline mx-2 w-20"
      />
  </div>
  );
}

