import { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, Input, TextBtn, SubmitBtn } from "../components";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [state, setstate] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

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

  const handleSubmit = () => {
    console.log(state);
    setstate(initialState);
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
          source={require("../assets/images/PhotoBG.png")}
        />
        <View
          style={{
            ...styles.form,
            ...Platform.select({
              android: {
                height: isShownKeyboard ? 270 : 490,
              },
              ios: {
                height: isShownKeyboard ? 550 : 490,
              },
            }),
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Title
              addStyles={{
                marginTop: 35,
                marginBottom: 33,
                fontSize: 30,
                lineHeight: 35,
              }}
            >
              Увійти
            </Title>
            <Input
              isSecure={false}
              placeholder={"Адреса електронної пошти"}
              position={{ marginBottom: 15 }}
              value={state.email}
              onChange={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative", marginBottom: 45 }}>
              <Input
                isSecure={isHiddenPassword}
                placeholder={"Пароль"}
                value={state.password}
                onChange={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
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
                text={"Увійти"}
                onSubmit={handleSubmit}
                position={{
                  marginBottom: 15,
                }}
              />
            )}
            {!isShownKeyboard && (
              <TextBtn
                handlePress={() => console.log("Увійшов")}
                text={"Нема аккаунта? Зареєструватися"}
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
});
