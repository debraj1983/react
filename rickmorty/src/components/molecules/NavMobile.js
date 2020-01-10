import React from "react";

import Drawer from "../atoms/DrawerBlock";
import CloseIcon from "@material-ui/icons/Close";

import IconButton from "@material-ui/core/IconButton";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0
  }
}));

const NavMobile = props => {
    const classes = useStyles();
    const theme = useTheme();

    const { mobileOpen, handleDrawerToggle, children } = props;

    return (
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <CloseIcon />
          </IconButton>
          { children }
        </Drawer>
    );
}

export default NavMobile;