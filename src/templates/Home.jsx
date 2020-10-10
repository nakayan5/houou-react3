import React, {useEffect} from 'react'
import {Items} from '../components/Items/index'
import SimpleSlider from '../components/UIkit/SimpleSlider'
import SimpleSwiper from '../components/UIkit/SimpleSwiper'
import { useDispatch, useSelector } from 'react-redux'
import {getNewItems, getMenItems, getWomanItems} from '../reducks/items/selectors'
import { fetchItems } from '../reducks/items/operations';
import {BrandIntroduction} from './index'
import {WhiteButton} from '../components/UIkit/index'
import { push } from 'connected-react-router'


const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const newItems = getNewItems(selector)   
    const menItems = getMenItems(selector)
    const womanItems = getWomanItems(selector)

    // console.log(newItems);


    useEffect(() => {
        dispatch(fetchItems())
    }, [newItems])

    return (
        <div className='contents'>
            <div className='top-slider-wrap'>
                <SimpleSlider/>
                {/* <SimpleSwiper/> */}
            </div>
            <div className='inner'>
                <section className='c-section'>
                    <h2>NEW</h2>
                    <div className="items-container">
                        <ul>
                            {newItems.length > 0 && (
                                newItems.map(item => (
                                    <Items
                                        name={item.name} key={item.id} price={item.price} text={item.text}
                                        id={item.id} category={item.category} 
                                    />
                                ))
                            )}
                        </ul>
                    </div>
                </section>
                <section className='c-section items-container'>
                    <h2>MEN</h2>
                    <div className="items-container">
                        {menItems.length > 0 && (
                            menItems.map(item => (
                                <Items
                                    name={item.name} key={item.id} price={item.price} text={item.text}
                                    id={item.id} category={item.category} 
                                />
                            ))
                        )}
                    </div>
                    <div className='btn-more'>
                        <WhiteButton
                            label='▸ もっと見る' onClick={() => dispatch(push('/search/?gender=men'))}
                        />
                    </div>
                </section>
                <section className='c-section items-container'>
                    <h2>WOMAN</h2>
                    <div className="items-container">
                        {womanItems.length > 0 && (
                            womanItems.map(item => (
                                <Items
                                    name={item.name} key={item.id} price={item.price} text={item.text}
                                    id={item.id} category={item.category} 
                                />
                            ))
                        )}
                    </div>
                    <div className='btn-more'>
                        <WhiteButton
                            label='▸ もっと見る' onClick={() => dispatch(push('/search/?gender=woman'))}
                        />
                    </div>
                </section>
            </div>
            <section className='c-section brand-container'> 
                <div className='inner'>
                <h2>BRAND</h2>
                    <BrandIntroduction/>
                </div>
            </section>
            <div className='inner'>
                <section className='c-section items-container'>
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

    )
}

export default Home;