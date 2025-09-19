import { Chapter, Section } from "@/services/type";

type Outline = { title: string, fileName: string }[];


type jsonType ={
  outline: Outline;
  hasNext: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const part = searchParams.get("part");
  const chapters: Chapter[] = [];
  try {
    // outline読み出し
    const { outline, hasNext }: jsonType = await import(`./${subject}/${part}/outline.json`)
      .then((data) => data.default);
    // chapters生成
    for (let i = 0; i < outline.length; i++) {
      const { title, fileName } = outline[i]
      const { sections }: { sections: Section[] } = await import(`./${subject}/${part}/${fileName}.json`)
        .then((data) => data.default);
      const counts = new Array<number>();
      const sumPickN = sections.reduce((sum, section) => (sum + section.pick), 0);
      chapters.push({ title, sumPickN, counts, sections });
    }
    return Response.json({ chapters, hasNext });
  } catch (e) {
    console.log(e);
    throw e;
  }

}