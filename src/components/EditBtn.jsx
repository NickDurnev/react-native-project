import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

//#Icons imports
import { Entypo } from "@expo/vector-icons";

export const EditBtn = ({ onPress, styles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles }}>
      <Entypo name="dots-three-horizontal" size={30} color="black" />
    </TouchableOpacity>
  );
};

EditBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  styles: PropTypes.object,
};
