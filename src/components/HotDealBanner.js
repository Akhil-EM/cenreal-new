import React from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 

import ProductCard from './ProductCard';
export default function HotDealBanner(props) {
    //console.log(props)
    var itemList=props.list;
    var owlOptions=props.owlOps;
    // console.log(itemList)

    return (
        <OwlCarousel  className={`owl-theme `} {...owlOptions}>
             {
                 itemList.map((item,key)=>(
                    <ProductCard className='item'  price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                  ))
             }
        </OwlCarousel>
       
    )
}

