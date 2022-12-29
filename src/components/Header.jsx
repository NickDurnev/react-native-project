import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

export const Header = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 90,
    paddingTop: 50,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
});

Header.propTypes = {
  addStyles: PropTypes.object,
};
