import React,{useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getItemsInFavorites} from '../reducks/items/selectors'
import {Items} from '../components/Items/index'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 60,
        marginBottom: 60
    }
}))

const FavoritesList = () => {
    const deleteButton = true;
    const classes = useStyles()
    const selector = useSelector(state => state)
    const favoriteItems = getItemsInFavorites(selector)

    


    return (
        <div className='inner'>
            <section className='c-section'>
                <h2 className={classes.title}>お気に入りに追加したアイテム</h2>
                <div className="items-container">
                        {favoriteItems.length > 0 && (
                            favoriteItems.map(item => (
                                <Items
                                    name={item.name} key={item.id} price={item.price} 
                                    id={item.id} category={item.category} deleteButton={deleteButton}
                                />
                            ))
                        )}
                </div>
            </section>
        </div>
    )
}

export default FavoritesList;