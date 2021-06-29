// import React from 'react'
// import OwlCarousel from 'react-owl-carousel';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css'; 


// import {imageUrlBase} from '../config'
// export default function CategoryCard(props) {
//     ///console.log(props)
//     var itemList=props.list;
//     var owlOptions=props.owlOps
//     //console.log(itemList)
    
//     return (
//         console.log()
//         <OwlCarousel  className={`owl-theme `} {...owlOptions}>
//              {
//                  itemList.map((item,key)=>(
//                    <div className='category-card item' key={key} onClick={()=>navigateTo(`products/${item.urlKey}`)}>
//                         <img width={150} height={150} src={imageUrlBase+item.imageUrl} alt={item.alt} />
//                         <br/>
//                         <a href='#'>{item.catName}</a>
//                         {item.urlKey}
//                    </div>
//                   ))
//              }
//         </OwlCarousel>
       
//     )
// }

// function 

import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {imageUrlBase} from '../config';
import { withRouter} from "react-router-dom";

class CategoryCard extends Component {
    constructor(props) {
        super(props)
    }

    navigateTo(_navigateTo){
        this.props.history.push(`/${_navigateTo}`);      
    }

    render() {
        var itemList=this.props.list;
        var owlOptions=this.props.owlOps;
        return (
            <OwlCarousel  className={`owl-theme `} {...owlOptions}>
              {
                 itemList.map((item,key)=>(
                   <div className='category-card item' key={key} onClick={()=>this.navigateTo(`products/${item.catUrlKey}`)}>
                        <img width={150} height={150} src={imageUrlBase+item.imageUrl} alt={item.alt} />
                        <br/>
                        <a href='#'>{item.catName}</a>
                   </div>
                  ))
             }
        </OwlCarousel>
        )
    }
}


export  default  withRouter(CategoryCard);