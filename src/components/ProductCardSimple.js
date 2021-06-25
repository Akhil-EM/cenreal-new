import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {imageUrlBase,frontEndUrl} from '../config';
import '../assets/css/style.css'
export default function ProductCardSimple(props) {
    // console.log(props)
    let name=props.name;
    name=name.slice(0,20)
    return (
        <div className='product-card-simple'>
             <a href={`${frontEndUrl+'/Product-detail/'+props.alt}`}>
                <img style={{margin:'auto',width:'50%'}} src={imageUrlBase+props.imgurl} alt={props.urlKey}/>
                <p style={{textDecoration:'none'}}>{name}</p>
                <h5 style={{textDecoration:'none'}}>Rs.{props.price}</h5>
             </a>
            
        </div>
    )

    function navigate(){
       
    }
}
