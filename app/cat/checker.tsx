'use client';

import { Chapter, ProblemIndex } from "@/services/type";
import { ReactNode, useState } from "react";

function PmButton({children, onClick}:
  {
    children: ReactNode,
    onClick: ()=>void
  }){
  return(
    <button 
      onClick={onClick}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {children}
    </button>
  )
}

export default function Checker({ chapters,  problemIndexes}:
   { 
    chapters: Chapter[],
    problemIndexes: ProblemIndex[]
   }) {
  const [chapterN, setChapterN] = useState(0);
  const [sectionN, setSectionN] = useState(0);
  const [pickN, setPickN] = useState(0);
  const [linearN, setLinearN] = useState(0);

  const chapter = chapters[chapterN];
  const section = chapter.sections[sectionN];
  const problem = section.problems[pickN];
  const chapterTitle = chapter.chapterTitle
  const sectionTitle = section.sectionTitle

  const chapterUp = () => {
    if (chapterN < chapters.length - 1) {
      setChapterN(chapterN + 1);
    }
  };

  const chapterDown = () => {
    if (chapterN > 0) {
      setChapterN(chapterN - 1);
    }
  };

  const sectionUp = () => {
    if (sectionN < chapter.sections.length - 1) {
      setChapterN(sectionN + 1);
    }
  };

  const sectionDown = () => {
    if (sectionN > 0) {
      setChapterN(sectionN - 1);
    }
  };

  const linearUp = ()=>{
    if (linearN < problemIndexes.length - 1) {
      const n = linearN + 1
      setLinearN(n);
      setChapterN(problemIndexes[n].chapterN);
      setSectionN(problemIndexes[n].sectionN);
      setPickN(problemIndexes[n].pickN);
    }
  }
  const linearDown = ()=>{
    if (linearN > 0) {
      const n = linearN - 1
      setLinearN(n);
      setChapterN(problemIndexes[n].chapterN);
      setSectionN(problemIndexes[n].sectionN);
      setPickN(problemIndexes[n].pickN);
    }
  }

  return (
    <div>
      <p>linearN : {linearN}</p>
      <p>chapter : {chapterN} {chapterTitle}</p>
      <p>section : {sectionN} {sectionTitle}</p>
      <p>pickN : {pickN} {problem.toSolve[0].text}</p>

      <div className="my-2 space-x-2">
        linear 
        <PmButton onClick={linearUp}>+</PmButton>
        <PmButton onClick={linearDown}>-</PmButton>
      </div>
      <div className="my-2">
        chapter
        <PmButton onClick={chapterUp}>+</PmButton>
        <PmButton onClick={chapterDown}>-</PmButton>
      </div>
      <div className="my-2">
        section
        <PmButton onClick={sectionUp}>+</PmButton>
        <PmButton onClick={sectionDown}>-</PmButton>
      </div>
    </div>

  )
}