import {db} from '../../firebase/index'
import {push} from 'connected-react-router'
import {fetchNewItemsAction, 
        fetchMenItemsAction, 
        fetchWomanItemsAction, 
        fetchCategoryAction, 
        fetchItemsInCartAction, 
        fetchItemsInFavoritesAction,
        deleteItemsInCartAction,
        deleteItemsInFavoritesAction,
    } from './actions'

const itemsRef = db.collection('items')
// docID と フィールドのIDは一致させた方が楽！

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

export const deleteItemFromFavorite = (number) => {
    return async(dispatch, getState) => {
        const snapshot = await itemsRef.doc('items').collection('favorites').where('id', '==', number).get()
        const id = snapshot.docs.map(doc => doc.id)
        itemsRef.doc('items').collection('favorites').doc(id[0]).delete()
            .then(() => {
                console.log('succesfully deleted');
                dispatch(push('/'))
            }).catch((err) => {
                console.log('error' + err);
            })
        
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