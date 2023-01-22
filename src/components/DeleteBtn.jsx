import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DeleteBtn = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="trash-bin-sharp" size={30} color="#e4e1e0e2" />
      <Text style={styles.text}>Видалити</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#c33939d2",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 27,
    fontWeight: 500,
    color: "#e4e1e0e2",
  },
});

DeleteBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
};
