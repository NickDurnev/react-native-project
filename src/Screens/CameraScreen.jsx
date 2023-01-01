import { useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

// icons import
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const CameraScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);

  const takePhoto = async () => {
    const shot = await camera.takePictureAsync();
    console.log(shot.uri);
    // await MediaLibrary.createAssetAsync(shot.uri);
    setPhoto(shot.uri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#6B6B6B" }}>
      {photo ? (
        <View>
          <Image source={{ uri: photo }} style={{ height: "100%" }} />
          <View style={styles.butttonContainer}>
            <TouchableOpacity
              style={styles.butttonWrap}
              onPress={() => navigation.navigate("Create", { photo: photo })}
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
          <View style={styles.bar}>
            <TouchableOpacity style={styles.buttton} onPress={takePhoto} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    borderRadius: 8,
  },
  bar: {
    height: "13%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B6B6B",
  },
  buttton: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    backgroundColor: "#FEFBFA",
  },
  butttonContainer: {
    position: "absolute",
    bottom: 40,
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
