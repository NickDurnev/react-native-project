import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import LogOutIcon from "../../assets/icons/log-out.svg";

export const LogoutBtn = ({ onPress, addStyles }) => {
  return (
    <TouchableOpacity style={{ ...addStyles }} onPress={onPress}>
      <LogOutIcon height={24} width={24} />
    </TouchableOpacity>
  );
};

LogoutBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  addStyles: PropTypes.object,
};
