import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { getData } from "../../ManageApiCalls";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  cardBlock: {
    margin: 0,
    padding: "5px",
    textAlign: "center",
    paddingBottom: "10px"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const capitalize = (s) => {
    s = s.toLowerCase();
    return (typeof s !== 'string') ? s : (s.charAt(0).toUpperCase() + s.slice(1));
}
const Details = props => {
    const { selectedCharector, dialogStatus, handleClose } = props;

    const [ rmorigin, setRmOrigin ] = useState(undefined);
    const [ rmlocation, setRmLocation ] = useState(undefined);
    const [ rmepisode, setRmEpisode ] = useState(undefined);

    const classes = useStyles();
    
    let hasData = false;
    if (selectedCharector) {
        hasData = true;
        var { id, name, image, origin, location, episode, url, created, ...data } =  selectedCharector;
    }

    useEffect(() => {
        getData(origin.url).then(res => {
            const {id, residents, url, created, ...orginInfo } = res;
            setRmOrigin(orginInfo);
        }, error => {

        });

        getData(location.url).then(res => {
            console.log('location', res);
            const {id, residents, url, created, ...locationInfo } = res;
            setRmLocation(locationInfo);
        }, error => {

        });

        if (episode && episode.length > 0) {
            const eId = [];
            episode.forEach(episod => {
                const splitted = episod.split('/');
                eId.push(splitted[splitted.length - 1]);
            })
            const ids = (eId && eId.length > 0) ? eId.join(',') : '';
            if (ids !== '') {
                getData('https://rickandmortyapi.com/api/episode/' + ids).then(res => {
                    if (eId.length === 1) {
                        setRmEpisode([res]);
                    } else {
                        setRmEpisode(res);
                    }
                }, error => {
        
                });
            }
        }



    }, []);

    

    

    return (
        <>
        <Dialog fullScreen open={dialogStatus} onClose={handleClose} TransitionComponent={Transition}>
         {hasData ? <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                    Close
                    </Button>
                </Toolbar>
                </AppBar>
                <Grid container>
                <>
                    <Grid item xs={6} sm={6} lg={4} xl={4} className={classes.cardBlock}>
                        <Card>
                            <CardActionArea> 
                                <CardMedia
                                component="img"
                                src={image}
                                title={name}
                                />
                                {data && Object.keys(data).map((elem, index) => (
                                <Typography key={`row${index}`}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                    {capitalize(elem)}: {data[elem]}
                                </Typography>
                            ))}
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6} lg={4} xl={4} className={classes.cardBlock}>
                        <Card>
                            <CardActionArea> 
                                Origin:<br />
                                {rmorigin && Object.keys(rmorigin).map((elem, index) => (
                                    <Typography key={`row${index}`}
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
                                        {capitalize(elem)}: {rmorigin[elem]}
                                    </Typography>
                                ))}
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={6} sm={6} lg={4} xl={4} className={classes.cardBlock}>
                        <Card>
                            <CardActionArea> 
                                Location: <br />
                                {rmlocation && Object.keys(rmlocation).map((elem, index) => (
                                    <Typography key={`row${index}`}
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
                                        {capitalize(elem)}: {rmlocation[elem]}
                                    </Typography>
                                ))}
                            </CardActionArea>
                        </Card>
                    </Grid>

 {rmepisode && rmepisode.length > 0 && rmepisode.map((episode, index) => (
    <Grid item xs={6} sm={6} lg={3} xl={3} className={classes.cardBlock} key={`episode${index}`}>
                        <Card>
                            <CardActionArea> 
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Episode: {episode.episode}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Name: {episode.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Air Date: {episode.air_date}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
))}
                    
                    </>
                </Grid>
                
                

            </> : <div>Invalid Request</div>}
            </Dialog>
        </>    
    );
}

export default Details;