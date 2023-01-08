import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Container, Title, LogoutBtn, Post } from "../../components";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { authLogoOut } from "../../redux/auth/authOperations";

const halfWindowsWidth = Dimensions.get("window").width / 2;

export const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { userId, nickname } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    await onSnapshot(q, (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => {
        const post = doc.data();
        return { id: doc.id, ...post };
      });
      setData(postsArray);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../../assets/images/PhotoBG.png")}
      >
        <Container addStyles={styles.container}>
          <View style={styles.avatar}>
            <CrossIcon style={styles.avatarIcon} width={35} height={35} />
          </View>
          <LogoutBtn
            addStyles={{ marginLeft: "auto" }}
            onPress={() => dispatch(authLogoOut())}
          />
          <Title addStyles={styles.title}>{nickname}</Title>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              const {
                id,
                nickname,
                email,
                name,
                location,
                photo,
                commentsNumber = 0,
                likesNumber = 0,
                coords,
                userID,
              } = item;
              return (
                <View>
                  <Post
                    data={{
                      name,
                      location,
                      photo,
                      commentsNumber,
                      likesNumber,
                      coords,
                    }}
                    showComments={() =>
                      navigation.navigate("CommentsScreen", {
                        id,
                        photo,
                        commentsNumber,
                        prevScreen: "Profile",
                      })
                    }
                    showLocation={() =>
                      navigation.navigate("MapScreen", {
                        photo,
                        coords,
                        prevScreen: "Profile",
                      })
                    }
                    marginBottom={index === data.length - 1 ? 0 : 32}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </Container>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bcgImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    position: "relative",
    marginTop: 150,
    paddingTop: 22,
    paddingBottom: 42,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    height: 120,
    width: 120,
    position: "absolute",
    top: -60,
    left: halfWindowsWidth - 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: 10,
    right: -17,
  },
  title: {
    marginTop: 50,
    marginBottom: 35,
    fontSize: 30,
    lineHeight: 30,
  },
});
