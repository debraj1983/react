import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardBlock: {
    margin: 0,
    padding: "5px"
  }
});

const RightPanel = props => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        {props.charectors &&
          props.charectors.length > 0 &&
          props.charectors.map((charector, index) => (
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
                <Card>
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
      </Grid>
    </>
  );
};

export default RightPanel;
