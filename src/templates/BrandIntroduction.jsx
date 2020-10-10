import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'bold'
  },
}));

const  BrandIntroduction = () => {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper className={classes.paper}>AAA</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>BBB</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>CCC</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>DDD</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>EEE</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>FFF</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>GGG</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>HHH</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>III</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>JJJ</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>KKK</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>LLL</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default BrandIntroduction;
