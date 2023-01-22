import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Header,
  Container,
  Title,
  Post,
  UserInfo,
  LogoutBtn,
  EditBtn,
  ModalView,
  DeleteBtn,
} from "../../components";
import { db } from "../../firebase/config";
import {
  deletePostFromDB,
  deleteImageFromStorage,
} from "../../firebase/storageOperations";
import { authLogoOut } from "../../redux/auth/authOperations";

export const DefaultScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { userId } = useSelector((state) => state.auth);

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

  const handleEdit = (id) => {
    setSelectedPostId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    await deletePostFromDB(selectedPostId);
    // await deleteImageFromStorage("postImages", selectedPostId);
    setModalVisible(false);
  };

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
                <View style={styles.wrap}>
                  <UserInfo
                    userAvatar={userAvatar}
                    nickname={nickname}
                    email={email}
                  />
                  {userId === item.userId && (
                    <View style={{ paddingBottom: 30 }}>
                      <EditBtn onPress={() => handleEdit(id)} />
                    </View>
                  )}
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
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          width={200}
          height={100}
        >
          <DeleteBtn onPress={handleDelete} />
        </ModalView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flexDirection: "column",
  },
  wrap: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
