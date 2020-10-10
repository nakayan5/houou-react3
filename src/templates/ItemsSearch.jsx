import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import {db, FirebaseTimestamp} from '../firebase/index'
// import { makeStyles } from '@material-ui/styles'
// import HTMLReactParser from 'html-react-parser'
// import {PrimaryButton, WhiteButton} from '../components/UIkit/index'
import {getNewItems, getCategory} from '../reducks/items/selectors'
import { fetchItems, fetchCategory } from '../reducks/items/operations';
import {Items, SideItems} from '../components/Items/index'
import {Sidebar} from '../components/UIkit/index'
// import { Tune } from '@material-ui/icons';
// import { getThemeProps } from '@material-ui/styles';

const ItemsSearch = () => {
    // const classes = useStyles()
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const newItems = getNewItems(selector)
    const category = getCategory(selector)
    // console.log(category);

    const query = selector.router.location.search
    // queryの中に先頭に '\?gender=' という文字列が入っていらばtrue 入っていなければfalse 
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '' ;
    const string = /^\?string=/.test(query) ? query.split('?string=')[1] : '' ;
    let upperGenderLetter = gender.toUpperCase();
    let upperStringLetter = string.toUpperCase();
    const str = new RegExp(string)
    // console.log(str);
    
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
                <div className='search_elements'>
                    <div className='sidebar'>
                        <Sidebar/>
                    </div>
                    <div className='c-section c-section_search'>
                        <h1>WORD: {displayTitle()}</h1>
                        <div className='search'>
                            {category.length > 0 && (
                                category.map((item) => (
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