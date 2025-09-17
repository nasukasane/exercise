import { CharacterProperties } from "./type";

const characterList = ["pattadol", "mithrun", "cat", "moji"];

const characterProperty:CharacterProperties = {
  "pattadol":{
      characterName: "pattadol",
      correctSoundN : [2,2,2,2,5],
      wrongSoundN : 4,
      correctImageN : [1],
      wrongImageN: 1,
  },
  "mithrun":{
    characterName: "mithrun",
    correctSoundN : [1,1,2,3],
    wrongSoundN : 1,
    correctImageN : [1],
    wrongImageN: 1,
  },
  "cat":{
    characterName: "cat",
    correctSoundN : [2],
    wrongSoundN : 1,
    correctImageN : [1],
    wrongImageN: 1,
  },
  "moji":{
    characterName: "moji",
    correctSoundN : [1],
    wrongSoundN : 1,
    correctImageN : [],
    wrongImageN: 0,
  }

}

export function getCharacterList(): string[]{
  // icon画像があれば登録
  // 画像や音声が無ければデフォルトを出力するのでなくてもOK
  return characterList;
}

export function getCharacterProperty(): CharacterProperties{
  return characterProperty;
}