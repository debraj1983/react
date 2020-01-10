import React from "react";

import Nav from "../atoms/NavBlock";
import Hidden from "../atoms/HiddenBlock";
import NavMobile from "../molecules/NavMobile";
import NavDesktop from "../molecules/NavDesktop";


import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
}));

const Navigation = props => {
  const classes = useStyles();
  const { mobileOpen, handleDrawerToggle, children } = props;
  return (
    <Nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <NavMobile mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>{children}</NavMobile>
      </Hidden>
      <Hidden xsDown implementation="css">
        <NavDesktop>{children}</NavDesktop>
      </Hidden>
    </Nav>
  );
};

export default Navigation;
