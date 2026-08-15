import { StyleSheet, Text, View } from 'react-native';

import { colors, pixelFont } from '@/constants/tracker-theme';
import type { Sighting } from '@/data/sightings';

type MarkerPopoverProps = {
  sighting: Sighting;
};

export function MarkerPopover({ sighting }: MarkerPopoverProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.popover,
        sighting.x > 0.62 ? styles.openLeft : styles.openRight,
        sighting.y < 0.25 ? styles.openBelow : styles.openAbove,
      ]}
    >
      <Text style={styles.area}>{sighting.area}</Text>
      <Text style={styles.line}>{sighting.timestamp}</Text>
      <Text style={styles.type}>{sighting.type.toUpperCase()}</Text>
      <Text numberOfLines={1} style={styles.line}>
        {sighting.status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
    width: 136,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: colors.navy,
    borderWidth: 2,
    borderColor: colors.cyanLight,
    zIndex: 20,
  },
  openRight: { left: 20 },
  openLeft: { right: 20 },
  openAbove: { bottom: 18 },
  openBelow: { top: 19 },
  area: { color: colors.orangeLight, fontSize: 9, marginBottom: 3, ...pixelFont },
  type: { color: colors.cyanLight, fontSize: 7, lineHeight: 11, ...pixelFont },
  line: { color: colors.cream, fontSize: 7, lineHeight: 11, ...pixelFont },
});
