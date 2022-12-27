import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { Header, Container, Title, SubmitBtn } from "../../components";
import GoBackIcon from "../../assets/icons/arrow-left.svg";
import CameraIcon from "../../assets/icons/camera.svg";
import MapIcon from "../../assets/icons/map-pin.svg";

const initialState = {
  avatar: "avatar",
  name: "",
  location: "",
};

export const CreatePostScreen = () => {
  const [state, setState] = useState(initialState);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (!Object.values(state).includes("")) {
      setIsDisable(false);
    }
  }, [state]);

  const handleSubmit = () => {
    if (isDisable) {
      return;
    }
    console.log(state);
    setState(initialState);
    setIsDisable(true);
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };
  return (
    <View>
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
                  <TouchableOpacity style={styles.fileLoader}>
                    <CameraIcon width={60} height={60} />
                  </TouchableOpacity>
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
  fileLoader: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "E8E8E8",
    borderRadius: 8,
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
