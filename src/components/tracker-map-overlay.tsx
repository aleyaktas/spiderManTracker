import { StyleSheet, Text, View } from 'react-native';
import Reanimated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { colors, pixelFont } from '@/constants/tracker-theme';
import type { SightingLocation } from '@/data/sightings';

const SCANLINE_KEYS = Array.from({ length: 24 }, (_, index) => index);

type TrackerMapOverlayProps = {
  liveLocation: SightingLocation;
  liveSequence: number;
  liveUpdateProgress: SharedValue<number>;
  sightingCount: number;
  topInset: number;
};

export function TrackerMapOverlay({
  liveLocation,
  liveSequence,
  liveUpdateProgress,
  sightingCount,
  topInset,
}: TrackerMapOverlayProps) {
  const liveUpdateStyle = useAnimatedStyle(() => ({
    opacity: liveUpdateProgress.get(),
    transform: [
      {
        translateY: interpolate(liveUpdateProgress.get(), [0, 1], [8, 0]),
      },
      {
        scale: interpolate(liveUpdateProgress.get(), [0, 1], [0.95, 1]),
      },
    ],
  }));

  return (
    <>
      <View
        pointerEvents="none"
        style={[styles.mapHeading, { top: topInset + 10 }]}
      >
        <View>
          <Text style={styles.headingTitle}>VIGIL TRACKER</Text>
          <Text style={styles.headingText}>SECTOR Q-7</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>
            LIVE {String(sightingCount).padStart(2, '0')}
          </Text>
        </View>
      </View>

      <Reanimated.View
        pointerEvents="none"
        style={[
          styles.sightingTicket,
          { top: topInset + 94 },
          liveUpdateStyle,
        ]}
      >
        <View style={styles.ticketCounterRow}>
          <Text style={styles.ticketCounter}>
            {String(liveSequence).padStart(4, '0')}
          </Text>
          <View style={styles.ticketBeacon}>
            <View style={styles.ticketBeaconLine} />
            <View style={styles.ticketBeaconCore} />
          </View>
          <Text style={styles.ticketCounter}>
            {String(sightingCount).padStart(4, '0')}
          </Text>
        </View>
        <Text style={styles.ticketTitle}>NEW SIGHTING</Text>
        <Text numberOfLines={1} style={styles.ticketLocation}>
          LOCATION: {liveLocation}
        </Text>
      </Reanimated.View>

      <View pointerEvents="none" style={styles.scanlines}>
        {SCANLINE_KEYS.map((key) => (
          <View key={key} style={styles.scanline} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapHeading: {
    position: 'absolute',
    left: 10,
    right: 10,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: 'rgba(1, 10, 28, 0.88)',
    borderWidth: 2,
    borderColor: colors.cyan,
    borderRadius: 8,
  },
  headingTitle: {
    color: colors.cream,
    fontSize: 9,
    marginBottom: 3,
    ...pixelFont,
  },
  headingText: { color: colors.cyanLight, fontSize: 6, ...pixelFont },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 7,
    paddingVertical: 6,
    backgroundColor: colors.blueDark,
    borderRadius: 4,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.orange,
  },
  liveText: { color: colors.orangeLight, fontSize: 7, ...pixelFont },
  sightingTicket: {
    position: 'absolute',
    alignSelf: 'center',
    minWidth: 218,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 9,
    backgroundColor: colors.orangeLight,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 7,
    elevation: 10,
    zIndex: 30,
  },
  ticketCounterRow: {
    position: 'absolute',
    top: -25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ticketCounter: {
    color: colors.cream,
    fontSize: 10,
    textShadowColor: colors.ink,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    ...pixelFont,
  },
  ticketBeacon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.orange,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 16,
  },
  ticketBeaconLine: {
    position: 'absolute',
    width: 32,
    height: 5,
    backgroundColor: colors.cream,
  },
  ticketBeaconCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.ink,
  },
  ticketTitle: {
    color: colors.ink,
    fontSize: 10,
    marginBottom: 4,
    ...pixelFont,
  },
  ticketLocation: { color: colors.navy, fontSize: 8, ...pixelFont },
  scanlines: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-around',
    opacity: 0.11,
  },
  scanline: { height: 1, backgroundColor: colors.cyanLight },
});
