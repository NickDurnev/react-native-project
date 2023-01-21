import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  uploadImageToStorage,
  deleteImageFromStorage,
} from "../../firebase/storageOperations";
import {
  Container,
  Title,
  LogoutBtn,
  Post,
  PhotoPicker,
  ModalView,
  ProfileAvatar,
} from "../../components";
import {
  authLogoOut,
  changeUserPhotoURL,
} from "../../redux/auth/authOperations";
import { authSlice } from "../../redux/auth/authSlice";

const { changeAvatar } = authSlice.actions;

export const ProfileScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newAvatarURL, setNewAvatarURL] = useState(null);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { userId, nickname, email, avatarURL } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route]);

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
    changeUserAvatar();
  }, []);

  useEffect(() => {
    changeUserAvatar();
  }, [photo]);

  const changeUserAvatar = async () => {
    if (!photo) {
      return;
    }
    setIsLoading(true);
    if (avatarURL) {
      await deleteImageFromStorage(email);
      dispatch(changeAvatar({ avatarURL: null }));
    }
    const URL = await uploadImageToStorage(photo, "usersAvatars", email);
    await dispatch(changeUserPhotoURL({ URL }));
    setIsLoading(false);
    setNewAvatarURL(URL);
  };

  const openCamera = () => {
    setModalVisible(false);
    navigation.navigate("CameraScreen", { prevScreen: "Profile" });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../../assets/images/PhotoBG.png")}
      >
        <Container addStyles={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {isLoading ? (
              <ActivityIndicator size={"small"} color={"#FF6C00"} />
            ) : (
              <ProfileAvatar
                avatarURL={avatarURL}
                newAvatarURL={newAvatarURL}
              />
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
                name,
                location,
                photo,
                commentsNumber = 0,
                likesNumber = 0,
                coords,
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
  title: {
    marginTop: 50,
    marginBottom: 35,
    fontSize: 30,
    lineHeight: 30,
  },
});
