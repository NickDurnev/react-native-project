import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const SubmitBtn = ({ text, onSubmit, position }) => (
  <TouchableOpacity onPress={onSubmit} style={{ ...position, ...styles.btn }}>
    <Text style={styles.BtnText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    height: 50,
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  BtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});

SubmitBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  position: PropTypes.object,
};
