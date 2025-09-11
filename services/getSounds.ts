import { useState } from "react";
import useSound from "use-sound";

export default function getSounds(winStreak : number, volume: number){
  const correctSoundNum = [2,2,2,2,5];
  const wrongSoundNum = 4;
  const cappedWinStreak = Math.min(correctSoundNum.length-1, winStreak);
  const correctRandomIndex = Math.floor(Math.random() * (correctSoundNum[cappedWinStreak]));
  const wrongRandomIndex = Math.floor(Math.random() * (wrongSoundNum));

  const correctSoundUrl = `/sound/correct${cappedWinStreak}_${correctRandomIndex}.mp3`;
  const wrongSoundUrl = `/sound/wrong${wrongRandomIndex}.mp3`;

  const [playCorrect] = useSound(correctSoundUrl, { volume, interrupt: true }); //正解音声
  const [playWrong] = useSound(wrongSoundUrl, { volume, interrupt: true }); //不正解音声

  return({playCorrect, playWrong});
}