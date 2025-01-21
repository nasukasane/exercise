import {View, type Problem} from './view'


async function getJson(subject: string, part: string, section: string): Promise<{problems: Problem[]}>{
  const data = import(`./data/${subject}/${part}/section${section}.json`).then((data) => data.default as {problems: Problem[]})
  return data
}

export default async function Main({ subject, part }: {
   subject: string, part: string } ) {
  const data = await getJson(subject, part, "1");
  return (
    <div>
      <View data={data} />
    </div>
  );
}