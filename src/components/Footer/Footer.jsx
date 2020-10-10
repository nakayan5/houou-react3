import React from 'react' 
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        [theme.breakpoints.up('sm')]: {
            padding: '40px 0',
        },
        color: 'white',
        backgroundColor: '#333'
    },
    title: {
        fontSize: '60px',
        textAlign: 'center',
        margin: 0,
    },
    list: {
        // [theme.breakpoints.up('sm')]: {
        //     display: 'flex'
        // },
        textAlign: 'center',
        padding: 0,
        margin: 0,
        display: 'block'
    },
    icon: {
        [theme.breakpoints.up('sm')]: {
            margin: '20px'
        }
    }

}))

const Footer = () => {
    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <div className='inner'>
                <h1 className={classes.title}>NINCO</h1>
                <div>
                    <ul className={classes.list}>
                        <li className={classes.icon}><TwitterIcon/></li>
                        <li className={classes.icon}><FacebookIcon/></li>
                        <li className={classes.icon}><InstagramIcon/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;