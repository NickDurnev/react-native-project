import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Title, Input } from "../components";
const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../assets/images/PhotoBG.png")}
      >
        <View style={styles.form}>
          <Title>Регістрація</Title>
          <Input
            isSecure={false}
            placeholder={"Логін"}
            indents={{ marginBottom: 16 }}
          />
          <Input
            isSecure={false}
            placeholder={"Адреса електронної пошти"}
            indents={{ marginBottom: 16 }}
          />
          <View style={{ position: "relative" }}>
            <Input isSecure={true} placeholder={"Пароль"} />
            <TouchableOpacity style={styles.inputBtn}>
              <Text style={styles.inputBtnText}>Показати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  bcgImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    height: 550,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "transparent",
  },
  inputBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
