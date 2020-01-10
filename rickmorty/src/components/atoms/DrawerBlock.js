import React from "react";
import Drawer from "@material-ui/core/Drawer";

const DrawerBlock = props => {
  const { children, ...properties } = props;
  return <Drawer {...properties}>{children}</Drawer>;
};

export default DrawerBlock;
