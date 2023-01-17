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
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import {
  uploadPhotoToStorage,
  uploadPostToDB,
} from "../../firebase/storageOperations";
import {
  Header,
  Container,
  Title,
  SubmitBtn,
  ModalView,
  PhotoPicker,
} from "../../components";

//# Icons imports
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import MapIcon from "../../../assets/icons/map-pin.svg";
import CameraIcon from "../../../assets/icons/camera.svg";
import CrossIcon from "../../../assets/icons/delete-cross.svg";

const initialState = {
  name: "",
  location: "",
};

export const CreatePostScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { userId, nickname, email, avatarURL } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route]);

  useEffect(() => {
    if (!Object.values(state).includes("") && photo) {
      setIsDisable(false);
    }
  }, [state]);

  useEffect(() => {
    (async () => {
      const location = await Location.requestForegroundPermissionsAsync();

      setLocationPermission(location.status === "granted");
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShownKeyboard(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShownKeyboard(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (isDisable) {
      return;
    }
    let coords = null;
    setIsLoading(true);
    if (locationPermission) {
      const location = await Location.getCurrentPositionAsync({});
      coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
    const imageURL = await uploadPhotoToStorage(photo);
    const post = {
      ...state,
      photo: imageURL,
      userId: userId,
      userAvatar: avatarURL,
      nickname: nickname,
      email: email,
      commentsNumber: 0,
      likesNumber: 0,
      coords,
    };
    await uploadPostToDB(post);
    setIsLoading(false);
    setState(initialState);
    setPhoto(null);
    setIsDisable(true);
    navigation.setParams({ photo: null });
    navigation.navigate("DefaultScreen");
  };

  const openCamera = () => {
    setModalVisible(false);
    navigation.navigate("CameraScreen", { prevScreen: "Create" });
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DefaultScreen")}
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
          <View>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={{ marginBottom: isShownKeyboard ? 0 : 32 }}>
                  {photo ? (
                    <View>
                      <Image source={{ uri: photo }} style={{ height: 240 }} />
                      <TouchableOpacity
                        style={styles.crossButton}
                        onPress={() => setPhoto(null)}
                      >
                        <CrossIcon width={50} height={50} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.imageInput}>
                      <TouchableOpacity
                        style={styles.cameraBtn}
                        onPress={() => setModalVisible(true)}
                      >
                        <CameraIcon width={24} height={24} />
                      </TouchableOpacity>
                      <Text style={styles.text}>Завантажте фото</Text>
                    </View>
                  )}
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
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={"#FF6C00"} />
                ) : (
                  <SubmitBtn
                    text={"Опублікувати"}
                    onSubmit={handleSubmit}
                    disabled={isDisable}
                  />
                )}
              </KeyboardAvoidingView>
            </View>
            <ModalView
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            >
              <PhotoPicker
                setPhoto={(photo) => setPhoto(photo)}
                setModalVisible={setModalVisible}
                openCamera={openCamera}
              />
            </ModalView>
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
  imageInput: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    borderStyle: "solid",
    borderColor: "E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
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
  crossButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
  },
});
