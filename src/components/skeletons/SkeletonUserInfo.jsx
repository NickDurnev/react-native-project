import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export const SkeletonUserInfo = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={70}
    viewBox="0 0 300 100"
    style={{ width: "100%" }}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="16" ry="16" width="100" height="100" />
    <Rect x="115" y="30" rx="2" ry="2" width="200" height="20" />
    <Rect x="115" y="60" rx="2" ry="2" width="200" height="20" />
  </ContentLoader>
);
