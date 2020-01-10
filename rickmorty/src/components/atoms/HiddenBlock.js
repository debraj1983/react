import React from "react";
import Hidden from "@material-ui/core/Hidden";

const HiddenBlock = props => {
  const { children, ...properties } = props;
  return <Hidden {...properties}>{children}</Hidden>;
};

export default HiddenBlock;
