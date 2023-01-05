import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { Container, Title, LogoutBtn, Post } from "../../components";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { authLogoOut } from "../../redux/auth/authOperations";

const halfWindowsWidth = Dimensions.get("window").width / 2;

const profile = {
  id: 1,
  name: "Natali Romanova",
  email: "email@example.com",
  posts: [
    {
      id: 1,
      image: "../assets/mocks/Posts/Post1.png",
      name: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
      comments: [
        {
          id: 1,
          text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
          date: "09 июня, 2020 | 08:40",
        },
      ],
      likes: [{ id: 3, name: "Vitaliy Bikov", email: "email@example.com" }],
    },
    {
      id: 2,
      image: "../assets/mocks/Posts/Post2.png",
      name: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      id: 3,
      image: "../assets/mocks/Posts/Post2.png",
      name: "Гори",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
  ],
};

export const ProfileScreen = ({ navigation }) => {
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
          <Title addStyles={styles.title}>{profile.name}</Title>
          <FlatList
            data={profile.posts}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Post
                    data={item}
                    marginBottom={index === profile.posts.length - 1 ? 0 : 32}
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
    marginTop: 60,
    marginBottom: 35,
    fontSize: 30,
    lineHeight: 30,
  },
});
