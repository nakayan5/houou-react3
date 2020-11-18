export const FETCH_NEWITEMS = 'FETCH_NEWITEMS';
export const fetchNewItemsAction = (items) => {
    return {
        type: 'FETCH_NEWITEMS',
        payload: items
    }
}
export const FETCH_MENITEMS = 'FETCH_MENITEMS';
export const fetchMenItemsAction = (items) => {
    return {
        type: 'FETCH_MENITEMS',
        payload: items
    }
}
export const FETCH_WOMANITEMS = 'FETCH_WOMANITEMS';
export const fetchWomanItemsAction = (items) => {
    return {
        type: 'FETCH_WOMANITEMS',
        payload: items
    }
}

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const fetchCategoryAction = (items) => {
    return {
        type: 'FETCH_CATEGORY',
        payload: items
    }
}

export const FETCH_ITEMS_IN_CART = 'FETCH_ITEMS_IN_CART';
export const fetchItemsInCartAction = (items) => {
    return {
        type: 'FETCH_ITEMS_IN_CART',
        payload: items
    }
}

export const FETCH_ITEMS_IN_FAVORITES = 'FETCH_ITEMS_IN_FAVORITES';
export const fetchItemsInFavoritesAction = (items) => {
    return {
        type: 'FETCH_ITEMS_IN_FAVORITES',
        payload: items
    }
}

export const DELETE_ITEMS_IN_FAVORITES = 'DELETE_ITEMS_IN_FAVORITES';
export const deleteItemsInFavoritesAction = (items) => {
    return {
        type: 'DELETE_ITEMS_IN_FAVORITES',
        payload: items
    }
}

export const DELETE_ITEMS_IN_CART = 'DELETE_ITEMS_IN_CART'
export const deleteItemsInCartAction = (items) => {
    return {
        type: 'DELETE_ITEMS_IN_CART',
        payload: items
    }
}

