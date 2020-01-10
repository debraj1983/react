import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import HeaderNav from '../templates/HeaderNav';
import RightPanel from '../../RightPanel';
import getCharectors from "../../ManageApiCalls";
import RickMortryDetails from "./Details"; 

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
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
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    loader: {
      textAlign: "center"
    }
  }));

const HomePage = props => {
  const classes = useStyles();
  const [charectors, setCharectors] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);
  const [page, setPage] = useState(1);
  const [changeInPage, setChangeInPage] = useState(false);
  const [queryParams, setQueryParams] = useState({
    species: "",
    gender: "",
    status: ""
  });
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedCharector, setSelectedCharector] = useState(undefined);
  const loadMorePage = () => {
    setPage(page + 1);
    setChangeInPage(true);
  };
  useEffect(() => {
    const params = [];
    if (queryParams.species) {
      params.push("species=" + queryParams.species);
    }
    if (queryParams.gender) {
      params.push("gender=" + queryParams.gender);
    }
    if (queryParams.status) {
      params.push("status=" + queryParams.status);
    }
    const paramStr = params.length > 0 ? "&" + params.join("&") : "";
    setShowLoader(true);
    getCharectors("?page=" + page + paramStr).then(res => {
      setShowLoader(false);
      setNoDataFound(false);
      if (res && res.results && res.results.length > 0) {
        if (changeInPage) {
          setCharectors([...charectors, ...res.results]);
        } else {
          setCharectors([...res.results]);
        }
      }
    }, error => {
      setNoDataFound(true);
      setShowLoader(false);
      setShowLoadMoreButton(false);
      setCharectors([]);
    });
  }, [page, queryParams]);
 
  const opFilter = event => {
    const { value, checked } = event.target;
    const [data, key] = value.split("-");
    const qP = { ...queryParams, [key]: data };
    setQueryParams(qP);
    setChangeInPage(false);
  };

  const handleClickOpen = (charector) => {
    setDialogStatus(true);
    setSelectedCharector(charector);
  };

  const handleClose = () => {
    setDialogStatus(false);
    setSelectedCharector(undefined);
};

    return (
      <>
        <div className={classes.root}>
            <CssBaseline />
            <HeaderNav  isChecked={opFilter} />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <RightPanel noDataFound={noDataFound} charectors={charectors} displayDetails={handleClickOpen} />
                  {(showLoader) ? (<div className={classes.loader}><CircularProgress /></div>) : ''}
                {(showLoadMoreButton) ? (<Button
                  fullWidth={true}
                  color="primary"
                  variant="contained"
                  onClick={() => loadMorePage()}
                >
                  Load More
                </Button>) : ''}
            </div>
        </div>
        { selectedCharector ? <RickMortryDetails selectedCharector={selectedCharector} dialogStatus={dialogStatus} handleClose={handleClose}/> : '' }
        
      </>
      );
}

export default HomePage;
