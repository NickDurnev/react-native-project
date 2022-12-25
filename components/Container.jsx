import { View, StyleSheet } from "react-native";

export const Container = ({ children, addStyles }) => (
  <View style={{ ...styles.container, ...addStyles }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
