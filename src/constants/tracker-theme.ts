import { Platform } from 'react-native';

export const colors = {
  black: '#020304',
  ink: '#061326',
  navy: '#061d47',
  navyLight: '#0b2d62',
  block: '#0b3974',
  blockTerrain: '#125092',
  blueDark: '#07519b',
  blue: '#078fce',
  cyan: '#20c7eb',
  cyanLight: '#82def3',
  teal: '#40bfae',
  orange: '#f0644d',
  orangeLight: '#f69a62',
  cream: '#d9eff0',
  muted: '#6fa8bc',
};

export const pixelFont = {
  fontFamily: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
  fontWeight: '700' as const,
  letterSpacing: 0.5,
};
