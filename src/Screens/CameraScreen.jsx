import { useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

//# Icons imports
import GoBackIcon from "../../assets/icons/arrow-left.svg";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const CameraScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);

  const { prevScreen } = route.params;

  const takePhoto = async () => {
    const shot = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(shot.uri);
    setPhoto(shot.uri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#6B6B6B" }}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate(prevScreen)}
        >
          <GoBackIcon height={30} width={30} />
        </TouchableOpacity>
      </View>
      {photo ? (
        <View>
          <Image source={{ uri: photo }} style={{ height: "100%" }} />
          <View style={styles.butttonContainer}>
            <TouchableOpacity
              style={styles.butttonWrap}
              onPress={() => navigation.navigate(prevScreen, { photo: photo })}
            >
              <FontAwesome name="save" size={40} color="#6B6B6B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.butttonWrap}
              onPress={() => setPhoto(null)}
            >
              <AntDesign name="delete" size={40} color="#6B6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Camera
            style={{
              ...styles.camera,
            }}
            ref={(ref) => {
              setCamera(ref);
            }}
          ></Camera>
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.buttton} onPress={takePhoto} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 30,
    left: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#F6FAF4",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: "83%",
    borderRadius: 8,
  },
  bottomBar: {
    height: "10%",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B6B6B",
  },
  topBar: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B6B6B",
  },
  buttton: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: "#FEFBFA",
  },
  butttonContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    height: 60,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  butttonWrap: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#FEFBFA",
  },
});
