const black = '#000000';
const white = '#ffffff';

type Shades = string[];
type Highlights = [string, string][];

const shades = [
  '#B499D3',
  '#9AB9EE',
  '#DFF399',
  '#FEF799',
  '#FCD599',
  '#F399D2',
];

const highlights = [
  ['#470091', white],
  ['#0050D4', white],
  ['#04CC1E', black],
  ['#FCEC00', black],
  ['#F79701', black],
  ['#ED1B23', white],
];

export type { Highlights, Shades };

export { shades, highlights };
