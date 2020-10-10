import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {ItemsReducer} from '../items/reducers'


export default function createStore(history) {
    return reduxCreateStore (
        combineReducers({
            router: connectRouter(history),
            items: ItemsReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}