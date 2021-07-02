import React, { Component } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {imageUrlBase} from '../config';
import '../assets/css/style.css';
import { withRouter} from "react-router-dom";
class ProductCard extends Component {
    navigateTo(_navigateTo){
            this.props.history.push(`/${_navigateTo}`);         
            window.location.reload();
    }
    render() {
        let name=this.props.name;
        name=name.slice(0,20)
        return (
            <div className='product-card' onClick={(()=>this.navigateTo('product-detail/'+this.props.alt))}>
                    <img style={{margin:'auto',width:'50%'}} src={imageUrlBase+this.props.imgurl} alt={this.props.urlKey}/>
                    <p>{name}</p>
                    <h5 style={{textDecoration:'none'}}>Rs.{this.props.price}</h5>
                    <button><AiOutlineShoppingCart/> Add</button>
            </div>
        )
    }
}


export default withRouter(ProductCard);