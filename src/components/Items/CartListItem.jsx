import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ItemDetail } from '../../templates';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   width: '100%',
    //   maxWidth: '36ch',
    //   backgroundColor: theme.palette.background.paper,
    // },
    // inline: {
    //   display: 'inline',
    // },
    list: {
        height: 128,
        borderBottom: '1px solid #e8e8e8',
        // borderTop: '1px solid #e8e8e8'
    },
    image: {
        // width: '100%',
        // height: 'auto',
        objectFit: 'cover',
        margin: 16,
        width: 96,
        height: 96

    },
    content: {
        marginLeft: 20,
        fontSize: 20,
    }
  }));

const CartListItem = (props) => {
    const classes = useStyles();


    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img alt="カートに追加した商品" src={`/static/images/cards/${props.id}.png`} className={classes.image} />
                </ListItemAvatar>
                <div className={classes.content}>
                    <ListItemText
                        primary={props.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span" variant="body2"
                                    className={classes.inline} color="textPrimary"
                                >
                                    ￥{props.price}
                                </Typography>
                                {/* {props.text} */}
                            </React.Fragment>
                        }
                    />
                    <ListItemText primary={'Brand: ' + props.brand} />
                </div>
            </ListItem>
            
        </>
    )
}

export default CartListItem;