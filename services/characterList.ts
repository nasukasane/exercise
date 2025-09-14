export const characterList = ["pattadol", "mithrun", "cat", "moji"];

export const defaultCharacter = "pattadol";

export const characterProperty:{
  [character: string]:{
    correctSoundN : number[],
    wrongSoundN: number
  }
} = {
  "pattadol":{
      correctSoundN : [2,2,2,2,5],
      wrongSoundN : 4,
  },
  "mithrun":{
    correctSoundN : [1,1,2,3],
    wrongSoundN : 1,
  },
  "cat":{
    correctSoundN : [2],
    wrongSoundN : 1,
  },
  "moji":{
    correctSoundN : [1],
    wrongSoundN : 1,
  }

}
