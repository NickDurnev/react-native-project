import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  uploadUserAvatarsToStorage,
  deleteFileFromStorage,
} from "../../firebase/storageOperations";
import {
  Container,
  Title,
  LogoutBtn,
  Post,
  PhotoPicker,
  ModalView,
} from "../../components";
import {
  authLogoOut,
  changeUserPhotoURL,
} from "../../redux/auth/authOperations";

//#Icons imports
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import PlusIcon from "../../../assets/icons/add-plus.svg";

const halfWindowsWidth = Dimensions.get("window").width / 2;

export const ProfileScreen = ({ navigation, route }) => {
  const [newAvatarURL, setAvatarURL] = useState(null);
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
    if (avatarURL) {
      await deleteFileFromStorage(email);
    }
    const newAvatarURL = await uploadUserAvatarsToStorage(photo, email);
    dispatch(changeUserPhotoURL({ newAvatarURL }));
    setAvatarURL(newAvatarURL);
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
            {avatarURL ? (
              <>
                <Image
                  source={{ uri: newAvatarURL ? newAvatarURL : avatarURL }}
                  style={styles.avatar}
                />
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
          <ModalView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          >
            <PhotoPicker
              setPhoto={(photo) => setPhoto(photo)}
              setModalVisible={setModalVisible}
              openCamera={openCamera}
              changeUserAvatar={changeUserAvatar}
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
