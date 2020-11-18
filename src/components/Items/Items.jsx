import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {push} from "connected-react-router"
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {deleteItemFromFavorite} from '../../reducks/items/operations'
import {db} from '../../firebase/index'

// sm: 600px, 
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'  // スマホ表示
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
        // webkit: 2,
        OverflowEvent: 'hidden',
        fontSize: '13px',
    },
}))

const Items = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()


    const deleteFavorite = useCallback(() => {
        // db.collection('items').doc('items').collection('favorites').get()
        dispatch(deleteItemFromFavorite(props.id))  
    }, [])
    

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
                {props.deleteButton && <Typography onClick={deleteFavorite}>削除</Typography>}
            </CardContent>
        </Card>
    )
}

export default Items;