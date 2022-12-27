import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
} from "react-native";
import { Header, Container, Title } from "../components";
import GoBackIcon from "../assets/icons/arrow-left.svg";
import SendIcon from "../assets/icons/send.svg";

const comments = [
  {
    id: 1,
    text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    date: "09 июня, 2020 | 08:40",
  },
  {
    id: 2,
    text: "Really love your most recent photo.",
    date: "09 июня, 2020 | 08:40",
  },
  {
    id: 3,
    text: "Very nice",
    date: "09 июня, 2020 | 08:40",
  },
  {
    id: 4,
    text: "Very nice",
    date: "09 июня, 2020 | 08:40",
  },
  {
    id: 5,
    text: "Very nice.dsdasdasdsadssssssssssssssssssssssssssssssssssssssss.",
    date: "09 июня, 2020 | 08:40",
  },
  {
    id: 6,
    text: "Very nice.dsdasdasdsadssssssssssssssssssssssssssssssssssssssss.",
    date: "09 июня, 2020 | 08:40",
  },
];

const windowsWidth = Dimensions.get("window").width;

export const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
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
    console.log(comment);
    setComment("");
  };

  // const handleKeyboardHide = () => {
  //   setIsShownKeyboard(false);
  //   Keyboard.dismiss();
  // };

  return (
    <View style={{ flex: 1 }}>
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
          Коментарі
        </Title>
      </Header>
      <Container addStyles={{ paddingBottom: 86, flex: 1 }}>
        {/* <Image source={{ uri: { image } }} style={styles.image} /> */}
        <View style={styles.image}></View>
        <FlatList
          data={comments}
          renderItem={({ item, index }) => {
            const isInteger = Number.isInteger(index / 2);
            const { text, date } = item;
            return (
              <View
                style={{
                  flexDirection: isInteger ? "row" : "row-reverse",
                  justifyContent: "space-between",
                  marginBottom: index === comments.length - 1 ? 0 : 24,
                }}
              >
                <View style={styles.avatar} />
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{text}</Text>
                  <View
                    style={{
                      flexDirection: isInteger ? "row-reverse" : "row",
                    }}
                  >
                    <Text style={{ ...styles.commentDate }}>{date}</Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </Container>
      <View
        style={{
          position: "absolute",
          bottom: isShownKeyboard ? keyboardHeight : 8,
          left: 16,
        }}
      >
        <TextInput
          placeholder={"Коментувати..."}
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={(value) =>
            setComment((prevState) => ({ ...prevState, value }))
          }
          style={{ ...styles.input, marginBottom: 16 }}
        />
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleSubmit()}
        >
          <SendIcon height={34} width={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  image: {
    marginBottom: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  comment: {
    width: windowsWidth - 32 - 28 - 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    borderTopRightRadius: 0,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  input: {
    padding: 16,
    alignItems: "center",
    width: windowsWidth - 32,
    height: 50,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
  inputButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
