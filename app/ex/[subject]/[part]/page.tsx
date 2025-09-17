import { getProblems } from '@/services/getProblems';
import ProblemView from './problemView';

export default async function Page({ params }: {
   params: Promise<{ subject: string, part: string } >} ) {
  const {subject, part} = await params;
  const {chapters, problemIndexes, hasNext} = await getProblems({subject, part});

  return (
    <ProblemView props={{chapters, problemIndexes, hasNext}}/>
  );
}