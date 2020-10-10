import {createSelector} from 'reselect'

const itemsSelector = (state) => state.items;

export const getNewItems = createSelector (
    [itemsSelector],
    state => state.new
)
export const getMenItems = createSelector (
    [itemsSelector],
    state => state.men
)
export const getWomanItems = createSelector (
    [itemsSelector],
    state => state.woman
)
export const getCategory = createSelector (
    [itemsSelector],
    state => state.category
)

export const getItemsInCart = createSelector (
    [itemsSelector],
    state => state.cart
)

export const getItemsInFavorites = createSelector (
    [itemsSelector],
    state => state.favorites
)