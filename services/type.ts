export type OutType = 'string' | 'mathb' | 'mathi' | 'image';
export type OutSize = 'ss' | 's' | 'b';

export type TextOut ={
  type: OutType;
  size: OutSize;
  text: string;
};

export type Problem = {
  toSolve: TextOut[];
  options?:  TextOut[];
  explanation: TextOut[];
  arrangement: "4x1" | "2x2" | "numpad";
  answer: Answer;
};

export type Section = {
  title: string,
  pick: number,
  problems: Problem[]
};
export type Chapter = {
  title: string,
  sumPickN: number,
  counts: number[],
  sections: Section[]
};
export type ProblemIndex = {
  chapterN: number,
  sectionN: number,
  pickN: number
};

export type WinPerCharacter = {
  [character: string]: number,
}

export type CharacterProperty = {
  characterName: string,
  correctSoundN: number[],
  wrongSoundN: number,
  correctImageN: number[],
  wrongImageN: number
  hasExcellentResultImage?: boolean,
  hasNormalResultImage?: boolean,
  hasNotDoneImage?: boolean,
  hasExplanationImage?: boolean
}

export type CharacterProperties = {
  [character: string]: CharacterProperty;
}


export type PickSet = Set<number>;
export type Answer = undefined | number;
export type ChoiceTable = (number | PickSet)[];
export type ChoiceTables = ChoiceTable[];
