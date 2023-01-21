import { View, Text, StyleSheet, Dimensions } from "react-native";
import Lottie from "lottie-react-native";

const windowWidth = Dimensions.get("window").width;

export const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Lottie
        source={require("../../assets/animations/welcome.json")}
        onAnimationFinish={() => navigation.navigate("Home")}
        autoPlay
        speed={1}
        loop={false}
      />
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    bottom: 120,
    left: windowWidth * 0.07,
    fontFamily: "Roboto-Bold",
    fontSize: 90,
    fontWeight: 600,
    color: "#f8cbb8",
  },
});
