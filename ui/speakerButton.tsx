
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { useVolumeContext, useVolumeSetterContext } from '@/app/_contexts/volumeContext';

export default function SpeakerButton() {
  const { volume, speakerOn } = useVolumeContext();
  const { setVolume, setSpeakerOn } = useVolumeSetterContext();
  return (
    <button
      onClick={() => {
        if (speakerOn) {
          if (volume === 0) {
            setVolume(0.2)
          } else {
            setSpeakerOn(false)
          }
        } else {
          setSpeakerOn(true)
          if (volume === 0) {
            setVolume(0.2)
          }
        }
      }}
      className='w-full rounded-lg text-slate-600 p-2 hover:text-slate-800 hover:bg-slate-300'>
      {speakerOn && volume > 0 ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
    </button>
  )
}

export function SpeakerWithSlider() {
  const { volume, speakerOn } = useVolumeContext();
  const { setVolume, setSpeakerOn } = useVolumeSetterContext();
  return (
    <div className='flex content-center'>
      <div className='w-[40px]'>
        <SpeakerButton />
      </div>
      <div className='flex-1 flex content-center'>
        <input className="" type="range" min="0" max="1" step="0.01"
          value={speakerOn ? volume : "0"} onChange={e => {
            const sliderValue = Number(e.target.value);
            if (sliderValue > 0) {
              setSpeakerOn(true)
            }
            setVolume(sliderValue);
          }}
        />
      </div>
    </div>
  )
}