import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/img/banner1.png'
import banner2 from '../../assets/img/banner2.png'
import banner3 from '../../assets/img/banner3.png'

const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    color: 'black'
    // margin: '0 auto'
};

const SimpleSlider = () => {
    return (
        <div>
            <Slider {...settings}>
                <div className='slider_img_list'><img src={`/static/images/cards/banner1.png`} width='100%' /></div>
                <div className='slider_img_list'><img src={`/static/images/cards/banner2.png`} width='100%' /></div>
                <div className='slider_img_list'><img src={`/static/images/cards/banner3.png`} width='100%' /></div>
            </Slider>
            {/* <Slider {...settings} >
                <ul className='top-slider inner'>
                    <li><img src={`/static/images/cards/banner1.png`}/></li>
                    <li><img src={`/static/images/cards/banner2.png`}/></li>
                    <li><img src={`/static/images/cards/banner3.png`}/></li>
                </ul>
            </Slider> */}
        </div>
    );
}

export default SimpleSlider