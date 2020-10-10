import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: '5px',
    // marginRight: '15px'
  },
  text: {
      textAlign: 'center',
      borderBottom: '1px solid #e8e8e8'
  }
}));



const Sidebar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    
    const selectCategory = (event, path) => {
        dispatch(push(path))
    }
    
    const [categories, setCategories] = useState([
        {func: selectCategory, label: 'MEN', id: 'men', value: '/search/?gender=men'},
        {func: selectCategory, label: 'WOMAN', id: 'woman', value: '/search/?gender=woman'},
        {func: selectCategory, label: 'KIDS', id: 'kids', value: '/search/?gender=kids'}
    ])

    const [brands, setBrands] = useState([
        {label: 'AAA', id: 'AAA'},
        {label: 'BBB', id: 'BBB'},
        {label: 'CCC', id: 'CCC'},
        {label: 'DDD', id: 'DDD'}
    ])

    return (
        <div className={classes.root}>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
            <h3>GENDER</h3>
            {categories.map((category) => (
                <ListItem button key={category.id} onClick={(e) => category.func(e, category.value)}>
                    <ListItemText primary={category.label} className={classes.text}/>
                </ListItem>
            ))}
            <h3>BRAND</h3>
            {brands.map((brand) => (
                <ListItem button key={brand.id}>
                    <ListItemText primary={brand.label} className={classes.text}/>
                </ListItem>
            ))}
        </List>
        </div>
    );
}
export default Sidebar;