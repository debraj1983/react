import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Alert } from '@material-ui/lab';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardBlock: {
    margin: 0,
    padding: "5px",
    textAlign: "center",
    paddingBottom: "10px"
  },
  error: {
    color: "#F00"
  }
});

const RightPanel = props => {
  const { noDataFound, charectors, displayDetails } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container>
        {noDataFound ? (
        <div className={classes.error}>No data found</div>
        ): <>
        {charectors &&
          charectors.length > 0 &&
          charectors.map((charector, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              lg={3}
              xl={3}
              className={classes.cardBlock}
              key={`grid${index}`}
            >
              <Paper>
                <Card onClick={() => displayDetails(charector)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      src={charector.image}
                      title={charector.name}
                    />
                    <CardContent>
                      <Typography component="h6">{charector.name}</Typography>
                    </CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Status: {charector.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Species: {charector.species}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Type: {charector.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Gender: {charector.gender}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          ))}
        </>}
        
      </Grid>
    </>
  );
};

export default RightPanel;
