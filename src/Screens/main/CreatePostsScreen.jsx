import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  Header,
  Container,
  Title,
  SubmitBtn,
  CameraComponent,
} from "../../components";
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import MapIcon from "../../../assets/icons/map-pin.svg";

const initialState = {
  avatar: "avatar",
  name: "",
  location: "",
};

export const CreatePostScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [isDisable, setIsDisable] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (route.params) {
      console.log(route.params);
      setPhoto(route.params.photo);
    }
  }, [route]);

  useEffect(() => {
    if (!Object.values(state).includes("")) {
      setIsDisable(false);
    }
  }, [state]);

  useEffect(() => {
    (async () => {
      const photo = await Camera.requestCameraPermissionsAsync();
      const location = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setCameraPermission(photo.status === "granted");
      setLocationPermission(location.status === "granted");
    })();
  }, []);

  const handleSubmit = async () => {
    if (isDisable) {
      return;
    }
    let coords = null;
    if (locationPermission) {
      const location = await Location.getCurrentPositionAsync({});
      coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
    console.log({ ...state, coords });
    setState(initialState);
    setPhoto(null);
    setIsDisable(true);
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Go back")}
        >
          <GoBackIcon height={24} width={24} />
        </TouchableOpacity>
        <Title
          addStyles={{
            fontSize: 17,
            lineHeight: 22,
          }}
        >
          Cтворити публікацію
        </Title>
      </Header>
      <Container>
        <TouchableWithoutFeedback onPress={handleKeyboardHide}>
          <View style={styles.container}>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={{ marginBottom: 32 }}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={{ height: 240 }} />
                  ) : (
                    <CameraComponent
                      hasPermission={cameraPermission}
                      setCamera={setCamera}
                      onPress={() => navigation.navigate("CameraScreen")}
                    />
                  )}
                  <Text style={styles.text}>Завантажте фото</Text>
                </View>
                <TextInput
                  placeholder={"Назва..."}
                  placeholderTextColor="#BDBDBD"
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                  style={{ ...styles.input, marginBottom: 16 }}
                />
                <View style={{ position: "relative" }}>
                  <MapIcon width={24} height={24} style={styles.inputIcon} />
                  <TextInput
                    placeholder={"Місцевість..."}
                    placeholderTextColor="#BDBDBD"
                    value={state.location}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        location: value,
                      }))
                    }
                    style={{
                      ...styles.input,
                      paddingLeft: 30,
                      marginBottom: 32,
                    }}
                  />
                </View>
                <SubmitBtn
                  text={"Опублікувати"}
                  onSubmit={handleSubmit}
                  disabled={isDisable}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    alignItems: "center",
    height: 50,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
  inputIcon: {
    position: "absolute",
    top: 13,
  },
});
