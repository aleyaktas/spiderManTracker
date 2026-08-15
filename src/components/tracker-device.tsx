import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ControlPanel } from '@/components/control-panel';
import { TrackerMap } from '@/components/tracker-map';
import { colors } from '@/constants/tracker-theme';
import type { ProfileId, Sighting } from '@/data/sightings';

type TrackerDeviceProps = {
  sightings: readonly Sighting[];
  latestSighting: Sighting;
  selectedId: string | null;
  activeProfile: ProfileId;
  terrain: boolean;
  is3D: boolean;
  centerRequest: number;
  onSelect: (id: string | null) => void;
  onProfileChange: (profile: ProfileId) => void;
  onTerrain: () => void;
  onThreeD: () => void;
  onChat: () => void;
  onArchive: () => void;
  onCenter: () => void;
  onShare: () => void;
};

export function TrackerDevice({
  sightings,
  latestSighting,
  selectedId,
  activeProfile,
  terrain,
  is3D,
  centerRequest,
  onSelect,
  onProfileChange,
  onTerrain,
  onThreeD,
  onChat,
  onArchive,
  onCenter,
  onShare,
}: TrackerDeviceProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrap}>
      <View style={styles.device}>
        <View style={styles.mapRegion}>
          <TrackerMap
            sightings={sightings}
            latestSighting={latestSighting}
            selectedId={selectedId}
            terrain={terrain}
            is3D={is3D}
            centerRequest={centerRequest}
            topInset={insets.top}
            onSelect={onSelect}
          />
        </View>
        <View
          style={[
            styles.controlsRegion,
            { bottom: Math.max(insets.bottom, 10) },
          ]}
        >
          <ControlPanel
            activeProfile={activeProfile}
            terrain={terrain}
            is3D={is3D}
            onProfileChange={onProfileChange}
            onTerrain={onTerrain}
            onThreeD={onThreeD}
            onChat={onChat}
            onArchive={onArchive}
            onCenter={onCenter}
            onShare={onShare}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, width: '100%' },
  device: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  mapRegion: { flex: 1 },
  controlsRegion: {
    position: 'absolute',
    left: 10,
    right: 10,
  },
});
