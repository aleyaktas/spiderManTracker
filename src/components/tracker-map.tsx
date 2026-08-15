import { useCallback, useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { MapStreetLayer } from '@/components/map-street-layer';
import { SightingMarker } from '@/components/sighting-marker';
import { TrackerMapOverlay } from '@/components/tracker-map-overlay';
import { colors } from '@/constants/tracker-theme';
import type { Sighting } from '@/data/sightings';
import {
  useLiveSighting,
  type SightingRoutePoint,
} from '@/hooks/use-live-sighting';

const MIN_SCALE = 1;
const MAX_SCALE = 2.8;
const CENTER_SCALE = 1.2;
const MAP_WIDTH_FACTOR = 2.2;
const MAP_HEIGHT_FACTOR = 1.35;
const THREE_D_VERTICAL_SCALE = 0.92;

type TrackerMapProps = {
  sightings: readonly Sighting[];
  latestSighting: Sighting;
  selectedId: string | null;
  terrain: boolean;
  is3D: boolean;
  centerRequest: number;
  topInset: number;
  onSelect: (id: string | null) => void;
};

function clampOnUI(value: number, minimum: number, maximum: number) {
  'worklet';
  return Math.min(Math.max(value, minimum), maximum);
}

function panLimit(
  contentDimension: number,
  viewportDimension: number,
  currentScale: number,
) {
  'worklet';
  return Math.max(0, (contentDimension * currentScale - viewportDimension) * 0.5);
}

function verticalMapScale(threeDProgress: number) {
  'worklet';
  return 1 - (1 - THREE_D_VERTICAL_SCALE) * threeDProgress;
}

export function TrackerMap({
  sightings,
  latestSighting,
  selectedId,
  terrain,
  is3D,
  centerRequest,
  topInset,
  onSelect,
}: TrackerMapProps) {
  const [viewport, setViewport] = useState({ width: 1, height: 1 });
  const mapWidth = viewport.width * MAP_WIDTH_FACTOR;
  const mapHeight = viewport.height * MAP_HEIGHT_FACTOR;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);
  const pinchStartScale = useSharedValue(1);
  const pinchStartX = useSharedValue(0);
  const pinchStartY = useSharedValue(0);
  const pinchFocalX = useSharedValue(0);
  const pinchFocalY = useSharedValue(0);
  const viewportWidth = useSharedValue(1);
  const viewportHeight = useSharedValue(1);
  const contentWidth = useSharedValue(1);
  const contentHeight = useSharedValue(1);
  const followLatest = useSharedValue(true);
  const threeDProgress = useSharedValue(0);

  const handleRoutePoint = useCallback(
    (point: SightingRoutePoint) => {
      if (!followLatest.get()) {
        return;
      }

      const nextScale = scale.get();
      const verticalScale = verticalMapScale(threeDProgress.get());
      const limitX = panLimit(
        contentWidth.get(),
        viewportWidth.get(),
        nextScale,
      );
      const limitY = panLimit(
        contentHeight.get() * verticalScale,
        viewportHeight.get(),
        nextScale,
      );
      const nextX = (0.5 - point.x) * contentWidth.get() * nextScale;
      const nextY =
        (0.5 - point.y) * contentHeight.get() * nextScale * verticalScale;

      translateX.set(
        withTiming(clampOnUI(nextX, -limitX, limitX), { duration: 3_000 }),
      );
      translateY.set(
        withTiming(clampOnUI(nextY, -limitY, limitY), { duration: 3_000 }),
      );
    },
    [
      contentHeight,
      contentWidth,
      followLatest,
      scale,
      threeDProgress,
      translateX,
      translateY,
      viewportHeight,
      viewportWidth,
    ],
  );

  const {
    liveLocation,
    liveSequence,
    liveUpdateProgress,
    liveX,
    liveY,
  } = useLiveSighting({ latestSighting, onRoutePoint: handleRoutePoint });

  useEffect(() => {
    threeDProgress.set(withTiming(is3D ? 1 : 0, {
      duration: 360,
      easing: Easing.inOut(Easing.quad),
    }));
  }, [is3D, threeDProgress]);

  useEffect(() => {
    if (centerRequest === 0 || viewport.width <= 1 || viewport.height <= 1) {
      return;
    }

    const verticalScale = verticalMapScale(is3D ? 1 : 0);
    const limitX = panLimit(mapWidth, viewport.width, CENTER_SCALE);
    const limitY = panLimit(
      mapHeight * verticalScale,
      viewport.height,
      CENTER_SCALE,
    );
    const targetX = (0.5 - liveX.get()) * mapWidth * CENTER_SCALE;
    const targetY =
      (0.5 - liveY.get()) * mapHeight * CENTER_SCALE * verticalScale;
    followLatest.set(true);
    const centerAnimation = {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    };

    scale.set(withTiming(CENTER_SCALE, centerAnimation));
    translateX.set(
      withTiming(clampOnUI(targetX, -limitX, limitX), centerAnimation),
    );
    translateY.set(
      withTiming(clampOnUI(targetY, -limitY, limitY), centerAnimation),
    );
  }, [
    centerRequest,
    followLatest,
    is3D,
    liveX,
    liveY,
    mapHeight,
    mapWidth,
    scale,
    translateX,
    translateY,
    viewport.height,
    viewport.width,
  ]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const nextMapWidth = width * MAP_WIDTH_FACTOR;
    const nextMapHeight = height * MAP_HEIGHT_FACTOR;
    const currentScale = scale.get();
    const verticalScale = verticalMapScale(threeDProgress.get());
    const limitX = panLimit(nextMapWidth, width, currentScale);
    const limitY = panLimit(
      nextMapHeight * verticalScale,
      height,
      currentScale,
    );

    setViewport({ width, height });
    viewportWidth.set(width);
    viewportHeight.set(height);
    contentWidth.set(nextMapWidth);
    contentHeight.set(nextMapHeight);
    translateX.set(
      clampOnUI(
        (0.5 - liveX.get()) * nextMapWidth * currentScale,
        -limitX,
        limitX,
      ),
    );
    translateY.set(
      clampOnUI(
        (0.5 - liveY.get()) * nextMapHeight * currentScale * verticalScale,
        -limitY,
        limitY,
      ),
    );
  };

  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .minDistance(4)
    .onBegin(() => {
      panStartX.set(translateX.get());
      panStartY.set(translateY.get());
      followLatest.set(false);
    })
    .onUpdate((event) => {
      const verticalScale = verticalMapScale(threeDProgress.get());
      const limitX = panLimit(contentWidth.get(), viewportWidth.get(), scale.get());
      const limitY = panLimit(
        contentHeight.get() * verticalScale,
        viewportHeight.get(),
        scale.get(),
      );
      translateX.set(
        clampOnUI(panStartX.get() + event.translationX, -limitX, limitX),
      );
      translateY.set(
        clampOnUI(panStartY.get() + event.translationY, -limitY, limitY),
      );
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin((event) => {
      pinchStartScale.set(scale.get());
      pinchStartX.set(translateX.get());
      pinchStartY.set(translateY.get());
      pinchFocalX.set(event.focalX);
      pinchFocalY.set(event.focalY);
      followLatest.set(false);
    })
    .onUpdate((event) => {
      const nextScale = clampOnUI(
        pinchStartScale.get() * event.scale,
        MIN_SCALE,
        MAX_SCALE,
      );
      const ratio = nextScale / pinchStartScale.get();
      const verticalScale = verticalMapScale(threeDProgress.get());
      const centeredFocalX = pinchFocalX.get() - viewportWidth.get() / 2;
      const centeredFocalY = pinchFocalY.get() - viewportHeight.get() / 2;
      const nextX = centeredFocalX - (centeredFocalX - pinchStartX.get()) * ratio;
      const nextY = centeredFocalY - (centeredFocalY - pinchStartY.get()) * ratio;
      const limitX = panLimit(contentWidth.get(), viewportWidth.get(), nextScale);
      const limitY = panLimit(
        contentHeight.get() * verticalScale,
        viewportHeight.get(),
        nextScale,
      );

      scale.set(nextScale);
      translateX.set(clampOnUI(nextX, -limitX, limitX));
      translateY.set(clampOnUI(nextY, -limitY, limitY));
    });

  const mapGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const panStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.get() },
      { translateY: translateY.get() },
    ],
  }));

  const mapTransformStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 700 },
      { scale: scale.get() },
      { rotateX: `${interpolate(threeDProgress.get(), [0, 1], [0, 12])}deg` },
      {
        scaleY: interpolate(
          threeDProgress.get(),
          [0, 1],
          [1, THREE_D_VERTICAL_SCALE],
        ),
      },
    ],
  }));

  const mapCanvasStyle = {
    width: mapWidth,
    height: mapHeight,
    left: (viewport.width - mapWidth) * 0.5,
    top: (viewport.height - mapHeight) * 0.5,
  };

  return (
    <View style={styles.frame}>
      <View style={styles.viewport} onLayout={handleLayout}>
        <GestureDetector gesture={mapGesture}>
          <Reanimated.View style={[styles.panLayer, mapCanvasStyle, panStyle]}>
            <Reanimated.View style={[styles.transformLayer, mapTransformStyle]}>
              <Pressable
                accessibilityLabel="Interactive Spider-Man tracking map"
                accessibilityRole="button"
                onPress={() => onSelect(null)}
                style={styles.mapContent}>
                <MapStreetLayer terrain={terrain} is3D={is3D} />
                {sightings.map((sighting) => {
                  const latest = sighting.id === latestSighting.id;
                  return (
                    <SightingMarker
                      key={sighting.id}
                      sighting={sighting}
                      selected={sighting.id === selectedId}
                      latest={latest}
                      canvasWidth={mapWidth}
                      canvasHeight={mapHeight}
                      liveX={latest ? liveX : undefined}
                      liveY={latest ? liveY : undefined}
                      onPress={() => onSelect(sighting.id)}
                    />
                  );
                })}
              </Pressable>
            </Reanimated.View>
          </Reanimated.View>
        </GestureDetector>

        <TrackerMapOverlay
          liveLocation={liveLocation}
          liveSequence={liveSequence}
          liveUpdateProgress={liveUpdateProgress}
          sightingCount={sightings.length}
          topInset={topInset}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.navy,
  },
  panLayer: { position: 'absolute' },
  transformLayer: { ...StyleSheet.absoluteFill },
  mapContent: { flex: 1 },
});
