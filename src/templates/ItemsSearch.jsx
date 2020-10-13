import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/styles'
// import HTMLReactParser from 'html-react-parser'
import {getNewItems, getCategory} from '../reducks/items/selectors'
import { fetchItems, fetchCategory } from '../reducks/items/operations';
import {Items, SideItems, SearchItems} from '../components/Items/index'
import {Sidebar} from '../components/UIkit/index'
// import { Tune } from '@material-ui/icons';
// import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    search_elements: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        margin: '60px 0',
        // display: 'none',
    },
    sidebar: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            width: '20%',
            marginRight: '5%',
        },
            margin: '0 auto'
    },
    c_section_search: {
        margin: '0 auto 60px auto',
        [theme.breakpoints.up('sm')]: {
            width: '75%'
        }
    }

}))

const ItemsSearch = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const newItems = getNewItems(selector)
    const category = getCategory(selector)

    const query = selector.router.location.search
    // queryの中に先頭に '\?gender=' という文字列が入っていらばtrue 入っていなければfalse 
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '' ;
    const string = /^\?string=/.test(query) ? query.split('?string=')[1] : '' ;
    let upperGenderLetter = gender.toUpperCase();
    let upperStringLetter = string.toUpperCase();
    const str = new RegExp(string)
    
    const displayTitle = () => {
        if (upperGenderLetter !== '') {
            let searchTitle = upperGenderLetter
            return searchTitle
        } else {
            let searchTitle = upperStringLetter
            return searchTitle
        }
    }

    useEffect(() => {
        dispatch(fetchItems())  // databaseからdataを取得する
        dispatch(fetchCategory(gender, str))
    }, [query])
    
    
    return (
        <section>
            <div className='inner'>
                <div className={classes.search_elements}>
                    <div className={classes.sidebar}>
                        <Sidebar/>
                    </div>
                    {/* <div className='c-section c-section_search'> */}
                    <div className={classes.c_section_search}>
                        <h1>WORD: {displayTitle()}</h1>
                        <div className='search'>
                            {category.length > 0 && (
                                category.map((item) => (
                                    // <SearchItems
                                    <Items
                                        name={item.name} key={item.id} price={item.price} text={item.text}
                                        id={item.id} category={item.category}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className='pick-up_items'>
                    <div className='c-section'>
                        <h2>PICK UP</h2>
                        <div className='items-container'>
                            {newItems && (
                                newItems.map((item) => (
                                    <SideItems
                                        name={item.name} key={item.id} price={item.price} text={item.text}
                                        id={item.id} category={item.category} 
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className='favorite_items'>
                    <section className='c-section'>
                        <h2>お気に入りに追加したアイテム</h2>
                        <div className="items-container">
                            {newItems.length > 0 && (
                                newItems.map(item => (
                                    <Items
                                        name={item.name} key={item.id} price={item.price} text={item.text}
                                        id={item.id} category={item.category} 
                                    />
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default ItemsSearch;