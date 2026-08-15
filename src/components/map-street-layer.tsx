import Svg, { G, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';

import { colors } from '@/constants/tracker-theme';

type MapStreetLayerProps = {
  terrain: boolean;
  is3D: boolean;
};

export function MapStreetLayer({ terrain, is3D }: MapStreetLayerProps) {
  const blockFill = terrain ? colors.blockTerrain : colors.block;
  const minorOpacity = terrain ? 0.72 : 0.18;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 360 280"
      preserveAspectRatio="none"
    >
      <Rect
        width="360"
        height="280"
        fill={terrain ? colors.navyLight : colors.navy}
      />

      {is3D && (
        <G fill={colors.ink} opacity={0.72}>
          <Polygon points="16,78 65,96 105,70 105,80 65,106 16,88" />
          <Polygon points="109,69 164,78 181,19 181,29 164,88 109,79" />
          <Polygon points="106,157 178,178 211,132 211,142 178,188 106,167" />
          <Polygon points="269,169 333,179 350,128 350,138 333,189 269,179" />
          <Polygon points="181,266 248,277 274,217 274,227 248,287 181,276" />
        </G>
      )}

      <G transform={is3D ? 'translate(0 -4)' : undefined}>
        <Polygon points="18,24 84,26 105,70 65,96 16,78" fill={blockFill} opacity={0.64} />
        <Polygon points="118,12 181,19 164,78 109,69" fill={blockFill} opacity={0.7} />
        <Polygon points="198,20 265,23 286,73 221,90 184,61" fill={blockFill} opacity={0.66} />
        <Polygon points="292,14 353,31 349,95 301,84 276,52" fill={blockFill} opacity={0.62} />
        <Polygon points="10,112 72,101 108,143 81,188 20,176" fill={blockFill} opacity={0.72} />
        <Polygon points="123,96 188,88 211,132 178,178 106,157" fill={blockFill} opacity={0.64} />
        <Polygon points="232,106 302,89 350,128 333,179 269,169" fill={blockFill} opacity={0.7} />
        <Polygon points="26,205 94,180 145,218 125,276 50,268" fill={blockFill} opacity={0.66} />
        <Polygon points="164,190 229,167 274,217 248,277 181,266" fill={blockFill} opacity={0.7} />
        <Polygon points="292,191 354,179 360,270 289,271 267,226" fill={blockFill} opacity={0.65} />
      </G>

      <Path d="M-12 78 L372 188" stroke={colors.blue} strokeWidth="8" strokeLinecap="square" />
      <Path d="M-18 180 L369 232" stroke={colors.blueDark} strokeWidth="7" strokeLinecap="square" />
      <Path d="M24 292 L165 -16" stroke={colors.blue} strokeWidth="8" strokeLinecap="square" />
      <Path d="M110 292 L260 -16" stroke={colors.blueDark} strokeWidth="7" strokeLinecap="square" />
      <Path d="M212 296 L352 6" stroke={colors.blue} strokeWidth="8" strokeLinecap="square" />
      <Path d="M-12 126 L184 -15" stroke={colors.blueDark} strokeWidth="7" strokeLinecap="square" />
      <Path d="M172 -8 L365 102" stroke={colors.blue} strokeWidth="7" strokeLinecap="square" />
      <Path d="M-15 238 L370 257" stroke={colors.blueDark} strokeWidth="6" strokeLinecap="square" />

      <Path d="M-8 48 L350 151" stroke={colors.cyan} strokeWidth="2" opacity={0.62} />
      <Path d="M5 159 L361 209" stroke={colors.cyan} strokeWidth="2" opacity={0.55} />
      <Path d="M66 286 L205 -12" stroke={colors.cyan} strokeWidth="2" opacity={0.58} />
      <Path d="M173 292 L318 -5" stroke={colors.cyan} strokeWidth="2" opacity={0.55} />

      <Path
        d="M12 34 L342 126"
        stroke={colors.cyanLight}
        strokeWidth="1.5"
        opacity={minorOpacity}
      />
      <Path
        d="M8 214 L354 246"
        stroke={colors.cyanLight}
        strokeWidth="1.5"
        opacity={minorOpacity}
      />
      <Path
        d="M41 278 L147 8"
        stroke={colors.cyanLight}
        strokeWidth="1.5"
        opacity={minorOpacity}
      />
      <Path
        d="M146 286 L286 4"
        stroke={colors.cyanLight}
        strokeWidth="1.5"
        opacity={minorOpacity}
      />

      <SvgText
        x="214"
        y="205"
        fill={colors.cyanLight}
        opacity={0.92}
        fontFamily="monospace"
        fontSize="31"
        fontWeight="400"
      >
        QUEENS
      </SvgText>
    </Svg>
  );
}
