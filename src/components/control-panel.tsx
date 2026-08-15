import { StyleSheet, Text, View } from 'react-native';

import { PixelButton } from '@/components/pixel-button';
import { colors, pixelFont } from '@/constants/tracker-theme';
import { PROFILE_IDS, type ProfileId } from '@/data/sightings';

type ControlPanelProps = {
  activeProfile: ProfileId;
  terrain: boolean;
  is3D: boolean;
  onProfileChange: (profile: ProfileId) => void;
  onTerrain: () => void;
  onThreeD: () => void;
  onChat: () => void;
  onArchive: () => void;
  onCenter: () => void;
  onShare: () => void;
};

export function ControlPanel({
  activeProfile,
  terrain,
  is3D,
  onProfileChange,
  onTerrain,
  onThreeD,
  onChat,
  onArchive,
  onCenter,
  onShare,
}: ControlPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View style={styles.identity}>
          <View style={styles.heroIcon}>
            <View style={styles.heroEyeLeft} />
            <View style={styles.heroEyeRight} />
          </View>
          <View>
            <Text style={styles.panelTitle}>SPIDER NETWORK</Text>
            <Text
              style={styles.panelMeta}
            >{`PROFILE ${activeProfile} // ONLINE`}</Text>
          </View>
        </View>
        <View style={styles.signalBadge}>
          <View style={styles.signalDot} />
          <Text style={styles.signalText}>SYNCED</Text>
        </View>
      </View>

      <View style={styles.profileStrip}>
        {PROFILE_IDS.map((profile) => (
          <PixelButton
            key={profile}
            label={`A.${profile}  PROF ${profile}`}
            active={activeProfile === profile}
            onPress={() => onProfileChange(profile)}
            style={styles.profileButton}
          />
        ))}
      </View>

      <View style={styles.actionGrid}>
        <PixelButton
          label="TERRAIN"
          tone="orange"
          active={terrain}
          onPress={onTerrain}
          style={styles.actionButton}
        />
        <PixelButton
          label="CHAT"
          tone="orange"
          onPress={onChat}
          style={styles.actionButton}
        />
        <PixelButton
          label={is3D ? '2D VIEW' : '3D VIEW'}
          tone="dark"
          active={is3D}
          onPress={onThreeD}
          style={styles.actionButton}
        />
        <PixelButton
          label="ARCHIVE"
          tone="orange"
          onPress={onArchive}
          style={styles.actionButton}
        />
        <PixelButton
          label="CENTER LOC"
          tone="orange"
          onPress={onCenter}
          style={styles.actionButton}
        />
        <PixelButton
          label="SHARE"
          tone="orange"
          onPress={onShare}
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 5,
    padding: 7,
    backgroundColor: 'rgba(6, 29, 71, 0.97)',
    borderWidth: 2,
    borderColor: colors.cyan,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
  },
  panelHeader: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroIcon: {
    width: 30,
    height: 26,
    borderRadius: 14,
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderColor: colors.ink,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  heroEyeLeft: {
    width: 7,
    height: 10,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.ink,
    transform: [{ rotate: '12deg' }],
  },
  heroEyeRight: {
    width: 7,
    height: 10,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.ink,
    transform: [{ rotate: '-12deg' }],
  },
  panelTitle: { color: colors.cream, fontSize: 8, marginBottom: 3, ...pixelFont },
  panelMeta: { color: colors.cyanLight, fontSize: 5, ...pixelFont },
  signalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: colors.block,
    borderRadius: 4,
  },
  signalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.teal,
  },
  signalText: { color: colors.teal, fontSize: 5, ...pixelFont },
  profileStrip: { flexDirection: 'row', gap: 4 },
  profileButton: { flex: 1, minHeight: 24 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  actionButton: { width: '32%', flexGrow: 1, minHeight: 30 },
});
