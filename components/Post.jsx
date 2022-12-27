import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import CommentIcon from "../assets/icons/message-circle.svg";
import ActiveCommentIcon from "../assets/icons/message-circle-active.svg";
import LikeIcon from "../assets/icons/thumbs-up.svg";
import MapIcon from "../assets/icons/map-pin.svg";

export const Post = ({ data, marginBottom }) => {
  const { name, comments, location, likes } = data;
  return (
    <View
      style={{
        height: 300,
        marginBottom: marginBottom,
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
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {comments?.length > 0 ? (
                <ActiveCommentIcon
                  width={24}
                  height={24}
                  style={{ marginRight: 8 }}
                />
              ) : (
                <CommentIcon
                  width={24}
                  height={24}
                  style={{ marginRight: 8 }}
                />
              )}
              <Text style={styles.iconNumber}>{comments?.length || 0}</Text>
            </View>
            {likes?.length > 0 && (
              <View
                style={{
                  marginLeft: 24,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <LikeIcon width={24} height={24} style={{ marginRight: 8 }} />
                <Text style={styles.iconNumber}>{likes?.length || 0}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MapIcon width={24} height={24} style={{ marginRight: 8 }} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: 8,
    height: 240,
    backgroundColor: "#F6F6F6",
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
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  marginBottom: PropTypes.number.isRequired,
};
