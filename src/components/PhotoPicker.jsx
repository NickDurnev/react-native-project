import { View, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import CameraIcon from "../../assets/icons/camera.svg";

export const PhotoPicker = ({ setPhoto, setModalVisible, openCamera }) => {
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
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <CameraIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Entypo name="images" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: "50%",
  },
});
