import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'react-id-swiper';

class SimpleSwiper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30,
        getSwiper: (swiper) => { /** ----- ここを追加 ----- */
            swiper.on('slideChange', () => {
              console.log(`slide changed : ${swiper.activeIndex}`);
            })
          }
      }
    }
  }

  render() {
    return(
      <Swiper {...this.state.params}>
        <div><img src={`/static/images/cards/1.png`} alt=""/></div>
        <div><img src={`/static/images/cards/2.png`} alt=""/></div>
      </Swiper>
    )
  };
}

export default SimpleSwiper