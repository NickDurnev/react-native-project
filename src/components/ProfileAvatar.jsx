import { useState } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { SkeletonProfileAvatar } from "../components";

//#Icons imports
import CrossIcon from "../../assets/icons/delete-cross.svg";
import PlusIcon from "../../assets/icons/add-plus.svg";

const halfWindowsWidth = Dimensions.get("window").width / 2;

export const ProfileAvatar = ({ avatarURL, newAvatarURL }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {avatarURL || newAvatarURL ? (
        <>
          {isLoading && <SkeletonProfileAvatar styles={styles.avatar} />}
          <>
            <Image
              source={{ uri: newAvatarURL ? newAvatarURL : avatarURL }}
              onLoad={() => setIsLoading(false)}
              style={styles.avatar}
            />
            <CrossIcon
              style={{
                ...styles.avatarIcon,
                right: halfWindowsWidth - 96,
                bottom: -35,
              }}
              width={40}
              height={40}
            />
          </>
        </>
      ) : (
        <>
          <View
            style={{
              ...styles.avatar,
              backgroundColor: "#F6F6F6",
            }}
          />
          <PlusIcon style={styles.avatarIcon} width={25} height={25} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 120,
    width: 120,
    position: "absolute",
    top: -75,
    left: halfWindowsWidth - 75,
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: -30,
    right: halfWindowsWidth - 90,
  },
});
