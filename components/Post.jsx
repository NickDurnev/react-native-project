import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import CommentIcon from "../assets/icons/message-circle.svg";
import MapIcon from "../assets/icons/map-pin.svg";

export const Post = ({ data }) => {
  const { name, email } = data;
  return (
    <View>
      <View style={styles.user}>
        <Image
          source={require("../assets/mocks/Posts/User.png")}
          style={styles.avatar}
        />
        <View style={styles.textWrap}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={data.posts}
        renderItem={({ item, index }) => {
          const { image, name, location, comments } = item;
          console.log(index);
          return (
            <View
              style={{
                height: 300,
                marginBottom: index === data.posts.length - 1 ? 0 : 32,
              }}
            >
              {/* <Image source={{ uri: { image } }} style={styles.image} /> */}
              <View style={styles.image}></View>
              <Text style={styles.imageName}>{name}</Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CommentIcon
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.commentsNumber}>
                      {comments ? comments.length : 0}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MapIcon
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.locationText}>{location}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
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
  image: {
    marginBottom: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
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
  imageName: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentsNumber: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

Post.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
