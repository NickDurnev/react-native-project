import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const SubmitBtn = ({ text, onSubmit, position, disabled = false }) => (
  <TouchableOpacity
    onPress={onSubmit}
    style={{
      ...position,
      ...styles.btn,
      backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
    }}
  >
    <Text
      style={{ ...styles.BtnText, color: disabled ? "#BDBDBD" : "#FFFFFF" }}
    >
      {text}
    </Text>
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
  },
});

SubmitBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  position: PropTypes.object,
  disabled: PropTypes.bool,
};
