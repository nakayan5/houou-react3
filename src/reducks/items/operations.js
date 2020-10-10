import {db} from '../../firebase/index'
import {push} from 'connected-react-router'
import {fetchNewItemsAction, fetchMenItemsAction, fetchWomanItemsAction, fetchCategoryAction, fetchItemsInCartAction, fetchItemsInFavoritesAction} from './actions'

const itemsRef = db.collection('items')

export const fetchItems = () => {
    return async (dispatch) => {
        itemsRef.doc('items').get().then(snapshots => {
            const data = snapshots.data()
            const list = data.item  // [{}, {}, {}...]
            const newItemsList = list.filter(item => {
                if (item["new"] === true) return true
            })
            const menItemsList = list.filter(item => {
                if (item["category"] === "men") return true
            })
            const womanItemsList = list.filter(item => {
                if (item["category"] === "woman") return true 
            })
            dispatch(fetchNewItemsAction(newItemsList)) 
            dispatch(fetchMenItemsAction(menItemsList)) 
            dispatch(fetchWomanItemsAction(womanItemsList)) 
        })
    }
}

export const fetchCategory = (gender, str) => {
    return async (dispatch) => {
        itemsRef.doc('items').get().then(snapshots => {
            const data = snapshots.data()
            const list = data.item  // [{}, {}, {}...]
            // const name = /シャツ/
            // const str = '/'+name+'/g'
            // console.log(name);
            // const regex = '"' +  list[0].text + '"'; 
            // console.log(regex.test(str));
            if (gender !== '') {
                const genderCategoryList = list.filter(item => {
                    if (item["category"] === gender) return true
                })
                dispatch(fetchCategoryAction(genderCategoryList))    
            } else if (str !== '' && gender === '') {
                const stringCategoryList = list.filter(item => {
                    if (item["text"].match(str)) return true
                })
                console.log(stringCategoryList);
                dispatch(fetchCategoryAction(stringCategoryList))
            } else {
                return false
            }
        })
    }
}

export const addItemToCart = (addedItems) => {
    return async (dispatch) => {
        const cartRef = itemsRef.doc('items').collection('cart').doc()
        // addedItems['id'] = cartRef.id
        await cartRef.set(addedItems)
        dispatch(push('/'))
    }
}

export const addFavoriteItem = (addedItems) => {
    return async (dispatch) => {
        const favRef = itemsRef.doc('items').collection('favorites').doc()
        await favRef.set(addedItems)
        dispatch(push('/'))
    }
}

export const fetchItemsInCart = (items) => {
    return async (dispatch) => {
        dispatch(fetchItemsInCartAction(items))
    }
}

export const fetchItemsInFavorites = (items) => {
    return async (dispatch) => {
        dispatch(fetchItemsInFavoritesAction(items))
    }
}