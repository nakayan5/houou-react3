import React, {useMemo, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItemsInCart } from '../reducks/items/selectors'
import List from '@material-ui/core/List';
import {CartListItem} from '../components/Items/index'
import { makeStyles } from '@material-ui/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles({
    container: {
        marginTop: 60,
        marginBottom: 60,
        textAlign: 'center'
    },
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%',
        borderTop: '1px solid #e8e8e8'
    },
    alert: {
        color: 'red'
    },
    total: {
        marginTop: 40,
        textAlign: 'right'
    }
})

const CartList = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state)
    const itemsInCart = getItemsInCart(selector)  // productInCartは商品情報が入っている配列
    // const array = itemsInCart.map(item => {
    //     const priceNumber = Number(item.price) // ['price', 'price'...]
    //     return priceNumber  // [400, 1700,...]
    // })
    // const sumArray = array => {
    //     let sum = 0;
    //     for (let i = 0, len = array.length; i < len; i++) {
    //       sum += array[i];
    //     }
    //     return sum;
    // };
    // console.log(sumArray(array))

    const initailtotal = useMemo(() => {
        const array = itemsInCart.map(item => {
            const priceNumber = Number(item.price) // ['price', 'price'...]
            return priceNumber  // [400, 1700,...]
        })
        const sumArray = array => {
            let sum = 0;
            for (let i = 0, len = array.length; i < len; i++) {
              sum += array[i];
            }
            return sum;
        };
        return sumArray(array)
    }, [itemsInCart])
    console.log(initailtotal);




    return (
        <section className={classes.container}>
            <div className='inner'>
                <div>
                    <ShoppingCartIcon/>
                </div>
                <div>
                    <h2>ショッピングカート</h2>
                </div>
                <p className={classes.alert}>カートに入りました</p>
                <List className={classes.root}>
                    {itemsInCart.length > 0 && (
                        itemsInCart.map(item => (
                            <CartListItem key={item.id} id={item.id} name={item.name} price={item.price} text={item.text} brand={item.brand} />
                        ))
                    )}
                    <div className={classes.total}>
                        合計：￥{initailtotal}
                    </div>
                </List>
            </div>
        </section>
    )
}

export default CartList;
