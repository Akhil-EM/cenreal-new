import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {imageUrlBase} from '../config';
import { withRouter} from "react-router-dom";

class CategoryCard extends Component {

    navigateTo(_navigateTo,_catId,_catName,_parentId,_categoryUrlKey){
        this.props.history.push(`/${_navigateTo}`,{from:'category-card',categoryName:_catName,categoryId:_catId,parentId:_parentId,categoryUrlKey:_categoryUrlKey});      
    }

    render() {
        var itemList=this.props.list;
        var owlOptions=this.props.owlOps;
        return (
            <OwlCarousel  className={`owl-theme `} {...owlOptions}>
              {
                 itemList.map((item,key)=>(
                   <div className='category-card item' key={key} onClick={()=>this.navigateTo(`products/${item.catUrlKey}`,item.catId,item.catName,item.parentId,item.catUrlKey)}>
                        <img width={150} height={150} src={imageUrlBase+item.imageUrl} alt={item.alt} />
                        <br/>
                        <p>{item.catName}</p>
                   </div>
                  ))
             }
        </OwlCarousel>
        )
    }
}


export  default  withRouter(CategoryCard);