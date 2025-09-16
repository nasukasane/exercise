import { getCharacterProperty } from "./characterList";
import { CharacterProperty } from "./type";

export default function getJudgeImage(
  winStreak: number,
  cheerCharacter: string,
  characterProperty: CharacterProperty
){
  const correctImageN = characterProperty.correctImageN;
  const wrongImageN = characterProperty.wrongImageN;
  
  let correctCharacterUrl : undefined | string = undefined;
  let wrongCharacterUrl : undefined | string = undefined;
  
  if (correctImageN.length !== 0){
    const cappedWinStreak = Math.min(correctImageN.length-1, winStreak);
    const correctRandomIndex = Math.floor(Math.random() * (correctImageN[cappedWinStreak]));
    correctCharacterUrl = `/image/${cheerCharacter}/correct${cappedWinStreak}_${correctRandomIndex}.png`;
  }
  
  if (wrongImageN !== 0){
    const wrongRandomIndex = Math.floor(Math.random() * (wrongImageN));
    wrongCharacterUrl = `/image/${cheerCharacter}/wrong${wrongRandomIndex}.png`;
  }
   
  return {correctCharacterUrl, wrongCharacterUrl};
}