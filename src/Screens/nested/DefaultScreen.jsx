import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { collection, getDocs, getCountFromServer } from "firebase/firestore";
import { Header, Container, Title, Post, LogoutBtn } from "../../components";
import { db } from "../../firebase/config";
import { authLogoOut } from "../../redux/auth/authOperations";

export const DefaultScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
      const post = doc.data();
      const commentsColRef = collection(db, "posts", doc.id, "comments");
      const commentsCloSnapshot = await getCountFromServer(commentsColRef);
      const commentsNumber = commentsCloSnapshot.data().count;
      setData([...data, { ...post, id: doc.id, commentsNumber }]);
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
              commentsNumber,
              coords,
              userID,
            } = item;
            return (
              <View style={styles.post}>
                <View style={styles.user}>
                  <Image
                    source={require("../../../assets/mocks/Posts/User.png")}
                    style={styles.avatar}
                  />
                  <View style={styles.textWrap}>
                    <Text style={styles.name}>{nickname}</Text>
                    <Text style={styles.email}>{email}</Text>
                  </View>
                </View>
                <Post
                  data={{ name, location, photo, commentsNumber, coords }}
                  showComments={() =>
                    navigation.navigate("CommentsScreen", {
                      id,
                      comments,
                      nickname,
                      userID,
                      photo,
                    })
                  }
                  showLocation={() =>
                    navigation.navigate("MapScreen", {
                      photo,
                      coords,
                    })
                  }
                  marginBottom={index === data.length - 1 ? 0 : 32}
                />
                {/* <FlatList
                  data={data}
                  renderItem={({ item, index }) => {
                    return (
                      <Post
                        data={item}
                        showComments={() =>
                          navigation.navigate("CommentsScreen")
                        }
                        showLocation={() =>
                          navigation.navigate("MapScreen", {
                            photo: item.photo,
                            coords: item.coords,
                          })
                        }
                        marginBottom={index === posts.length - 1 ? 0 : 32}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.id}
                ></FlatList> */}
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
