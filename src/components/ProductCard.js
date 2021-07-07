import React, { Component } from 'react'
import { AiOutlineShoppingCart,AiOutlineHeart} from 'react-icons/ai';
import {imageUrlBase} from '../config';
import '../assets/css/style.css';
import { withRouter} from "react-router-dom";
import ProductCardApi from '../api/ProductCardApi';
var productValues;
class ProductCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            CartItemQty:0,
            from:'',
            urlKey:'',
            imageUrl:'',
            specialPrice:0,
            unitPrice:0,
            IsCarted:false,
            stockAvailability:'',
            name:''

        }  
        productValues=JSON.parse(this.props.value);     
    }

    componentWillMount(){
        this.getInitData();
    }
    getInitData(){
        this.setState({CartItemQty:productValues.CartItemQty,
                        IsWishlisted:productValues.IsWishlisted,
                        urlKey:productValues.urlKey,
                        imageUrl:productValues.imageUrl,
                        specialPrice:productValues.specialPrice,
                        unitPrice:productValues.unitPrice,
                        IsCarted:productValues.IsCarted,
                        stockAvailability:productValues.stockAvailability,
                        name:productValues.prName});
    }
    
    navigateTo(_navigateTo){
            this.props.history.push(`/${_navigateTo}`);         
            window.location.reload();
    }
    addQuantity=()=>{
         ProductCardApi.addProductQuantityPOST(this.state.urlKey)
                       .then(((response)=>{
                          this.setState({CartItemQty:this.state.CartItemQty+1})
                          alert('cart item quantity increased')
                       })).catch((error)=>{
                           alert(error.response.data.Message);
                       })
    }

    subQuantity=(_urlKey)=>{
          ProductCardApi.subProductQuantityPOST(this.state.urlKey)
                        .then(((response)=>{
                            this.setState({CartItemQty:this.state.CartItemQty-1})
                            alert('cart item quantity decreased')
                        })).catch((error)=>{
                            alert(error.response.data.Message);
                        })
     }

    addToCart=()=>{
        ProductCardApi.addToCartPOST(this.state.urlKey)
                        .then((()=>{
                            this.setState({IsCarted:true,
                                           CartItemQty:1});
                        })).catch((error)=>{
                            alert(error.response.data.Message);
                        })
    }

    WishList=()=>{
       
            ProductCardApi.removeFromWishList(this.state.urlKey)
                      .then((()=>{
                             this.props.parentFunction();
                             window.location.reload();
                       })).catch((error)=>{
                            alert(error.response.data.Message);
                       });
        
        
    }
    render() {
        return (
            <div className='product-card' >
                    <div className='text-start' >
                       <button className='heart-btn' 
                               onClick={this.WishList}
                               style={{backgroundColor:this.props.from=='whish'?'red':''}}>
                           <AiOutlineHeart/>
                       </button>
                    </div>
                    <img onClick={(()=>this.navigateTo('product-detail/'+this.state.urlKey))}
                         style={{margin:'auto',width:'50%',cursor:'pointer'}}
                         src={imageUrlBase+this.state.imageUrl}
                         alt={this.state.urlKey}/>
                    <p onClick={(()=>this.navigateTo('product-detail/'+this.state.urlKey))} 
                       style={{cursor:'pointer',height:'50px'}}>{(this.state.name).slice(0,20)}</p>

                        {
                            this.state.specialPrice==0?
                            <h5 style={{textDecoration:'none'}}>Rs.{this.state.unitPrice}</h5>:
                            <div className='d-flex justify-content-around'>
                            <h5 style={{textDecoration:'none'}}>Rs.{this.state.specialPrice}</h5>
                            <h5 style={{color:'rgb(151, 151, 151)',
                                            textDecoration:'line-through'}}>Rs {this.state.unitPrice}</h5>
                            </div>

                        }
                        <div >
                        {
                            this.state.IsCarted?
                            <div className='button-set'>
                                <button className='btn-first'
                                        onClick={()=>this.addQuantity('jdjjd')}>+</button>
                                <p>{this.state.CartItemQty}</p>
                                <button className='btn-second'
                                        onClick={()=>this.subQuantity('jdjjd')}>-</button>
                            </div>:
                            this.state.stockAvailability!=="Out of Stock"?
                            <button className='product-card-btn'
                                    onClick={this.addToCart}><AiOutlineShoppingCart/>Add</button>
                        :<div className='product-card-btn'>Out of Stock</div>

                        }
                    </div>     
            </div>
        )
    }
}


export default withRouter(ProductCard);