import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Reanimated, {
  Easing,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { MarkerPopover } from '@/components/marker-popover';
import { colors } from '@/constants/tracker-theme';
import type { Sighting } from '@/data/sightings';

type SightingMarkerProps = {
  sighting: Sighting;
  selected: boolean;
  latest: boolean;
  canvasWidth: number;
  canvasHeight: number;
  liveX?: SharedValue<number>;
  liveY?: SharedValue<number>;
  onPress: () => void;
};

export function SightingMarker({
  sighting,
  selected,
  latest,
  canvasWidth,
  canvasHeight,
  liveX,
  liveY,
  onPress,
}: SightingMarkerProps) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (latest) {
      pulse.set(0);
      pulse.set(
        withRepeat(
          withTiming(1, {
            duration: 1_500,
            easing: Easing.out(Easing.cubic),
          }),
          -1,
          false,
        ),
      );
    } else {
      pulse.set(0);
    }
  }, [latest, pulse]);

  const positionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: (liveX ? liveX.get() : sighting.x) * canvasWidth - 11 },
      { translateY: (liveY ? liveY.get() : sighting.y) * canvasHeight - 11 },
    ],
  }));

  const outerPulseStyle = useAnimatedStyle(() => ({
    opacity: latest
      ? interpolate(pulse.get(), [0, 0.14, 1], [0, 0.82, 0])
      : 0,
    transform: [{ scale: interpolate(pulse.get(), [0, 1], [0.72, 1.85]) }],
  }));

  const innerPulseStyle = useAnimatedStyle(() => ({
    opacity: latest
      ? interpolate(pulse.get(), [0, 0.5, 1], [0.9, 0.42, 0.08])
      : 0,
    transform: [{ scale: interpolate(pulse.get(), [0, 1], [0.82, 1.32]) }],
  }));

  const sweepStyle = useAnimatedStyle(() => ({
    opacity: latest ? 0.9 : 0,
    transform: [{ rotate: `${pulse.get() * 360}deg` }],
  }));

  const markerPulseStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: latest
        ? interpolate(pulse.get(), [0, 0.5, 1], [1, 1.12, 1])
        : 1,
    }],
  }));

  return (
    <Reanimated.View style={[styles.position, positionStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${sighting.area} ${sighting.type} sighting`}
        hitSlop={8}
        onPress={(event) => {
          event.stopPropagation();
          onPress();
        }}
        style={styles.pressTarget}>
        {latest && (
          <>
            <Reanimated.View style={[styles.outerPulseRing, outerPulseStyle]} />
            <Reanimated.View style={[styles.innerPulseRing, innerPulseStyle]} />
            <Reanimated.View style={[styles.radarSweep, sweepStyle]} />
          </>
        )}
        {selected && !latest && <View style={styles.selectionRing} />}
        <Reanimated.View
          style={[
            styles.marker,
            latest && styles.latestMarker,
            markerPulseStyle,
          ]}
        >
          <View
            style={[
              styles.markerCenter,
              latest && styles.latestMarkerCenter,
            ]}
          />
          <View
            style={[
              styles.markerHorizontal,
              latest && styles.latestMarkerHorizontal,
            ]}
          />
          <View
            style={[
              styles.markerVertical,
              latest && styles.latestMarkerVertical,
            ]}
          />
        </Reanimated.View>
      </Pressable>
      {selected && <MarkerPopover sighting={sighting} />}
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 22,
    height: 22,
    zIndex: 10,
  },
  pressTarget: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionRing: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.cyanLight,
  },
  outerPulseRing: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.cyanLight,
    backgroundColor: 'rgba(32, 199, 235, 0.08)',
  },
  innerPulseRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.orangeLight,
  },
  radarSweep: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: colors.cyanLight,
    borderRightColor: colors.cyanLight,
  },
  marker: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  latestMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
  },
  markerCenter: { width: 3, height: 3, backgroundColor: colors.ink },
  latestMarkerCenter: { width: 4, height: 4 },
  markerHorizontal: {
    position: 'absolute',
    width: 9,
    height: 1,
    backgroundColor: colors.ink,
  },
  latestMarkerHorizontal: { width: 14, height: 2 },
  markerVertical: {
    position: 'absolute',
    width: 1,
    height: 9,
    backgroundColor: colors.ink,
  },
  latestMarkerVertical: { width: 2, height: 14 },
});
