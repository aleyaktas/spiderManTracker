import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { PixelButton } from '@/components/pixel-button';
import { colors, pixelFont } from '@/constants/tracker-theme';
import { activityLog, mockMessages } from '@/data/sightings';

type TrackerModalProps = {
  visible: boolean;
  onClose: () => void;
};

type ModalShellProps = PropsWithChildren<TrackerModalProps & { title: string }>;

function ModalShell({
  visible,
  title,
  onClose,
  children,
}: ModalShellProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          accessibilityViewIsModal
          onPress={(event) => event.stopPropagation()}
          style={styles.window}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <PixelButton
              label="X"
              accessibilityLabel="Close"
              tone="orange"
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>
          <View style={styles.content}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ChatModal(props: TrackerModalProps) {
  return (
    <ModalShell {...props} title="CHAT">
      {mockMessages.map((message) => (
        <View key={message.id} style={styles.messageRow}>
          <Text style={styles.sender}>{message.sender}</Text>
          <Text style={styles.message}>{message.text}</Text>
        </View>
      ))}
    </ModalShell>
  );
}

export function ArchiveModal(props: TrackerModalProps) {
  return (
    <ModalShell {...props} title="ACTIVITY LOG">
      {activityLog.map((entry) => (
        <View key={entry.id} style={styles.archiveRow}>
          <Text style={styles.archiveTime}>{entry.time}</Text>
          <Text style={styles.archiveArea}>{entry.area}</Text>
          <Text style={styles.archiveResult}>{entry.result}</Text>
        </View>
      ))}
    </ModalShell>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  window: {
    width: '72%',
    maxWidth: 285,
    backgroundColor: colors.blue,
    borderWidth: 4,
    borderColor: colors.cyan,
  },
  header: {
    height: 35,
    paddingLeft: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy,
    borderBottomWidth: 3,
    borderBottomColor: colors.ink,
  },
  title: { flex: 1, color: colors.cyanLight, fontSize: 10, ...pixelFont },
  closeButton: { width: 34, height: 27, minHeight: 27, marginRight: 4 },
  content: { padding: 8, gap: 6 },
  messageRow: {
    padding: 7,
    backgroundColor: colors.navy,
    borderWidth: 2,
    borderColor: colors.blueDark,
  },
  sender: { color: colors.orangeLight, fontSize: 7, marginBottom: 3, ...pixelFont },
  message: { color: colors.cream, fontFamily: 'monospace', fontSize: 9 },
  archiveRow: {
    height: 32,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy,
    borderWidth: 2,
    borderColor: colors.blueDark,
  },
  archiveTime: { width: 48, color: colors.orangeLight, fontSize: 7, ...pixelFont },
  archiveArea: { flex: 1, color: colors.cyanLight, fontSize: 7, ...pixelFont },
  archiveResult: { color: colors.cream, fontSize: 5, ...pixelFont },
});
