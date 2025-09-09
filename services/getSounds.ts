import { useState } from "react";
import useSound from "use-sound";

export default function getSounds(winStreak : number){
  const [volume, setVolume] = useState(0.5); // 0.0 から 1.0 の間で設定

  const winMaxIndex = [2,2,2,2,5];
  const loseMaxIndex = 4;
  const cappedWinStreak = Math.min(winMaxIndex.length-1, winStreak);
  const correctRandomIndex = Math.floor(Math.random() * (winMaxIndex[cappedWinStreak]));
  const wrongRandomIndex = Math.floor(Math.random() * (loseMaxIndex));

  const correctSoundUrl = `/sound/correct${cappedWinStreak}_${correctRandomIndex}.mp3`;
  const wrongSoundUrl = `/sound/wrong${wrongRandomIndex}.mp3`;

  const [playCorrect] = useSound(correctSoundUrl, { volume }); //正解音声
  const [playWrong] = useSound(wrongSoundUrl, { volume }); //不正解音声
  console.log('cat', winStreak, volume)

  return({volume, setVolume, playCorrect, playWrong});
}