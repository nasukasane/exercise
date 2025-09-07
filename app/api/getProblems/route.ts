import { Chapter, Section } from "@/services/type";

type Outline = { chapterTitle: string, fileName: string }[];


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const part = searchParams.get("part");
  const chapters: Chapter[] = [];
  try {
    // outline読み出し
    const { outline }: { outline: Outline } = await import(`./${subject}/${part}/outline.json`)
      .then((data) => data.default);
    // chapters生成
    for (let i = 0; i < outline.length; i++) {
      const { chapterTitle, fileName } = outline[i]
      const { sections }: { sections: Section[] } = await import(`./${subject}/${part}/${fileName}.json`)
        .then((data) => data.default);
      const counts = new Array<number>();
      const sumPickN = sections.reduce((sum, section) => (sum + section.pick), 0);
      chapters.push({ chapterTitle, sumPickN, counts, sections });
    }
    return Response.json({ chapters });
  } catch (e) {
    console.log(e);
    throw e;
  }

}