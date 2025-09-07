export type Problem = {
  optionUseMathJ?: boolean;
  optionType: "4x1" | "2x2" | "numpad";
  problemText: string;
  problemMathJ?: string;
  answer: Answer;
  options?: string[];
  explanationText: string;
  explanationMathJ: string;
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
