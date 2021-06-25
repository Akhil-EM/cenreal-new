import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {imageUrlBase,frontEndUrl} from '../config';
import '../assets/css/style.css'
export default function ProductCard(props) {
    // console.log(props)
    let name=props.name;
    name=name.slice(0,20)
    return (
        <div className='product-card'>
             <a href={`${frontEndUrl+'/Product-detail/'+props.alt}`}>
                <img style={{margin:'auto',width:'50%'}} src={imageUrlBase+props.imgurl} alt={props.urlKey}/>
                <p>{name}</p>
                <h5 style={{textDecoration:'none'}}>Rs.{props.price}</h5>
                <button><AiOutlineShoppingCart/> Add</button>
             </a>
            
        </div>
    )

    function navigate(){
       
    }
}
