import React from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 


import {imageUrlBase} from '../config'
export default function CategoryCard(props) {
    ///console.log(props)
    var itemList=props.list;
    var owlOptions=props.owlOps
    //console.log(itemList)
    
    return (
        <OwlCarousel  className={`owl-theme `} {...owlOptions}>
             {
                 itemList.map((item,key)=>(
                   <div className='category-card item' key={key}>
                        <img width={150} height={150} src={imageUrlBase+item.imageUrl} alt={item.alt} />
                        <br/>
                        <a href='#'>{item.catName}</a>
                   </div>
                  ))
             }
        </OwlCarousel>
       
    )
}
