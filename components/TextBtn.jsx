import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const TextBtn = ({ handlePress, text, isHiddenPassword, position }) => (
  <TouchableOpacity
    onPress={() => handlePress(!isHiddenPassword)}
    style={{ ...position, ...styles.btn }}
  >
    <Text style={styles.BtnText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "transparent",
  },
  BtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

TextBtn.propTypes = {
  handlePress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isHiddenPassword: PropTypes.bool,
  position: PropTypes.object,
};
