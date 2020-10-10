import React from 'react'
import {Route, Switch} from 'react-router'
import {Home, ItemDetail, ItemsSearch, CartList, FavoritesList} from './templates/index'


const Router = () => {
    return (
        <Switch>
            <Route exact path={"(/)?"} component={Home}/>
            <Route exact path={"/item/:id"} component={ItemDetail}/>
            <Route exact path={"/cart/list"} component={CartList}/>
            <Route path={"/search"} component={ItemsSearch} />
            <Route exact path={"/cart"} component={CartList} />
            <Route exact path={"/favorites"} component={FavoritesList} />
        </Switch>
    )
}

// path={"/item/....."} のパスを指定するとルーティングのバグが発生する

export default Router;