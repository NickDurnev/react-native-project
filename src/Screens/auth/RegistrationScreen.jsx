import { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { uploadUserAvatarsToStorage } from "../../firebase/storageOperations";
import { Title, Input, TextBtn, SubmitBtn } from "../../components";

//#Icons imports
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import PlusIcon from "../../../assets/icons/add-plus.svg";

import { authRegister } from "../../redux/auth/authOperations";

const halfWindowsWidth = Dimensions.get("window").width / 2;

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const dispatch = useDispatch();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      dispatch(authRegister(state));
      setState(initialState);
      return;
    }
    const imageURL = await uploadUserAvatarsToStorage(image, state.email);
    dispatch(authRegister({ ...state, imageURL }));
    setState(initialState);
  };

  const handleKeyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bcgImage}
          source={require("../../../assets/images/PhotoBG.png")}
        />
        <View
          style={{
            ...styles.form,
            ...Platform.select({
              android: {
                height: isShownKeyboard ? 390 : 550,
              },
              ios: {
                height: isShownKeyboard ? 670 : 550,
              },
            }),
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <>
                  <Image source={{ uri: image }} style={styles.avatar} />
                  <CrossIcon
                    style={{
                      ...styles.avatarIcon,
                      right: halfWindowsWidth - 96,
                      bottom: -35,
                    }}
                    width={40}
                    height={40}
                  />
                </>
              ) : (
                <>
                  <View
                    style={{
                      ...styles.avatar,
                      backgroundColor: "#F6F6F6",
                    }}
                  />
                  <PlusIcon style={styles.avatarIcon} width={25} height={25} />
                </>
              )}
            </TouchableOpacity>
            <Title
              addStyles={{
                marginTop: 95,
                marginBottom: 33,
                fontSize: 30,
                lineHeight: 35,
              }}
            >
              Реєстрація
            </Title>
            <Input
              isSecure={false}
              placeholder={"Логін"}
              value={state.login}
              onChange={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              position={{ marginBottom: 15 }}
            />
            <Input
              isSecure={false}
              placeholder={"Адреса електронної пошти"}
              position={{ marginBottom: 15 }}
              value={state.email}
              onChange={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative", marginBottom: 45 }}>
              <Input
                isSecure={isHiddenPassword}
                placeholder={"Пароль"}
                value={state.password}
                onChange={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TextBtn
                handlePress={setIsHiddenPassword}
                text={isHiddenPassword ? "Показати" : "Скрити"}
                isHiddenPassword={isHiddenPassword}
                position={{ position: "absolute", top: 15, right: 15 }}
              />
            </View>
            {!isShownKeyboard && (
              <SubmitBtn
                text={"Зареєструватися"}
                onSubmit={handleSubmit}
                position={{
                  marginBottom: 15,
                }}
              />
            )}
            {!isShownKeyboard && (
              <TextBtn
                handlePress={() => navigation.navigate("Login")}
                text={"Вже є аккаунт? Увійти"}
                position={{
                  alignItems: "center",
                  marginBottom: 45,
                }}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "flex-end",
  },
  bcgImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  form: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    height: 120,
    width: 120,
    position: "absolute",
    top: -75,
    left: halfWindowsWidth - 75,
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: -30,
    right: halfWindowsWidth - 90,
  },
});
