import { useState } from "react";
import PropTypes from "prop-types";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({ isSecure, placeholder, position, onChange, value }) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      secureTextEntry={isSecure}
      style={{
        ...position,
        backgroundColor: focused ? "#FFFFFF" : "#F6F6F6",
        ...styles.input,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    textDecorationColor: "red",
    borderRadius: 8,
    textTransform: "lowercase",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});

Input.propTypes = {
  isSecure: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  position: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
