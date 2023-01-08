import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase/config";
import { uploadUserAvatarsToStorage } from "../../firebase/storageOperations";
import { authSlice } from "../../redux/auth/authSlice";
import { Container, Title, LogoutBtn, Post } from "../../components";
import { authLogoOut } from "../../redux/auth/authOperations";

//#Icons imports
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import PlusIcon from "../../../assets/icons/add-plus.svg";

const halfWindowsWidth = Dimensions.get("window").width / 2;
const { changeAvatar } = authSlice.actions;

export const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { userId, nickname, email, avatarURL } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      const newAvatarURL = await uploadUserAvatarsToStorage(image, email);
      dispatch(changeAvatar({ avatarURL: newAvatarURL }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../../assets/images/PhotoBG.png")}
      >
        <Container addStyles={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            {avatarURL ? (
              <>
                <Image source={{ uri: avatarURL }} style={styles.avatar} />
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
    top: -75,
    left: halfWindowsWidth - 75,
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: -30,
    right: halfWindowsWidth - 90,
  },
  title: {
    marginTop: 50,
    marginBottom: 35,
    fontSize: 30,
    lineHeight: 30,
  },
});
