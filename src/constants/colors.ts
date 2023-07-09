const black = '#000000';
const white = '#ffffff';

type PaletteColorProp = {
  backgroundColor: string;
  color?: string;
  txt?: string;
};

const shadeColors: PaletteColorProp[] = [
  { backgroundColor: '#B499D3' },
  { backgroundColor: '#9AB9EE' },
  { backgroundColor: '#DFF399' },
  { backgroundColor: '#FEF799' },
  { backgroundColor: '#FCD599' },
  { backgroundColor: '#F399D2' },
];

const highlightColors: PaletteColorProp[] = [
  { backgroundColor: '#470091' },
  { backgroundColor: '#0050D4' },
  { backgroundColor: '#04CC1E' },
  { backgroundColor: '#FCEC00' },
  { backgroundColor: '#F79701' },
  { backgroundColor: '#ED1B23' },
];

const highlight2Colors: PaletteColorProp[] = [
  { backgroundColor: '#470091', color: white, txt: 'a' },
  { backgroundColor: '#0050D4', color: white, txt: 'a' },
  { backgroundColor: '#04CC1E', color: black, txt: 'a' },
  { backgroundColor: '#FCEC00', color: black, txt: 'a' },
  { backgroundColor: '#F79701', color: black, txt: 'a' },
  { backgroundColor: '#ED1B23', color: white, txt: 'a' },
];

const fontColors: PaletteColorProp[] = [
  { backgroundColor: white, color: '#470091', txt: 'a' },
  { backgroundColor: white, color: '#0050D4', txt: 'a' },
  { backgroundColor: white, color: '#04CC1E', txt: 'a' },
  { backgroundColor: white, color: '#FCEC00', txt: 'a' },
  { backgroundColor: white, color: '#F79701', txt: 'a' },
  { backgroundColor: white, color: '#ED1B23', txt: 'a' },
];

export type { PaletteColorProp };

export { shadeColors, highlightColors, highlight2Colors, fontColors };
