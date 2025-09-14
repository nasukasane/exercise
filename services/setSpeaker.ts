import { Dispatch, SetStateAction } from "react"

export default function setSpeaker(
  volume: number,
  speakerOn: boolean,
  setVolume: Dispatch<SetStateAction<number>>,
  setSpeakerOn: Dispatch<SetStateAction<boolean>>) {
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
}