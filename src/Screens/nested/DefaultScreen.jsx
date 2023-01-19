import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { Header, Container, Title, Post, LogoutBtn } from "../../components";
import { db } from "../../firebase/config";
import { authLogoOut } from "../../redux/auth/authOperations";

#//TODO Remove User info in separate component. Add skeleton instead it.

export const DefaultScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const getPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => {
        const post = doc.data();
        return { id: doc.id, ...post };
      });
      setData(postsArray);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Title
          addStyles={{
            fontSize: 17,
            lineHeight: 22,
          }}
        >
          Публікації
        </Title>
        <LogoutBtn
          addStyles={{ position: "absolute", top: 55, right: 16 }}
          onPress={() => dispatch(authLogoOut())}
        />
      </Header>
      <Container addStyles={{ flex: 1 }}>
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
              userAvatar,
              commentsNumber = 0,
              likesNumber = 0,
              coords,
            } = item;
            return (
              <View style={styles.post}>
                <View style={styles.user}>
                  {userAvatar ? (
                    <Image source={{ uri: userAvatar }} style={styles.avatar} />
                  ) : (
                    <View
                      style={{
                        ...styles.avatar,
                        backgroundColor: "#F6F6F6",
                      }}
                    />
                  )}
                  <View style={styles.textWrap}>
                    <Text style={styles.name}>{nickname}</Text>
                    <Text style={styles.email}>{email}</Text>
                  </View>
                </View>
                <Post
                  data={{
                    id,
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
                      prevScreen: "DefaultScreen",
                    })
                  }
                  showLocation={() =>
                    navigation.navigate("MapScreen", {
                      photo,
                      coords,
                      prevScreen: "DefaultScreen",
                    })
                  }
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flexDirection: "column",
  },
  user: {
    flexDirection: "row",
    marginBottom: 32,
  },
  avatar: {
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textWrap: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
});
