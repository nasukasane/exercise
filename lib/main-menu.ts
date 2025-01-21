export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const mainMenu: { name: string; slug: string; items: Item[] }[] = [
  {
    name: 'ホーム',
    slug: '',
    items: [],
  },
  {name: 'なにこれ',
    slug: 'info',
    items: [],
  },
  {
    name: 'ねここーなー',
    slug: 'cat',
    items: [],
  },
  {
    name: '線形代数',
    slug: 'ex/linear',
    items: [
      {
        name: '演習1',
        slug: 'ex/linear/part1',
        description: '行列とベクトルの足し算と掛け算',
      },
      {
        name: '演習2',
        slug: 'ex/linear/part2',
        description: '基本的な行列の定義',
      },
      {
        name: '演習3',
        slug: 'ex/linear/part3',
        description: '逆行列と行列式',
      },
    ],
  }
];