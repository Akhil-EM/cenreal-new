import React,{Component} from 'react'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from './Badge';
import SearchItemLoader from './SearchItemLoader'
import { AiOutlineHeart,AiOutlineClose } from 'react-icons/ai';
import {FiShoppingBag} from 'react-icons/fi'
import {FaRegUser} from 'react-icons/fa';
import {FcMenu} from 'react-icons/fc';
import {BiCurrentLocation} from 'react-icons/bi';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import LoginWithOtp from './LoginWithOtp';
import HeaderApi from '../api/HeaderApi';

import Radium, {StyleRoot} from 'radium';
import {slideInRight,slideOutRight } from 'react-animations';
import { withRouter} from "react-router-dom";
import '../assets/css/header.css';
import '../assets/css/animate.css'

import CartItem from './CartItem';

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
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
             searchProducts:[],
             cartList:[],
             wishList:[],
             deliveryList:[],
             searchBoxDisplay:'none',
             searchLoadDisplay:'none',
             searchTerm:'',
             show:false,
             showDeliveryLocationBox:false,
             DellistDisplay:'none',
             loginBtnDisp:'',
             userNameDisp:'none',
             userName:'',
             currentDeliveryLocation:'',
             minCartStyle:{display:'none'},
             minCartDisplayed:false,
             cartSubTotal:0,
             cartSummery:[]
             
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.preSettings=this.preSettings.bind(this);
        
    }

    navigateTo(_navigateTo){
        if((window.location.href).search('cart')>0){
            //closes mini cart on cart page
            this.EndAnimation();
        }else{
            this.props.history.push(`/${_navigateTo}`);
        }
         
          
    }
    componentWillMount(){
        this.preSettings();
       
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
                                  zIndex:'600',
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
                                  zIndex:'600',
                                  boxShadow: '-7px 3px 15px 0px rgba(0, 0, 0, 0.295)',
                                  animation: 'x 1s',
                                  animationName: Radium.keyframes(slideOutRight, 'left')}});
        setTimeout((()=>{ this.setState({minCartStyle:{display:'none'},minCartDisplayed:false}) }),1000);
        
    }

    
    
    preSettings=()=>{
        let custDetails=JSON.parse(localStorage.getItem('custInfo'));
        
        if(custDetails !=null){
          localStorage.setItem('gustId','null')
          this.setState({userName:custDetails.custName,loginBtnDisp:'none'})
         
        }

        HeaderApi.cartListGET()
                 .then((response)=>{
                    
                     if((response.data.Data.cartList).length>0){
                        this.setState({cartList:response.data.Data.cartList,
                                       subTotal:response.data.Data.cartList[0].subTotal})
                     }
                    
                 }).catch((error)=>{
                     console.log(error)
                 })
        
        HeaderApi.WishListGET()
                 .then((response)=>{
                      this.setState({wishList:response.data.Data})
                 }).catch((error)=>{
                     console.log(error)
                 })

        HeaderApi.deliveryLocationsGET('')
                 .then((response)=>{
                    
                     this.setState({deliveryList:response.data.Data})
                 }).catch((error)=>{
                     console.log(error)
                 });

        HeaderApi.cartSummeryGET()
                 .then((response)=>{
                    
                    this.setState({cartSummery:response.data.Data,subTotal:response.data.Data.subTotal})
                 }).catch((error)=>{
                     console.log(error.response)
                 })
    }
    handleDeliveryLocationBoxClose=()=>{
        this.setState({showDeliveryLocationBox:false})}
    handleDeliveryLocationBoxShow=()=>{
       
        this.setState({showDeliveryLocationBox:true});
    }
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    handleChange=(event)=>{
        this.setState({searchTerm: event.target.value});
        console.log(this.state.searchTerm);
        this.searchProduct();
    } 

    handleDelListShow=()=>{
        if(this.state.DellistDisplay==='none') this.setState({DellistDisplay:''});
        if(this.state.DellistDisplay==='') this.setState({DellistDisplay:'none'});
    }
    
    ShowFavorite=()=>{
        let custId=localStorage.getItem('custId')
        if(custId == null){
            this.handleShow();
        }else{
            console.log('continue here ')
        }
    }
    
    changeDeliveryLocation(_location){
       
        this.setState({currentDeliveryLocation:_location,DellistDisplay:'none'})
    }
   
    searchProduct=()=>{
    
      var _term=this.state.searchTerm;
      this.setState({searchLoadDisplay:''});
      HeaderApi.searchAutoCompleteGET(_term)
                .then((response)=>{
                   this.setState({searchBoxDisplay:'',searchLoadDisplay:'none',searchProducts:response.data.Data});

                }).catch((err)=>{
                    this.setState({searchLoadDisplay:'none'});
                    console.log(err)
                })   

    }
    closeSearch=()=>{
        this.setState({searchBoxDisplay:'none',searchTerm:''})
    }
    deliveryLocationCheck=()=>{
        if(this.state.currentDeliveryLocation=='') return alert('select delivery location')
        this.handleDeliveryLocationBoxClose()
    }


    
    render() {
        let cartList=this.state.cartList;
        let wishList=this.state.wishList;
        let deliveryList=this.state.deliveryList;
        let logoUrl=process.env.PUBLIC_URL+'/img/Centreal_Bazaar.png';
        let subTot=this.state.subTotal;
        return (
             <div>

             
             <div className='app-base-bg p-2  d-flex justify-content-between'>
                <div className='d-flex '>
                   <img src={logoUrl} alt='logo' height={50}/>
                    <div className='d-none d-lg-block'>
                        <form className='search-container '>
                          <input  onKeyUp={this.searchProduct} onChange={this.handleChange} className="search-input" value={this.state.searchTerm} type="text" placeholder="Search Inside 15,000 products....."/>
                          <button className="search-icon" onClick={this.closeSearch}><AiOutlineClose style={{fontSize:'1.5em'}}/></button>
                          <button className="search-btn" type="submit">Search</button>
                        </form> 
                        <SearchItemLoader searchBoxDisp={this.state.searchBoxDisplay} searchLoadDisp={this.state.searchLoadDisplay} searchList={this.state.searchProducts}/>
                    </div>
                </div>
                <div className='d-flex align-items-center margin  justify-content-between width-250px'>
                    <div onClick={this.ShowFavorite}>
                       <Badge count={wishList.length} ><AiOutlineHeart className="icon "/></Badge>
                    </div>
                    
                    <div  onClick={this.StartAnimation}>
                      <Badge count={cartList.length} ><FiShoppingBag className="icon"/></Badge>
                    </div>
                    <button className="icon-btn text-light"><FaRegUser /></button>
                    <button className="icon-btn text-light" style={{display:this.state.loginBtnDisp}}><h5 className="mt-3" onClick={this.handleShow}>Login</h5></button>
                    <button className="icon-btn text-light " style={{fontSize:'1em',whiteSpace:'nowrap'}}>{this.state.userName}</button>
                </div>
               

                <Modal show={this.state.show} onHide={this.handleClose}
                        size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                           <AiOutlineClose onClick={this.handleClose} style={{fontSize:'1.5em',
                                                                            position:'absolute',
                                                                            right:0,
                                                                            margin:'10px'}}/>
                                                                            <br/>
                    <Modal.Body>
                    <div className="container">
                    <div className="row">
                        <div className="col-sm d-none d-lg-block ">
                            <img width={380}  src={process.env.PUBLIC_URL+'/img/sign-up-image.jpg'} />
                        </div>
                        <div className="col-sm">
                            <Login closeFn={this.handleClose} preSett={this.preSettings}/>
                            {/* <ForgotPassword /> */}
                            {/* <LoginWithOtp /> */}
                            
                        </div>
                        
                    </div>
                    </div>
                    
                    </Modal.Body>
                    
                </Modal>
                {/* <StyleRoot className="test" style={styles.bounce}><MiniCart/></StyleRoot> */}
                
             </div>
             <div className='under-nav justify-content-between p-l-5'>
                 <div className='d-flex '>
                   <button className='menu-btn'><FcMenu/></button>
                  
                 </div>
                 <div>
                   <button className='menu-btn' onClick={this.handleDeliveryLocationBoxShow}><span style={{fontSize:'.6em',color:'black'}}>Choose Delivery location</span><BiCurrentLocation/></button>
                 </div>
             </div>
             <Modal show={this.state.showDeliveryLocationBox} onHide={this.handleDeliveryLocationBoxClose}
                        size="md"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                           <AiOutlineClose onClick={this.handleDeliveryLocationBoxClose} style={{fontSize:'1.5em',
                                                                            position:'absolute',
                                                                            right:0,
                                                                            margin:'10px'}}/>
                                                                            <br/>
                    <Modal.Body>
                        <br/>
                    <div className="container">
                         <input value={this.state.currentDeliveryLocation} style={{width:'100%'}} onFocus={this.handleDelListShow}/>
                         <div style={{width:'100%',display:this.state.DellistDisplay}} >
                             {
                                 deliveryList.map((item,key)=>(
                                    <div key={key} className='delivery-list' onClick={() => this.changeDeliveryLocation(item.area)}>
                                       <p>{item.area}</p>
                                   </div>
                                  ))
                             }
                         </div>
                         <br/>
                         <br/>
                         <div className='d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={this.deliveryLocationCheck}>Submit</button>
                            <a href='#'>Available locations</a>
                         </div>
                         
                    </div>
                    
                    </Modal.Body>
                    
                </Modal>
                <StyleRoot >
                  <div  style={this.state.minCartStyle}>
                  <div className='header d-flex justify-content-between'>
                        <div className='d-flex'>
                        <h4>MY CART</h4>
                        <h4 style={styles.cartCount}>{cartList.length}</h4>
                        </div>
                        <div>
                            <AiOutlineClose style={{fontSize:'2em'}} onClick={this.EndAnimation}/>
                        </div>
                        </div>
                        <div className='p-3 ' style={{height:'500px',overflowY:'scroll'}}>
                         {/* {
                             cartList.map((item,key)=>(
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
                         } */}
                         <CartItem ItemsArr={cartList}/>
                        
                        </div>
                        <div className='bottom-buttons '>
                            <h4 style={{textAlign:'right',padding:'25px'}}>Sub Total  Rs.{subTot}</h4>
                            <div className='d-flex justify-content-around'>
                            <button className='btn btn-primary w-25' onClick={()=>this.navigateTo('cart')}>View Cart</button>
                            <button className='btn btn-danger w-25'>Checkout</button>
                        </div>
                            
                        </div>
                  </div>
                </StyleRoot>
                
            </div>

        )
    }
}

export default  withRouter(Header); //important to withRouter