import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Header, Container, Title, Post } from "../components";
import LogOutIcon from "../assets/icons/log-out.svg";

const comments = [
  {
    id: 1,
    name: "Natali Romanova",
    email: "email@example.com",
  },
];

export const CommentsScreen = () => {
  return (
    <View>
      <Header>
        <Title
          addStyles={{
            fontSize: 17,
            lineHeight: 22,
          }}
        >
          Коментарі
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
          data={comments}
          renderItem={({ item }) => <Post data={item} />}
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
