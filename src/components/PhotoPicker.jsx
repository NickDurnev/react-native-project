import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

//# Icons imports
import { Entypo } from "@expo/vector-icons";
import CameraIcon from "../../assets/icons/camera.svg";

export const PhotoPicker = ({ setPhoto, setModalVisible, openCamera }) => {
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const photo = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setCameraPermission(photo.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.wrap}>
      {cameraPermission && (
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <CameraIcon width={30} height={30} fill={"#e4e1e0e2"} />
          <Text style={styles.text}>Камера</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Entypo name="images" size={30} color="#e4e1e0e2" />
        <Text style={styles.text}>Галерея</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    height: 150,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ea9b55d5",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 27,
    fontWeight: 500,
    color: "#e4e1e0e2",
  },
});

PhotoPicker.propTypes = {
  setPhoto: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  openCamera: PropTypes.func.isRequired,
};
