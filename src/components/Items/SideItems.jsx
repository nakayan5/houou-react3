import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from "connected-react-router"
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'  // スマホ表示
        },
        [theme.breakpoints.up('sm')]: {
            margin: 4,
            paddig: 10,
            width: 'calc(50% - 8px)'
        },
        display: 'flex'
    },
    media: {
        width: '200px',
        height: '200px',
        // paddig: '20px',
        // position: 'relative',
        // overflow: 'hidden',
        
    },
    content: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
            // width: 10
        }
    }
}))

const SideItems = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Card className={classes.root}>
            {/* <div className='p_media__thumb'> */}
            <CardMedia
                image={`/static/images/cards/${props.id}.png`} // path重要
                className={classes.media} onClick={() => dispatch(push('/item/' + props.id))}
            />

            {/* </div> */}
            <CardContent className={classes.content}>
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

export default SideItems;