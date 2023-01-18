import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export const Skeleton = ({ width, height }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height - 50}
    viewBox="0 0 270 150"
    style={{ width: "100%" }}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="2" ry="2" width="500" height="300" />
  </ContentLoader>
);
