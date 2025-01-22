import { View } from './view'

export type Problem = {
  type: string;
  problemText: string;
  answer: number;
  randomizeOption: boolean;
  answerFigure: boolean;
  options: string[];
};

export type Outline = {
  name: string;
  pick: number;
}

export type Section = Outline & {
  problems: Problem[];
}

// 未回答：N 正解：C 不正解：W ヒントを見たけど正解：H
export type CheckTables = string[][]
export type CheckTable  = string[]

async function getJson(subject: string, part: string): Promise<{initCheckTables:CheckTables, sections: Section[] | undefined}> {
  const initCheckTables: CheckTables = [];
  try {
    // outline読み出し
    const {outlines}: {outlines :Outline[]} = await import(`./json/${subject}/${part}/outline.json`)
      .then((data) => data.default as {outlines: Outline[]});
    // sections生成
    const sections : Section[] = new Array();
    for(let i=0; i < outlines.length; i++){
      const outline = outlines[i]
      try{
        const section: {problems:Problem[]} = await import(`./json/${subject}/${part}/section${(i + 1).toString()}.json`)
            .then((data) => data.default as {problems:Problem[]} );
        sections.push({...outline, ...section});
        initCheckTables.push(Array(outline.pick).fill('N'));
      }catch(e){
        break;
      }
    }
    return {initCheckTables, sections};
  // 読み込み失敗時処理
  } catch (e) {
    return {initCheckTables, sections:undefined};
  }
}

export default async function Main({ subject, part }: {
  subject: string, part: string
}) {
  const {initCheckTables, sections} = await getJson(subject, part);
  if(sections===undefined){
    return(
      <div>
        えらー
      </div>
    )
  }else{
    const sectionInit = 0;

    return (
      <div>
        <View sections={sections} sectionInit={sectionInit} initCheckTables={initCheckTables} />
      </div>
    );
  }
}