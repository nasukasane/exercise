import { cookies } from 'next/headers';
import { View } from './view'

export type Problem = {
  inputType: "strList" | "figList" | "mathJList" | "numpad" | "string";
  pickType?: "a" | "1";
  problemText: string;
  problemMathJ?: string;
  answer: Answer;
  randomizeOption?: boolean;
  options?: string[];
  explanation: string;
  expFigure: string;
};

export type Outline = {
  name: string;
  pick: number;
};
export type Section = Outline & {
  problems: Problem[];
};
export type PickSet = Set<number>;
export type Answer = number | number[];
export type ChoiceTable = (number | PickSet)[];
export type ChoiceTables = ChoiceTable[];


// 未回答：N 正解：C 不正解：W ヒントを見たけど正解：H
export type CheckTables = string[][]
export type CheckTable = string[]

export const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"]
    ]
  }
};

async function getJson(subject: string, part: string): 
Promise<{ initIndexTables: number[][][], initCheckTables: CheckTables, initChoiceTables: ChoiceTables,
   sections: Section[] | undefined }> {
  const initIndexTables: number[][][]= [];
  const initCheckTables: CheckTables = [];
  const initChoiceTables: ChoiceTables = [];
  try {
    // outline読み出し
    const { outlines }: { outlines: Outline[] } = await import(`./json/${subject}/${part}/outline.json`)
      .then((data) => data.default as { outlines: Outline[] });
      // sections生成
    const sections: Section[] = new Array();
    for (let i = 0; i < outlines.length; i++) {
      const outline = outlines[i]
      try {
        const section: { problems: Problem[] } = await import(`./json/${subject}/${part}/section${(i + 1).toString()}.json`)
          .then((data) => data.default as { problems: Problem[] });
        sections.push({ ...outline, ...section });
        initIndexTables.push(Array(outline.pick).fill([]));
        initCheckTables.push(Array(outline.pick).fill('N'));
        initChoiceTables.push([]);
        section.problems.map(problem =>{
          problem.pickType === '1' ? initChoiceTables[i].push(-1) : initChoiceTables[i].push(new Set([-1])) ;
        });
      } catch (e) {
        console.log(e)
        break;
      }
    }
    return { initIndexTables, initCheckTables, initChoiceTables, sections };
    // 読み込み失敗時処理
  } catch (e) {
    return { initIndexTables, initCheckTables, initChoiceTables, sections: undefined };
  }
}

export default async function Main({ subject, part }: {
  subject: string, part: string
}) {
  const { initIndexTables, initCheckTables, initChoiceTables, sections } = await getJson(subject, part);
  if (sections === undefined) {
    return (
      <div>
        えらー
      </div>
    )
  } else {
    const sectionInit = 0;

    return (
          <View props={{ sections, sectionInit, initIndexTables, initChoiceTables, initCheckTables }} />
    );
  }
}