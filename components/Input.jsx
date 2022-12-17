import PropTypes from "prop-types";
import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({ isSecure, placeholder, indents }) => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      onChange={(text) => setValue(text)}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      secureTextEntry={isSecure}
      style={{ ...indents, ...styles.input }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    textDecorationColor: "red",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});

Input.propTypes = {
  isSecure: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  indents: PropTypes.object,
};
