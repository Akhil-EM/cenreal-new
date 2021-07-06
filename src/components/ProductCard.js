import React, { Component } from 'react'
import { AiOutlineShoppingCart,AiOutlineHeart} from 'react-icons/ai';
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
            <div className='product-card' >
                    <div className='text-start' >
                       <button className='heart-btn' style={{backgroundColor:this.props.IsWishListed?'red':''}}>
                           <AiOutlineHeart/>
                       </button>
                    </div>
                    <img onClick={(()=>this.navigateTo('product-detail/'+this.props.alt))}
                         style={{margin:'auto',width:'50%',cursor:'pointer'}}
                         src={imageUrlBase+this.props.imgurl}
                         alt={this.props.urlKey}/>
                    <p onClick={(()=>this.navigateTo('product-detail/'+this.props.alt))} 
                       style={{cursor:'pointer',height:'50px'}}
                       >{name}</p>
                    {
                        this.props.specialPrice==0?
                        <h5 style={{textDecoration:'none'}}>Rs.{this.props.price}</h5>:
                        <div className='d-flex justify-content-around'>
                           <h5 style={{textDecoration:'none'}}>Rs.{this.props.specialPrice}</h5>
                           <h5 style={{color:'rgb(151, 151, 151)',
                                        textDecoration:'line-through'}}>Rs {this.props.price}</h5>
                        </div>

                    }
                    
                    {
                       this.props.stockAvailability!=="Out of Stock"?
                       <button className='product-card-btn'><AiOutlineShoppingCart/>Add</button>
                      :<div className='product-card-btn'>Out of Stock</div>
                    }

                    
            </div>
        )
    }
}


export default withRouter(ProductCard);