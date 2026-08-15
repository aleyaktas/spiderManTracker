import type { AudioSource } from 'expo-audio';

import type { SightingLocation } from '@/data/sightings';

export const DEFAULT_SIGHTING_LOCATION: SightingLocation = 'QUEENS';

export const sightingAnnouncements: Record<SightingLocation, AudioSource> = {
  QUEENS: require('../../assets/audio/sightings/queens.wav'),
  ASTORIA: require('../../assets/audio/sightings/astoria.wav'),
  CORONA: require('../../assets/audio/sightings/corona.wav'),
  'FOREST HILLS': require('../../assets/audio/sightings/forest-hills.wav'),
  ELMHURST: require('../../assets/audio/sightings/elmhurst.wav'),
  MIDTOWN: require('../../assets/audio/sightings/midtown.wav'),
  SUNNYSIDE: require('../../assets/audio/sightings/sunnyside.wav'),
  'LONG ISLAND CITY': require('../../assets/audio/sightings/long-island-city.wav'),
  QUEENSBORO: require('../../assets/audio/sightings/queensboro.wav'),
};
