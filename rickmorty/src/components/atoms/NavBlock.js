import React from "react";

const NavBlock = props => {
  const { className, children } = props;
  return <nav className={className}>{children}</nav>;
};

export default NavBlock;
