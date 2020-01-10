import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import getCharectors from "./ManageApiCalls";
import Filter from "./Filter";
import RightPanel from "./RightPanel";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0
  }
}));

function ResponsiveDrawer() {
  const [charectors, setCharectors] = useState([]);
  const [page, setPage] = useState(1);
  const [changeInPage, setChangeInPage] = useState(false);
  const [queryParams, setQueryParams] = useState({
    species: [],
    gender: [],
    status: []
  });
  const loadMorePage = () => {
    setPage(page + 1);
    setChangeInPage(true);
  };
  useEffect(() => {
    const params = [];
    if (queryParams.species.length > 0) {
      if (queryParams.species.length > 1) {
        params.push("species=[" + queryParams.species.join(",") + "]");
      } else {
        params.push("species=" + queryParams.species.join(","));
      }
    }
    if (queryParams.gender.length > 0) {
      params.push("gender=" + queryParams.gender.join(","));
    }
    if (queryParams.status.length > 0) {
      params.push("status=" + queryParams.status.join(","));
    }
    const paramStr = params.length > 0 ? "&" + params.join("&") : "";
    getCharectors("?page=" + page + paramStr).then(res => {
      if (res && res.results && res.results.length > 0) {
        if (changeInPage) {
          setCharectors([...charectors, ...res.results]);
        } else {
          setCharectors([...res.results]);
        }
      }
    });
  }, [page, queryParams]);

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const opFilter = event => {
    const { value, checked } = event.target;
    const [data, key] = value.split("-");
    if (checked) {
      const qP = { ...queryParams, [key]: [...queryParams[key], data] };
      setQueryParams(qP);
      setChangeInPage(false);
    } else {
      let arr = [...queryParams[key]];
      arr.splice(arr.indexOf(data), 1);
      const qP = { ...queryParams, [key]: [...arr] };
      setQueryParams(qP);
      setChangeInPage(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            THE RICK AND MORTY
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
            <Filter />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <Filter isChecked={opFilter} />
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <RightPanel charectors={charectors} />
        <Button
          fullWidth={true}
          color="primary"
          variant="contained"
          onClick={() => loadMorePage()}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object
};
export default ResponsiveDrawer;
