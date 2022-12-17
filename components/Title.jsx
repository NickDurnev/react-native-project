import { Text, StyleSheet } from "react-native";

export const Title = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
});
