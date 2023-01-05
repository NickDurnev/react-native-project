import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { Header, Container, Title, Post, LogoutBtn } from "../../components";
import { authLogoOut } from "../../redux/auth/authOperations";

const initialData = [
  {
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
  },
];

export const DefaultScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setData([...data, route.params.data]);
    }
  }, [route]);

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
          data={initialData}
          renderItem={({ item }) => {
            const { name, email, posts } = item;
            return (
              <View style={{ flex: 1 }}>
                <View style={styles.user}>
                  <Image
                    source={require("../../../assets/mocks/Posts/User.png")}
                    style={styles.avatar}
                  />
                  <View style={styles.textWrap}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                  </View>
                </View>
                <FlatList
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
                ></FlatList>
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
