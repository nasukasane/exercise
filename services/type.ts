export type Problem = {
  optionUseTex?: boolean;
  optionType: "4x1" | "2x2" | "numpad";
  problemText: string;
  problemTex?: string;
  answer: Answer;
  optionStringSize?: "s" | "ss";
  options?: string[];
  explanationText: string;
  explanationTex: string;
};

export type Section = {
  sectionTitle: string,
  pick: number,
  problems: Problem[]
};
export type Chapter = {
  chapterTitle: string,
  sumPickN: number,
  counts: number[],
  sections: Section[]
};
export type ProblemIndex = {
  chapterN: number,
  sectionN: number,
  pickN: number
};

export type PickSet = Set<number>;
export type Answer = undefined | number;
export type ChoiceTable = (number | PickSet)[];
export type ChoiceTables = ChoiceTable[];
