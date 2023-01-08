import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Toast from "react-native-toast-message";

//#Icons imports
import CommentIcon from "../../assets/icons/message-circle.svg";
import LikeIcon from "../../assets/icons/thumbs-up.svg";
import MapIcon from "../../assets/icons/map-pin.svg";

export const Post = ({ data, showComments, showLocation, marginBottom }) => {
  const { name, location, photo, commentsNumber, likesNumber, coords } = data;

  const likes = 0;

  const checkLocation = () => {
    console.log(coords);
    if (!coords) {
      Toast.show({
        type: "info",
        text1: "Локація не вказана",
      });
      return;
    }
    showLocation();
  };

  return (
    <View
      style={{
        height: 300,
        marginBottom: marginBottom,
      }}
    >
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.imageName}>{name}</Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={showComments}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <CommentIcon
                width={24}
                height={24}
                style={
                  commentsNumber > 0
                    ? { marginRight: 8, stroke: "#FF6C00" }
                    : { marginRight: 8, stroke: "#BDBDBD" }
                }
              />
              <Text style={styles.iconNumber}>{commentsNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LikeIcon
                width={24}
                height={24}
                style={
                  likesNumber > 0
                    ? { marginRight: 8, stroke: "#FF6C00" }
                    : { marginRight: 8, stroke: "#BDBDBD" }
                }
              />
              <Text style={styles.iconNumber}>{likes.length}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={checkLocation}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MapIcon width={24} height={24} style={{ marginRight: 8 }} />
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: 8,
    height: 240,
    // backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  imageName: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  iconNumber: {
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
    id: PropTypes.string,
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  showComments: PropTypes.func,
  showLocation: PropTypes.func,
  marginBottom: PropTypes.number.isRequired,
};
