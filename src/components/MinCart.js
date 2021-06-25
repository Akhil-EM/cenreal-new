import React, { Component } from 'react'
import {slideInRight,slideOutRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {AiOutlineClose} from 'react-icons/ai';
import '../assets/css/animate.css'

const styles={
    cartCount:{
        backgroundColor:'#fff',
        color:'black',
        padding:'0',
        width:'35px',
        height:'35px',
        textAlign:'center',
        borderRadius:'50%',
        marginLeft:'15px' 
    }
}

export default class MinCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minCartStyle:{
                display:'none'},
            minCartDisplayed:false,
        }
    }
    
    StartAnimation=()=>{
        this.setState({minCartStyle:{backgroundColor:'#fff',
                                  height:'100vh',
                                  width:'60%',
                                  position:'absolute',
                                  right:0,
                                  top:0,
                                  boxShadow: '-7px 3px 15px 0px rgba(0, 0, 0, 0.295)',
                                  display:'',
                                  animation: 'x 1s',
                                  animationName: Radium.keyframes(slideInRight, 'right')},
                        minCartDisplayed:true});
       
    }

    EndAnimation=()=>{
        if(this.state.minCartDisplayed==false) return;
        this.setState({minCartStyle:{backgroundColor:'#fff',
                                  height:'100vh',
                                  width:'60%',
                                  position:'absolute',
                                  right:0,
                                  top:0,
                                  boxShadow: '-7px 3px 15px 0px rgba(0, 0, 0, 0.295)',
                                  animation: 'x 1s',
                                  animationName: Radium.keyframes(slideOutRight, 'left')}});
        setTimeout((()=>{ this.setState({minCartStyle:{display:'none'},minCartDisplayed:false}) }),1000);
        
    }
    
    render() {
        let logoUrl=process.env.PUBLIC_URL+'/img/logo.svg';
        return (
                <StyleRoot >
                    <div  style={this.state.MinCart}>
                        <div className='header d-flex justify-content-between'>
                        <div className='d-flex'>
                        <h4>MY CART</h4>
                        <h4 style={styles.cartCount}>2</h4>
                        </div>
                        <div>
                            <AiOutlineClose style={{fontSize:'2em'}} onClick={this.EndAnimation}/>
                        </div>
                        </div>
                        <div className='p-3'>
                        <div className='cart-item d-flex justify-content-around'>
                            <img src={logoUrl} alt='image' width={60}/>
                            <div className='name-and-count'>
                            <h6>Om Shanthi Jasmine Pure Puja Oil 500ml</h6>
                            <p style={{color:'rgba(0, 0, 0, 0.295)'}}>2 <AiOutlineClose style={{marginBottom:'5px'}}/> Rs 124.00</p>
                            </div>
                            <div className='quantity-update'>
                                <button>+</button>
                                <p>0</p>
                                <button>-</button>
                            </div>
                            <div className=' d-flex justify-content-around'>
                                <h6 style={{marginLeft:'15px'}}>Rs 520.00</h6>
                                
                            </div>
                            <AiOutlineClose style={{marginLeft:'25px',fontSize:'1.5em'}}/>
                        </div>
                        </div>
                        <div className='bottom-buttons '>
                            <h4 style={{textAlign:'right',padding:'25px'}}>Sub Total  Rs.520.00</h4>
                            <div className='d-flex justify-content-around'>
                            <button className='btn btn-primary w-25'>View Cart</button>
                            <button className='btn btn-danger w-25'>Checkout</button>
                            </div>
                            
                        </div>
                    </div>
                </StyleRoot>
        )
    }
}
