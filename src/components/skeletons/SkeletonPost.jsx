import PropTypes from "prop-types";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export const SkeletonPost = ({ width, height }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    viewBox="0 0 150 100"
    style={{ width: "100%" }}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="2" ry="2" width="150" height="75" />
    <Rect x="0" y="80" rx="2" ry="2" width="150" height="5" />
    <Rect x="0" y="90" rx="2" ry="2" width="50" height="15" />
    <Rect x="90" y="90" rx="2" ry="2" width="50" height="15" />
  </ContentLoader>
);

SkeletonPost.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
