export default async function Page({ params }: {
   params: Promise<{ subject: string} >} ) {
  const {subject} = await params;
  return (
    <div>
      <p>ここは{subject}</p>
    </div>
  );
}