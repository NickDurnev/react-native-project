import { View, FlatList } from "react-native";
import { Header, Container, Title, Post, LogoutBtn } from "../components";

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
        <LogoutBtn
          addStyles={{ position: "absolute", top: 55, right: 16 }}
          onPress={() => console.log("Logout")}
        />
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
