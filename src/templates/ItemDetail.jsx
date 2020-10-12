import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {db} from '../firebase/index'
import { makeStyles } from '@material-ui/styles'
// import HTMLReactParser from 'html-react-parser'
import {PrimaryButton, WhiteButton} from '../components/UIkit/index'
import {Items, SideItems} from '../components/Items/index'
import {getNewItems} from '../reducks/items/selectors'
import { fetchItems, addItemToCart, addFavoriteItem } from '../reducks/items/operations';
import { useCallback } from 'react'
import StarIcon from '@material-ui/icons/Star';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles((theme) => ({
    image: {
        marginRight: '50px'
    },
    item_detail: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    text: {
        fontWeight: 'bold'
    },
    name: {
        marginTop: 0,
    },
    brand: {
        fontSize: '25px'    },
    size: {
        fontSize: '25px'
    },
    size_btn: {
        display: 'inlineBlock',
        backgroundColor: '#fff',
        padding: '3px 30px',
        margin: '0 10px',
        borderRadius: '5px',
        fontSize: '20px'
    },
    price: {
        fontSize: '30px'
    },
    btn_container: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '0 auto',
            position: 'relative'
        }
    },
    btn: {
        margin: '1rem',
        minWidth: '170px'
    },
    star: {
        fontSize: '35px',
        color: '#ccc',
        marginRight: '10px'
    }
}))

// const target = document.querySelector('.detail-container')
// const options = {
//     root: null,  // ルートとして指定するDOM（無ければviewport）
//     rootMargin: "-50% 0px",  // 上下100px、左右20px手前で発火
//     threshold: 0  // 交差領域が50%変化するたびに発火
// };
// /// 初期化
// const observer = new IntersectionObserver(doWhenIntersect, options);

// target.forEach(container => {
//     observer.observe(container);  // 監視の開始
// });

// function doWhenIntersect(entries) {  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         activateIndex(entry.target);
//       }
//     });
// }
// function activateIndex(element) {
//     // すでにアクティブになっている目次を選択
//     const currentActiveIndex = document.querySelector("#indexList .active");
//     // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
//     if (currentActiveIndex !== null) {
//       currentActiveIndex.classList.remove("active");
//     }
//     // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
//     const newActiveIndex = document.querySelector(`a[href='#${element.id}']`);
//     newActiveIndex.classList.add("active");
//   }


const ItemDetail = () => {
    const classes = useStyles()
    const selector = useSelector((state) => state)
    const path = selector.router.location.pathname
    const id = path.split('/item/')[1]
    const urlId = Number(id) // 文字列を数値に変える
    const newItems = getNewItems(selector)
    const dispatch = useDispatch();

    const [item, setItem] = useState(null)
    const [text, setText] = useState(false)

    const textAccordionHandler = useCallback(() => {
        setText(!text)
    }, [setText, text])

    useEffect(() => {
        dispatch(fetchItems())
    }, [])
    
    useEffect(() => {
       db.collection('items').doc('items').get().then((snapshots) => {
            const data = snapshots.data() // {item: [{},{},{}...]}
            const list = data.item  // [{}, {}, {}...]
            const matchItem = list.find((value) => {
                return value.id === urlId;
            })
            setItem(matchItem)
        })
    }, [item])

    const addItemsC= useCallback(() => {
        dispatch(addItemToCart({
            name: item.name,
            category: item.category,
            id: item.id,
            price: item.price,
            text: item.text,
            brand: item.brand
        }))
    }, [item])

    const addItemsF = useCallback(() => {
        dispatch(addFavoriteItem({
            name: item.name,
            category: item.category,
            id: item.id,
            price: item.price,
            text: item.text,
            barnd: item.brand
        }))
    }, [item])
    // console.log(item);

    return (
        <section className='c-section item_detail_wrap'>
            <div className='inner'>
                <div className='detail-container'>
                    {item && (
                        <div className={classes.item_detail}>
                            <div className={classes.image}><img src={`/static/images/cards/${id}.png`} alt=""/></div>
                            <div className={classes.text}>
                                <h1 className={classes.name}>{item.name}</h1>
                                <p className={classes.brand}>BRAND: {item.brand}</p>
                                <p className={classes.size}>Size: <li className={classes.size_btn}>S</li> <li className={classes.size_btn}>M</li> <li className={classes.size_btn}>L</li> </p>
                                <p className={classes.price}>￥{item.price}</p>
                                <div className={classes.btn_container}>
                                    {/* <div className='module_spacer_ss'></div> */}
                                    {/* <ShoppingCartIcon /> */}
                                    <div className={classes.btn}>
                                        <PrimaryButton label='カートに追加する' onClick={addItemsC} />
                                    </div>
                                    <div className='module_spacer_ss'></div>
                                    <div className={classes.btn} >
                                        <WhiteButton label='お気に入りに入れる' onClick={addItemsF}/>
                                    </div>
                                </div>
                                <h4 onClick={() => textAccordionHandler()}><p className='triangle'>▼</p> 商品の説明を見る</h4>
                                <p>{text ? (item.text) : ('')}</p>
                            </div>
                        </div>
                    )}

                </div>
                <div className='review'>
                    <h2>レビューをする</h2>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                </div>
                <div className='pick-up_items'>
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

export default ItemDetail;