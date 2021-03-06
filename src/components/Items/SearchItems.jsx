import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from "connected-react-router"
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// sm: 600px, 
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(40% -5%)'  // スマホ表示
        },
        [theme.breakpoints.up('sm')]: {
            margin: 4,
            width: 'calc(20% - 8px)'
        }
    },
    media: {
        width: '100%',
        height: '200px',
        paddig: '20px'
    },
    text: {
        margin: '5px 0px',
        display: '-webkit-box',
        webkit: 'vertical',
        OverflowEvent: 'hidden',
        fontSize: '13px',
    },
}))

const SearchItems = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.root}>
            <CardMedia
                image={`/static/images/cards/${props.id}.png`} // path重要
                className={classes.media} onClick={() => dispatch(push('/item/' + props.id))}
            />
            <CardContent>
                <Typography color='textSecondary' component='p' className={classes.text}>
                    {props.name}
                </Typography>
                <div className='module_spacer_vs'></div>
                <Typography color='textSecondary' component='p' className={classes.text}>
                    ￥{props.price}
                </Typography>
                <div className='module_spacer_vs'></div>
                <Typography color='textSecondary' component='p' className={classes.text}>
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SearchItems;