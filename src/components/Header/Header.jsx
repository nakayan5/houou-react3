import React,{useEffect, useState, useCallback} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import LogoNINCO from '../../assets/img/logo_black.png'
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { db } from '../../firebase';
import {getItemsInCart, getItemsInFavorites} from '../../reducks/items/selectors'
import {fetchItemsInCart, fetchItemsInFavorites} from '../../reducks/items/operations'
import { Category } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: 'white'
    },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: '30px',
    },
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    border: '1px solid #e8e8e8',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  cart: {
    margin: '0 0 0 auto'
  },
  favorite: {
    margin: '0 20px'
  },
  logo: {
    width: '130px',
    display: 'block',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
        marginRight: '40px'
    }
  }
}));

const Header = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    let itemsInCart = getItemsInCart(selector)
    const itemsInFavorites = getItemsInFavorites(selector)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId} keepMounted open={isMobileMenuOpen} onClose={handleMobileMenuClose}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user" aria-controls="primary-search-account-menu"
                aria-haspopup="true" color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <p>Profile</p>
        </MenuItem>
        </Menu>
    );

    const [keyword, setKeyword] = useState('');
    // console.log(keyword);
    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
        dispatch(push(`/search/?string=${keyword}`))
    }, [keyword])
    
    // リスナーの解除 / ページ遷移した時等にunsubscribeを実行しないとリスナーが解除されないままになるため
    useEffect(() => {
        const unsubscribe = db.collection('items').doc('items').collection('cart')
            .onSnapshot(snapshots => {   // onSnapshotはsnapshotを複数で取得する / onSnapshotでリスナーを設定
                snapshots.docChanges().forEach(change => {
                    const cartItems = change.doc.data()    // cartの中にある商品情報を取得
                    const changeType = change.type
                    switch (changeType) {
                        case 'added':
                            itemsInCart.push(cartItems)    // firebaseのデータに存在する商品情報をstoreに入れる
                            break;
                        case 'modified':
                            const index = itemsInCart.findIndex(product => product.cartId === change.doc.id)
                            itemsInCart[index] = cartItems
                        case 'removed':
                            itemsInCart = itemsInCart.filter(product => product.cartId !== change.doc.id)
                            break;
                        default:
                            break;
                    }
                })
                dispatch(fetchItemsInCart(itemsInCart)) // [{}, {}, {}...]
            })
            return () => unsubscribe()    // useEffectのreturn時はcomponentWillUnMountと同様
    }, [])                             // returnでunsubscribe()を呼び出す / unsubscribeはcallbackの形で記述
    useEffect(() => {
        const unsubscribe = db.collection('items').doc('items').collection('favorites')
            .onSnapshot(snapshots => {  
                snapshots.docChanges().forEach(change => {
                    const favoriteItems = change.doc.data()   
                    const changeType = change.type
                    if (changeType === 'added') {
                            itemsInFavorites.push(favoriteItems)    
                    } else if (changeType === 'modified') {
                        const index = itemsInFavorites.findIndex(product => product.cartId === change.doc.id)
                        itemsInFavorites[index] = favoriteItems
                    } else if (changeType === 'removed') {
                        itemsInFavorites = itemsInFavorites.filter(product => product.cartId !== change.doc.id)
                    }
                })
                dispatch(fetchItemsInFavorites(itemsInFavorites)) 
            })
            return () => unsubscribe()  
    }, [])                             

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.header}>
            <div className='inner'>
                <Toolbar className='header-container'>
                    <img src={LogoNINCO} onClick={() => dispatch(push('/'))} className={classes.logo} />
                    <Typography className={classes.title} variant="h6" noWrap onClick={() => dispatch(push('/search/?gender=men'))}>
                        MEN
                    </Typography>
                    <Typography className={classes.title} variant="h6" noWrap onClick={() => dispatch(push('/search/?gender=woman'))}>
                        WOMAN
                    </Typography>
                    <Typography className={classes.title} variant="h6" noWrap onClick={() => dispatch(push('/search/?gender=kids'))}>
                        KIDS
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon} >
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…" inputProps={{ 'aria-label': 'search' }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={inputKeyword} value={keyword} type={'text'} 
                        />
                    </div>
                    
                    <div className={classes.cart}>
                        <IconButton >
                            <Badge badgeContent={itemsInFavorites.length} color='secondary' onClick={() => dispatch(push('/favorites'))} >
                                <FavoriteBorderIcon />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={itemsInCart.length} color='secondary' onClick={() => dispatch(push('/cart'))} >
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </div>
    );
}

export default Header;