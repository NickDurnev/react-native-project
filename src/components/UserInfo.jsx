import PropTypes from "prop-types";
import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SkeletonUserInfo } from "../components";

export const UserInfo = ({ userAvatar, nickname, email }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.user}>
      {isLoading && <SkeletonUserInfo />}

      {userAvatar ? (
        <Image
          source={{ uri: userAvatar }}
          onLoad={() => setIsLoading(false)}
          style={styles.avatar}
        />
      ) : (
        <View
          style={{
            ...styles.avatar,
            backgroundColor: "#F6F6F6",
          }}
        />
      )}
      {!isLoading && (
        <View style={styles.textWrap}>
          <Text style={styles.name}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      )}
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

UserInfo.propTypes = {
  userAvatar: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
