const black = '#000000';
const white = '#ffffff';

type PaletteColorProp = { bg: string; fg?: string; txt?: string };

const shadeColors: PaletteColorProp[] = [
  { bg: '#B499D3' },
  { bg: '#9AB9EE' },
  { bg: '#DFF399' },
  { bg: '#FEF799' },
  { bg: '#FCD599' },
  { bg: '#F399D2' },
];

const highlightColors: PaletteColorProp[] = [
  { bg: '#470091' },
  { bg: '#0050D4' },
  { bg: '#04CC1E' },
  { bg: '#FCEC00' },
  { bg: '#F79701' },
  { bg: '#ED1B23' },
];

const highlight2Colors: PaletteColorProp[] = [
  { bg: '#470091', fg: white, txt: 'a' },
  { bg: '#0050D4', fg: white, txt: 'a' },
  { bg: '#04CC1E', fg: black, txt: 'a' },
  { bg: '#FCEC00', fg: black, txt: 'a' },
  { bg: '#F79701', fg: black, txt: 'a' },
  { bg: '#ED1B23', fg: white, txt: 'a' },
];

const fontColors: PaletteColorProp[] = [
  { bg: white, fg: '#470091', txt: 'a' },
  { bg: white, fg: '#0050D4', txt: 'a' },
  { bg: white, fg: '#04CC1E', txt: 'a' },
  { bg: white, fg: '#FCEC00', txt: 'a' },
  { bg: white, fg: '#F79701', txt: 'a' },
  { bg: white, fg: '#ED1B23', txt: 'a' },
];

export type { PaletteColorProp };

export { shadeColors, highlightColors, highlight2Colors, fontColors };
