import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, pixelFont } from '@/constants/tracker-theme';

type PixelButtonProps = {
  label: string;
  accessibilityLabel?: string;
  onPress: () => void;
  tone?: 'teal' | 'orange' | 'dark';
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PixelButton({
  label,
  accessibilityLabel = label,
  onPress,
  tone = 'teal',
  active = false,
  style,
}: PixelButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        tone === 'orange' && styles.orange,
        tone === 'dark' && styles.dark,
        active && styles.active,
        pressed && styles.pressed,
        style,
      ]}>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 22,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.teal,
    borderWidth: 2,
    borderColor: colors.ink,
    borderRadius: 2,
  },
  orange: { backgroundColor: colors.orangeLight },
  dark: { backgroundColor: colors.blueDark },
  active: { borderColor: colors.orange, backgroundColor: colors.cyanLight },
  pressed: { transform: [{ translateX: 1 }, { translateY: 1 }] },
  label: { color: colors.ink, fontSize: 7, textAlign: 'center', ...pixelFont },
});
