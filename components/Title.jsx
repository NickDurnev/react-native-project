import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

export const Title = ({ children, addStyles }) => (
  <Text style={{ ...addStyles, ...styles.title }}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    lineHeight: 35,
    color: "#212121",
  },
});

Title.propTypes = {
  addStyles: PropTypes.object,
};
