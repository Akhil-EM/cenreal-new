import React from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import {imageUrlBase} from '../config'

function CarouselMain(props) {
      var itemList=props.itemArray;
      var styleClass=props.resStyles;
      //console.log(itemList)
    return (
        <OwlCarousel  className={`owl-theme ${styleClass}`} center nav items={1} dots={false}>
             {
                 itemList.map((item,key)=>(
                    <div key={key} className='item'>
                       <img src={imageUrlBase+item.imageUrl} alt={item.urlKey} ></img>
                   </div>
                  ))
             }
        </OwlCarousel>
    ) 
}

export default CarouselMain;



