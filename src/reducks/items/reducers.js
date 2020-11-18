import * as Actions from './actions';
import initialState from '../store/initialState';
// import { Action } from 'history';

export const ItemsReducer = (state = initialState.items, action) => {
    switch (action.type) {
        case Actions.FETCH_NEWITEMS:
            return {
                ...state,
                new: [...action.payload]
            }
            
        case Actions.FETCH_MENITEMS:
            return {
                ...state,
                men: [...action.payload]
            }

        case Actions.FETCH_WOMANITEMS:
            return {
                ...state,
                woman: [...action.payload]
            }
            
        case Actions.FETCH_CATEGORY:
            return {
                ...state,
                category: [...action.payload]
            }

        case Actions.FETCH_ITEMS_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            }

        case Actions.DELETE_ITEMS_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            }

        case Actions.FETCH_ITEMS_IN_FAVORITES:
            return {
                ...state,
                favorites: [...action.payload]
            }

        case Actions.DELETE_ITEMS_IN_FAVORITES:
            return {
                ...state,
                favorites: [...action.payload]
            }

        default:
            return state
    }
}