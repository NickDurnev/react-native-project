import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export const SkeletonProfileAvatar = ({ styles }) => (
  <ContentLoader
    speed={2}
    width={120}
    height={120}
    viewBox="0 0 100 100"
    style={styles}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" width="120" height="120" />
  </ContentLoader>
);
