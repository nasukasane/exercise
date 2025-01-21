export default async function Page({ params }: { params: { subject: string } }) {
  
  return (
    <div>
      <p>{params.subject}</p>
    </div>
  );
}