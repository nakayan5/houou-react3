import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
    display: 'inline-block'
  },
}));

const PrimaryButton = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => props.onClick()}>
                {props.label}
            </Button>
        </div>
    )
}

export default PrimaryButton;