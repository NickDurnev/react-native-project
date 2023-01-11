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
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";
import "moment/locale/uk";
import { uploadCommentToDB } from "../../firebase/storageOperations";
import { db } from "../../firebase/config";
import { Header, Container, Title } from "../../components";

//#Icons imports
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import SendIcon from "../../../assets/icons/send.svg";

const windowsWidth = Dimensions.get("window").width;
moment.locale("fr");

export const CommentsScreen = ({ navigation, route }) => {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const { id, photo, commentsNumber, prevScreen } = route.params;
  const { userId, nickname, avatarURL } = useSelector((state) => state.auth);

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

  const getComments = async () => {
    await onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      const commentsArray = snapshot.docs.map((doc) => {
        const post = doc.data();
        return { id: doc.id, ...post };
      });
      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    const date = moment().format("DD MMMM, YYYY | HH:mm");
    const text = userComment.value;
    await uploadCommentToDB({
      id,
      userId,
      avatarURL,
      nickname,
      commentsNumber,
      text,
      date,
    });
    setUserComment("");
    handleKeyboardHide();
  };

  const handleKeyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(prevScreen)}
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
        <Image source={{ uri: photo }} style={styles.image} />
        {comments && (
          <FlatList
            data={comments}
            renderItem={({ item, index }) => {
              const isInteger = Number.isInteger(index / 2);
              const { text, date, avatarURL } = item;
              return (
                <View
                  style={{
                    flexDirection: isInteger ? "row" : "row-reverse",
                    justifyContent: "space-between",
                    marginBottom: index === comments.length - 1 ? 0 : 24,
                  }}
                >
                  <Image source={{ uri: avatarURL }} style={styles.avatar} />
                  <View style={styles.comment}>
                    <Text style={styles.nicknameText}>{nickname}</Text>
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
        )}
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
          value={userComment}
          onChangeText={(value) =>
            setUserComment((prevState) => ({ ...prevState, value }))
          }
          maxLength={150}
          multiline={true}
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
  nicknameText: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 16,
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
    minHeight: 50,
    paddingRight: 50,
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
