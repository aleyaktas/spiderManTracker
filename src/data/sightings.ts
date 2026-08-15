export const PROFILE_IDS = [1, 2, 3] as const;

export type ProfileId = (typeof PROFILE_IDS)[number];
export type SightingType = 'confirmed' | 'rumored';

export type Sighting = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly area: string;
  readonly timestamp: string;
  readonly type: SightingType;
  readonly status: string;
};

export const sightings = [
  {
    id: 's1',
    x: 0.63,
    y: 0.48,
    area: 'QUEENS',
    timestamp: '2 MIN AGO',
    type: 'confirmed',
    status: 'MOVEMENT DETECTED',
  },
  {
    id: 's2',
    x: 0.27,
    y: 0.28,
    area: 'ASTORIA',
    timestamp: '7 MIN AGO',
    type: 'rumored',
    status: 'POSSIBLE SIGHTING',
  },
  {
    id: 's3',
    x: 0.76,
    y: 0.7,
    area: 'FOREST HILLS',
    timestamp: '14 MIN AGO',
    type: 'confirmed',
    status: 'SIGNAL LOST',
  },
  {
    id: 's4',
    x: 0.43,
    y: 0.73,
    area: 'ELMHURST',
    timestamp: '18 MIN AGO',
    type: 'rumored',
    status: 'WEAK TRACE',
  },
  {
    id: 's5',
    x: 0.18,
    y: 0.58,
    area: 'MIDTOWN',
    timestamp: '22 MIN AGO',
    type: 'confirmed',
    status: 'ROOFTOP MOVEMENT',
  },
  {
    id: 's6',
    x: 0.82,
    y: 0.33,
    area: 'CORONA',
    timestamp: '31 MIN AGO',
    type: 'rumored',
    status: 'UNVERIFIED REPORT',
  },
] as const satisfies readonly [Sighting, ...Sighting[]];

const LATEST_SIGHTING_ID = 's1';

export const latestSightingRoute = [
  { x: 0.63, y: 0.48 },
  { x: 0.76, y: 0.36 },
  { x: 0.82, y: 0.48 },
  { x: 0.72, y: 0.63 },
  { x: 0.52, y: 0.67 },
  { x: 0.34, y: 0.58 },
  { x: 0.24, y: 0.43 },
  { x: 0.36, y: 0.31 },
  { x: 0.54, y: 0.36 },
] as const;

export const latestSightingLocations = [
  'QUEENS',
  'ASTORIA',
  'CORONA',
  'FOREST HILLS',
  'ELMHURST',
  'MIDTOWN',
  'SUNNYSIDE',
  'LONG ISLAND CITY',
  'QUEENSBORO',
] as const;

export type SightingLocation = (typeof latestSightingLocations)[number];

export const activityLog = [
  { id: 'a1', time: '07:04', area: 'QUEENS', result: 'CONFIRMED' },
  { id: 'a2', time: '06:51', area: 'ASTORIA', result: 'RUMORED' },
  { id: 'a3', time: '06:42', area: 'QUEENS', result: 'SIGNAL LOST' },
  { id: 'a4', time: '06:31', area: 'MIDTOWN', result: 'CONFIRMED' },
  { id: 'a5', time: '06:16', area: 'ELMHURST', result: 'RUMORED' },
  { id: 'a6', time: '05:58', area: 'CORONA', result: 'UNVERIFIED' },
] as const;

export const mockMessages = [
  { id: 'm1', sender: 'NED', text: 'Signal moved east.' },
  { id: 'm2', sender: 'MJ', text: 'Are we sure?' },
  { id: 'm3', sender: 'NED', text: 'Checking.' },
] as const;

export const latestSighting =
  sightings.find((sighting) => sighting.id === LATEST_SIGHTING_ID) ??
  sightings[0];

export function getSightingById(id: string | null) {
  if (!id) {
    return undefined;
  }

  return sightings.find((sighting) => sighting.id === id);
}

export function getSightingsForProfile(profile: ProfileId) {
  switch (profile) {
    case 1:
      return sightings.filter((sighting) => sighting.type === 'confirmed');
    case 2:
      return sightings.filter((sighting) => sighting.type === 'rumored');
    case 3:
      return sightings;
  }
}
