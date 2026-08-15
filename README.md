# Vigil Tracker

Vigil Tracker is a retro-styled, interactive neighborhood sighting map built
with Expo and React Native. It demonstrates animated map markers, pan and pinch
gestures, profile-based filtering, short audio announcements, modal panels, and
native sharing in a single cross-platform codebase.

> This is a fictional, fan-made interface. It does not track real people or
> locations and is not affiliated with or endorsed by Marvel or Sony.

## Features

- Animated live sighting route with local audio announcements
- Pan, pinch-to-zoom, recenter, terrain, and 2D/3D map controls
- Confirmed and rumored sighting filters
- Activity archive, chat preview, and native share sheet
- Android, iOS, and web support through Expo Router
- Strict TypeScript and Expo ESLint checks

## Tech stack

- Expo SDK 57
- React 19 and React Native 0.86
- Expo Router
- React Native Reanimated and Gesture Handler
- React Native SVG

## Requirements

- Node.js 22.13 or newer
- npm
- Expo Go or a platform simulator/emulator for native development

Expo SDK 57 targets React Native 0.86 and requires Node.js 22.13 or newer. See
the [versioned Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/)
for platform requirements.

## Getting started

```bash
git clone <your-repository-url>
cd spiderman-tracker
npm install
npm start
```

From the Expo CLI, open the project on Android, iOS, or web. You can also start
a platform directly:

```bash
npm run android
npm run ios
npm run web
```

## Quality checks

Run all static checks before opening a pull request:

```bash
npm run check
```

The same checks run automatically in GitHub Actions.

## Project structure

```text
src/
├── app/          # Expo Router screens and root layout
├── components/   # Tracker UI and map presentation
├── constants/    # Shared visual tokens
├── data/         # Typed demo data and asset mappings
└── hooks/        # Live route and audio behavior
```

All sightings and chat entries are static demo data in
`src/data/sightings.ts`. No backend, analytics service, API key, or user data is
used by the application.

## License

The source code is available under the [MIT License](LICENSE). Product names,
characters, and third-party trademarks remain the property of their respective
owners. Verify that you have distribution rights for any media assets you add
to a fork.
