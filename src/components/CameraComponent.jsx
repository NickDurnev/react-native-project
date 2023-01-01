import PropTypes from "prop-types";
import { Camera } from "expo-camera";
import { StyleSheet, TouchableOpacity } from "react-native";
import CameraIcon from "../../assets/icons/camera.svg";

export const CameraComponent = ({ hasPermission, setCamera, onPress }) => {
  return (
    <Camera
      style={{
        ...styles.camera,
        backgroundColor: hasPermission ? "none" : "#F6F6F6",
        borderWidth: hasPermission ? 0 : 1,
      }}
      ref={(ref) => {
        setCamera(ref);
      }}
    >
      <TouchableOpacity style={styles.cameraBtn} onPress={onPress}>
        <CameraIcon width={24} height={24} />
      </TouchableOpacity>
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    borderStyle: "solid",
    borderColor: "E8E8E8",
    borderRadius: 8,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

CameraComponent.propTypes = {
  hasPermission: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])])
    .isRequired,
  setCamera: PropTypes.func.isRequired,
};
