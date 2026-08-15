import { useState } from 'react';
import { Share, StyleSheet, View } from 'react-native';

import { TrackerDevice } from '@/components/tracker-device';
import { ArchiveModal, ChatModal } from '@/components/tracker-modals';
import { colors } from '@/constants/tracker-theme';
import {
  getSightingById,
  getSightingsForProfile,
  latestSighting,
  type ProfileId,
  type Sighting,
} from '@/data/sightings';

type ActiveModal = 'archive' | 'chat' | null;

function titleCase(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createShareMessage(sighting: Sighting) {
  const type = sighting.type === 'confirmed' ? 'Confirmed' : 'Rumored';

  return (
    `${type} tracker sighting detected in ${titleCase(sighting.area)} — ` +
    `${sighting.timestamp.toLowerCase()}.`
  );
}

export default function TrackerScreen() {
  const [profile, setProfile] = useState<ProfileId>(3);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [terrain, setTerrain] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [centerRequest, setCenterRequest] = useState(0);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const visibleSightings = getSightingsForProfile(profile);
  const selectedSighting = getSightingById(selectedId);

  const changeProfile = (nextProfile: ProfileId) => {
    const nextSightings = getSightingsForProfile(nextProfile);

    setProfile(nextProfile);
    setSelectedId((current) =>
      current && nextSightings.some((sighting) => sighting.id === current)
        ? current
        : null,
    );
  };

  const shareSighting = async () => {
    const target = selectedSighting ?? latestSighting;

    await Share.share({ message: createShareMessage(target) });
  };

  return (
    <View style={styles.screen}>
      <TrackerDevice
        sightings={visibleSightings}
        latestSighting={latestSighting}
        selectedId={selectedId}
        activeProfile={profile}
        terrain={terrain}
        is3D={is3D}
        centerRequest={centerRequest}
        onSelect={setSelectedId}
        onProfileChange={changeProfile}
        onTerrain={() => setTerrain((current) => !current)}
        onThreeD={() => setIs3D((current) => !current)}
        onChat={() => setActiveModal('chat')}
        onArchive={() => setActiveModal('archive')}
        onCenter={() => setCenterRequest((request) => request + 1)}
        onShare={() => void shareSighting()}
      />
      <ChatModal
        visible={activeModal === 'chat'}
        onClose={() => setActiveModal(null)}
      />
      <ArchiveModal
        visible={activeModal === 'archive'}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
