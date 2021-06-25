import React, { Component } from 'react'
import '../assets/css/animate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { imageUrlBase } from '../config';
import {AiOutlineClose } from 'react-icons/ai';
import HeaderApi from '../api/HeaderApi';

export default class CartItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            cartList:[]
        }
    }
    
    render() {
        return (
            <div>
                {
                this.state.cartList.map((item,key)=>(
                     <div key={key} className='cart-item d-flex justify-content-around'>
                         <img src={imageUrlBase+item.imageUrl} alt='image' width={60}/>
                         <div className='name-and-count'>
                        <h6>{item.prName}</h6>
                        <p style={{color:'rgba(0, 0, 0, 0.295)'}}>{item.qty} <AiOutlineClose style={{marginBottom:'5px'}}/> Rs {item.unitPrice}</p>
                         </div>
                        <div className='quantity-update'>
                            <button onClick={()=>this.cartItemQuantityAdd(item.cartItemsId)}>+</button>
                            <p>{item.qty}</p>
                            <button onClick={()=>this.cartItemQuantitySub(item.cartItemsId)}>-</button>
                        </div>
                       <div className=' d-flex justify-content-around'>
                            <h6 style={{marginLeft:'15px'}}>Rs {item.qty *item.unitPrice}</h6>
                            
                         </div>
                        <AiOutlineClose style={{marginLeft:'25px',fontSize:'1.5em'}} onClick={()=>this.cartItemRemove(item.cartItemsId)}/>
                    </div>
                ))
             }
            </div>
        )
    }

    componentWillMount(){
        this.getList();
    }

    cartItemRemove(_cartItemID){
      HeaderApi.removeCartItemGET(_cartItemID)
             .then(()=>{
                this.getList();;
             }).catch((error)=>{
                 console.log(error);
             })
    }

    cartItemQuantityAdd(_cartItemID){
       HeaderApi.ADDCartItemQuantityGET(_cartItemID)
            .then(()=>{
                this.getList();
            }).catch((error)=>{
                console.log(error)
            })

    }

    cartItemQuantitySub(_cartItemID){
        HeaderApi.SUBCartItemQuantityGET(_cartItemID)
                .then(()=>{
                    this.getList();
                }).catch((error)=>{
                    alert(error.response.data.Message);
                });
    }

    getList(){
        HeaderApi.cartListGET()
                    .then((response)=>{
                        if((response.data.Data.cartList).length>0){
                              this.setState({cartList:response.data.Data.cartList})       
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
    }
}
