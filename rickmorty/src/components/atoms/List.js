import React from "react";
import List from "@material-ui/core/List";

const ListBlock = props => {
  const { children, ...properties } = props;
  return <List {...properties}>{children}</List>;
};

export default ListBlock;
