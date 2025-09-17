import { handleFailed, handleSucceed, path } from "..";
import { Chapter, ProblemIndex } from "../type";

type Props = {
  subject: string;
  part: string;
};

function getRandomArray(n: number, l?: number) {
  const result = [...Array(n).keys()];
  const length = l ?? n;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, length);
}

function getJson({ subject, part }: Props): Promise<{ 
    chapters: Chapter[],
    hasNext: boolean 
  }> {
  const searchParams = new URLSearchParams({ subject, part });
  return fetch(path(`/api/getProblems?${searchParams}`))
    .then(handleSucceed)
    .catch(handleFailed);
}


export async function getProblems({ subject, part }: Props):
  Promise<{ 
    chapters: Chapter[], 
    problemIndexes: ProblemIndex[], 
    hasNext: boolean 
  }> {
  const problemIndexes: ProblemIndex[] = [];
  const { chapters, hasNext } = await getJson({ subject, part });
  let count = 0;

  chapters.map((chapter, chapterN) => {
    chapter.sections.map((section, sectionN) => {
      getRandomArray(section.problems.length, section.pick).map(i => {
        problemIndexes.push({ chapterN, sectionN, pickN: i });
        chapter.counts.push(count);
        count++;
      })
    });
  });


  return { chapters, problemIndexes, hasNext };
}
