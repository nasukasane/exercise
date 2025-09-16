import useSound from "use-sound";
import { CharacterProperty } from "./type";

export default function getSounds(
  winStreak : number, 
  volume: number, 
  cheerCharacter:string,
  characterProperty: CharacterProperty,
){
  const correctSoundN = characterProperty.correctSoundN;
  const wrongSoundN = characterProperty.wrongSoundN;
  
  const cappedWinStreak = Math.min(correctSoundN.length-1, winStreak);
  const correctRandomIndex = Math.floor(Math.random() * (correctSoundN[cappedWinStreak]));
  const wrongRandomIndex = Math.floor(Math.random() * (wrongSoundN));

  const correctSoundUrl = `/sound/${cheerCharacter}/correct${cappedWinStreak}_${correctRandomIndex}.mp3`;
  const wrongSoundUrl = `/sound/${cheerCharacter}/wrong${wrongRandomIndex}.mp3`;

  const [playCorrect] = useSound(correctSoundUrl, { volume, interrupt: true }); //正解音声
  const [playWrong] = useSound(wrongSoundUrl, { volume, interrupt: true }); //不正解音声

  return({playCorrect, playWrong});
}