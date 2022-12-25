import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Header, Container, Title, Post } from "../components";
import LogOutIcon from "../assets/icons/log-out.svg";

const posts = [
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
      },
      {
        id: 2,
        image: "../assets/mocks/Posts/Post2.png",
        name: "Ліс",
        location: "Ivano-Frankivs'k Region, Ukraine",
      },
    ],
  },
];

export const PostsScreen = () => {
  return (
    <View>
      <Header>
        <Title
          addStyles={{
            fontSize: 17,
            lineHeight: 22,
          }}
        >
          Публікації
        </Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Logout")}
        >
          <LogOutIcon height={24} width={24} />
        </TouchableOpacity>
      </Header>
      <Container>
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            return (
              <View>
                <Post data={item} />
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
  button: {
    position: "absolute",
    top: 55,
    right: 16,
  },
});
