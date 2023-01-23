import { View, Image, Text, StyleSheet } from "react-native";
import { EditBtn } from "../components";

export const Comment = ({
  index,
  item,
  commentsLength,
  StoredUserId,
  handleEdit,
}) => {
  const { id, avatarURL, userId, nickname, text, date } = item;

  const isInteger = Number.isInteger(index / 2);

  return (
    <View
      style={{
        flexDirection: isInteger ? "row" : "row-reverse",
        justifyContent: "space-between",
        marginBottom: index === commentsLength - 1 ? 0 : 24,
      }}
    >
      <Image
        source={{ uri: avatarURL }}
        style={{
          ...styles.avatar,
          marginRight: isInteger ? 10 : 0,
          marginLeft: isInteger ? 0 : 10,
        }}
      />
      <View
        style={{
          ...styles.comment,
        }}
      >
        <View>
          <Text style={styles.nicknameText}>{nickname}</Text>
          <Text style={styles.commentText}>{text}</Text>
          <View>
            <Text style={styles.commentDate}>{date}</Text>
          </View>
        </View>
        {StoredUserId === userId && <EditBtn onPress={() => handleEdit(id)} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  comment: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    borderTopRightRadius: 0,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  nicknameText: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
