import Main from '@/problem/main'

export default async function Page({ params }: {
   params: Promise<{ subject: string, part: string } >} ) {
  const slugs = await params;

  return (
    <div>
      <Main subject={slugs.subject} part={slugs.part} />
    </div>
  );
}