import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeStyle {
  paddingRight: number,
  paddingLeft: number
}

export function useSafeContainerStyles(): SafeStyle {
  const insets = useSafeAreaInsets();

  return { paddingRight: insets.right, paddingLeft: insets.left }
}