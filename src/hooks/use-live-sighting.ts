import { useEffect, useState } from 'react';
import {
  Easing,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  latestSightingLocations,
  latestSightingRoute,
  type Sighting,
  type SightingLocation,
} from '@/data/sightings';
import { useSightingAnnouncement } from '@/hooks/use-sighting-announcement';

const ROUTE_STEP_MS = 3_200;
const ROUTE_ANIMATION_MS = 3_000;

export type SightingRoutePoint = (typeof latestSightingRoute)[number];

type UseLiveSightingOptions = {
  latestSighting: Sighting;
  onRoutePoint: (point: SightingRoutePoint) => void;
};

export function useLiveSighting({
  latestSighting,
  onRoutePoint,
}: UseLiveSightingOptions) {
  const [liveLocation, setLiveLocation] = useState<SightingLocation>(
    latestSightingLocations[0],
  );
  const [liveSequence, setLiveSequence] = useState(1);
  const liveUpdateProgress = useSharedValue(0);
  const liveX = useSharedValue(latestSighting.x);
  const liveY = useSharedValue(latestSighting.y);

  useSightingAnnouncement(liveLocation);

  useEffect(() => {
    liveUpdateProgress.set(0);
    liveUpdateProgress.set(
      withSequence(
        withTiming(1, {
          duration: 260,
          easing: Easing.out(Easing.back(1.7)),
        }),
        withDelay(
          2_300,
          withTiming(0, {
            duration: 350,
            easing: Easing.in(Easing.quad),
          }),
        ),
      ),
    );
  }, [liveLocation, liveUpdateProgress]);

  useEffect(() => {
    let routeIndex = 0;

    const interval = setInterval(() => {
      routeIndex = (routeIndex + 1) % latestSightingRoute.length;

      const point = latestSightingRoute[routeIndex];
      const location =
        latestSightingLocations[routeIndex % latestSightingLocations.length];

      setLiveLocation(location);
      setLiveSequence((current) => current + 1);
      liveX.set(
        withTiming(point.x, {
          duration: ROUTE_ANIMATION_MS,
          easing: Easing.inOut(Easing.quad),
        }),
      );
      liveY.set(
        withTiming(point.y, {
          duration: ROUTE_ANIMATION_MS,
          easing: Easing.inOut(Easing.quad),
        }),
      );
      onRoutePoint(point);
    }, ROUTE_STEP_MS);

    return () => clearInterval(interval);
  }, [liveX, liveY, onRoutePoint]);

  return {
    liveLocation,
    liveSequence,
    liveUpdateProgress,
    liveX,
    liveY,
  };
}
