import { useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

import {
  DEFAULT_SIGHTING_LOCATION,
  sightingAnnouncements,
} from '@/data/sighting-audio';
import type { SightingLocation } from '@/data/sightings';

export function useSightingAnnouncement(location: SightingLocation) {
  const player = useAudioPlayer(null);

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'mixWithOthers',
    });
  }, []);

  useEffect(() => {
    const source =
      sightingAnnouncements[location] ??
      sightingAnnouncements[DEFAULT_SIGHTING_LOCATION];

    player.replace(source);
    player.play();

    return () => {
      player.pause();
    };
  }, [location, player]);
}
