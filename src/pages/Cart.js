import React, { Component } from 'react';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import {RiArrowDropRightLine,RiArrowRightCircleFill} from 'react-icons/ri';
import {AiFillQuestionCircle} from 'react-icons/ai'
import{RiArrowLeftCircleFill} from 'react-icons/ri'
import HeaderApi from '../api/HeaderApi';
import CartApi from '../api/CartApi';
import { imageUrlBase } from '../config';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import refundImg from '../assets/img/refund-icon.png'
import rupeeImg from '../assets/img/rupees-icon.png'
import deliveryImg from '../assets/img/quick-delivery-icon.png'
import {AiOutlineClose } from 'react-icons/ai';
import '../assets/css/cart.css';
import Helper from '../helper/Helper';
import { withRouter} from "react-router-dom";

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
             cartList:[],
             cartSummery:{},
             saveForLaterList:[],
             recentProductsList:[],
             couponList:[],
             OwlCarouselOptions: {
                loop:false,
                margin:0,
                nav: false,
                dots:false,
                center:false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 3,
                    },
                    1000: {
                        items: 5,
                    },
                },
                show:false,
             },
             selectedDivId:null,
             couponCode:'',
             couponId:null
        }

       //this.getPreData=this.getPreData.bind(this);
    }

    componentWillMount(){
       this.getPreData();
    }
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    getPreData(){
        HeaderApi.cartSummeryGET()
                 .then((response)=>{
                    this.setState({couponCode:response.data.Data.cpcode,cartSummery:response.data.Data,subTotal:response.data.Data.subTotal})
                 }).catch((error)=>{
                     console.log(error.response)
                 });

        HeaderApi.cartListGET()
                 .then((response)=>{ 
                        this.setState({cartList:response.data.Data.cartList})
                 }).catch((error)=>{
                     console.log(error)
                 })
       
        CartApi.saveForLaterListGET()
               .then((response)=>{ 
                   this.setState({saveForLaterList:response.data.Data})
                }).catch((error)=>{
                    console.log(error)
                });

        CartApi.recentProductsGET()
               .then((response)=>{
                   this.setState({recentProductsList:response.data.Data})
               }).catch((error)=>{
                   console.log(error)
               });
        CartApi.couponListGET()
                .then((response)=>{
                    
                    this.setState({couponList:response.data.Data})
                }).catch((error)=>{
                    console.log(error)
                });
    }
    
    selectCoupon=(_id,_couponCode,_couponId)=>{
        this.setState({selectedDivId:_id,couponCode:_couponCode,couponId:_couponId});
    }

    applyCoupon=()=>{
        if(this.state.couponId==null) return alert('select a coupon');

        CartApi.applyCouponPOST(this.state.couponCode)
               .then((response)=>{
                   alert(response.data.Data.Message);
                   this.getPreData();
               }).catch((error)=>{
                   console.log(error);
               })
    }
    deleteSaveForLater(_urlKey){
      console.log('delete',_urlKey);
    }

    movetoCart(_urlKey){
       CartApi.moveToCartPOST(_urlKey)
              .then(()=>{
                  this.getPreData();
              }).catch((error)=>{
                  console.log(error)
              })
    }

    navigateTo(_navigateTo){
       
            this.props.history.push(`/${_navigateTo}`);     
          
    }
    
    render() {
        var cartList=this.state.cartList;
        var cartSummery=this.state.cartSummery;
        var saveForLaterList=this.state.saveForLaterList;
        var recentProductList=this.state.recentProductsList;
        var couponList=this.state.couponList;
        return (
            <div>
                <Header/>
                <div className='anchor-nav d-none d-lg-block p-3'>
                    <a href=''>Home</a>
                    <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                    <a href=''>Cart</a>
                    <hr/>
                </div>
                <div className='container-fluid '>
                    <div className="row">
                        <div className="col-lg-8">
                          <h3>Shopping Cart ({cartList.length}) items</h3>
                          <CartItem />
                        </div>
                        <div className="col-lg-4 ">
                            <h3>Order Summary</h3>
                            <br/>
                            <div className='card p-4' >
                                <button className='btn btn-danger d-flex justify-content-around pl-4 pr-5'
                                        onClick={()=>this.navigateTo('checkout')}>
                                   <b>Proceed to Checkout</b>
                                <span style={{fontSize:'1.1em'}}><RiArrowRightCircleFill/></span>
                                </button>
                                <div className='d-flex justify-content-between mt-3'>
                                    <h4>Subtotal</h4>
                                    <h4>Rs.{cartSummery.subTotal}</h4>
                                </div>
                                <div className='d-flex justify-content-between mt-1'>
                                    <h4>Delivery Charges <span className='text-success'><AiFillQuestionCircle/></span></h4>
                                    <h4 className='text-success'>FREE</h4>
                                </div>
                                <hr/>
                                <h5>({cartList.length}) items in cart</h5>
                                <div className='d-flex justify-content-between mt-1'>
                                    <h3>TOTAL</h3>
                                    <h3 className='text-success'>Rs.{cartSummery.grandTotal}</h3>
                                </div>
                                {
                                    cartSummery.couponAmount == 0?'':
                                    <div className='bg-warning d-flex justify-content-around text-success'>
                                        <p>You saved !</p>
                                        <p>Rs {cartSummery.couponAmount}</p>                                    
                                     </div>

                                }
                               
                                
                            </div>
                            <div className='d-flex justify-content-between mt-4 text-success'>
                                    <p>Rs 0</p>
                                    <p className='text-success'>Rs 600</p>
                            </div>
                            <div style={{width:'100%',
                                         height:'5px',
                                         backgroundColor:'green',
                                         borderRadius:'2px' }}></div>
                            <div className='text-center text-success mt-1 mb-1'>FREE DELIVERY available for purchase above <span className="text-danger">Rs 600</span></div>
                            <h3>Apply Promo Code</h3>
                            <div className='text-center'>
                                 <div className='mt-4 p-4' style={{backgroundColor:'rgba(179, 179, 179, 0.418)'}}>
                                    <div className="input-group mb-2">
                                        <input type="text"
                                               className="form-control text-center" 
                                               placeholder="Enter voucher code"
                                               value={this.state.couponCode} />
                                        <div className="input-group-prepend">
                                          {/* <div className="input-group-text p-3">Apply</div> */}
                                          <button className='btn' >Apply</button>
                                        </div>
                                    </div>
                                    <div className='bg-warning p-3 mt-4 text-dark'>
                                        <a onClick={this.handleShow}  style={{color:'black',
                                                                              textDecoration:'none',
                                                                              cursor:'pointer'}}>{couponList.length} promo code applicable</a>
                                    </div>
                                 </div>

                            </div>
                            <button className='btn btn-success mt-4 w-100'> <span ><RiArrowLeftCircleFill/></span>Continue Shopping</button>
                        </div>
                    </div>
                </div>
                <h4 className='text-center mt-3'>Why shop from Centreal Bazaar?</h4>
                <br/>
                <div className="container ">
                <div className="row">
                    <div className="col-md d-flex">
                    <img src={refundImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Easy returns & refunds<br/>
                                               Return products at doorstep and get refund in minutes.
                                               </h6>
                                               <br/>
                    </div>
                    <div className="col-md d-flex">
                    <img src={rupeeImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Best quality products<br/>
                                                Get best quality products at lowest price.</h6>
                                                <br/>
                    </div>
                    <div className="col-md d-flex">
                    <img src={deliveryImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Quick delivery<br/>
                                                Get products delivered to your doorsteps in no time.</h6>
                                                <br/>
                    </div>
                </div>
                </div>
                <hr className='mt-4 mb-4'/>
                {/* {
                    saveForLaterList.map(())
                } */}
                
                {
                  saveForLaterList.length<=0?'':
                  <div className='p-2'>
                    <h3 >Save for later ({saveForLaterList.length }items)</h3>
                    
                    <br/>
                        {   
                            saveForLaterList.map((item,key)=>(
                            <div key={key} className='d-flex p-2' style={{marginBottom:'.5px dashed black'}}>
                                    <img className='ml-2' width={150} height={150} src={imageUrlBase+item.imageUrl} alt={item.prName}/>
                                    <div>
                                        <h5>{item.prName}</h5>
                                        <h6>OUR PRICE : Rs {item.unitPrice}</h6>
                                        <div className='d-flex '>
                                            <a  className='m-2' style={{cursor:'pointer'}} onClick={()=>this.deleteSaveForLater(item.urlKey)}>Delete</a>|
                                            <a className='m-2'   style={{cursor:'pointer'}} onClick={()=>this.movetoCart(item.urlKey)}>Move to cart</a>
                                        </div>
                                    </div>
                                    <h3 style={{marginLeft:'25px'}}>Rs {item.unitPrice}</h3>
                            </div>
                            ))
                        }
                 </div>
                }
                
                <h3>PRODUCTS YOU MIGHT BE INTERESTED IN</h3>
                <br/>
                {
                  recentProductList.length <= 0?''
                  :<OwlCarousel className='owl-theme'  {...this.state.OwlCarouselOptions}>
                    {
                        recentProductList.map((item,key)=>(
                          <ProductCard key={key}
                                        value={JSON.stringify(item)}
                                        getInitData={this.getInitialData}/>
                        ))
                    }        
                 </OwlCarousel>
                }
                <br/>
                <h3>INSPIRED BY YOUR BROWSING HISTORY</h3>
                {
                  recentProductList.length <= 0?''
                  :<OwlCarousel className='owl-theme'  {...this.state.OwlCarouselOptions}>
                    {
                        recentProductList.map((item,key)=>(
                          <ProductCard key={key}
                                        value={JSON.stringify(item)}
                                        getInitData={this.getInitialData}/>
                        ))
                    }        
                 </OwlCarousel>
                }
                <br/>
                <Modal show={this.state.show} onHide={this.handleClose}
                        size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                        <div className='d-flex justify-content-around'>
                        <button style={{border:'none',backgroundColor:'none'}} onClick={this.handleClose}>
                          <AiOutlineClose  className='close-btn'/>
                        </button>
                        
                        </div>  
                        <br/>
                        <Modal.Body>
                        <div className="container">
                            <p><b>Apply Voucher</b></p>
                            {
                                couponList.length <= 0?'no coupons found':
                                couponList.map((item,key)=>(
                                    <div className='w-100 coupon-item'
                                    key={key} 
                                    style={{backgroundColor:this.state.selectedDivId==key?'rgba(0, 0, 0, 0.158)':''}}
                                    onClick={()=>this.selectCoupon(key,item.cpCode,item.cpId)}>
                                      <div className='d-flex'>
                                      <div className='coupon-code'>
                                          {item.cpCode}
                                      </div>
                                      <div style={{marginLeft:'25px'}}>
                                          {
                                              item.cpMode=='FIXED'?
                                              <h6>Rs.{item.cpAmount} OFF</h6>
                                              :''

                                          }
                                          {
                                              item.cpMode=='PERCENTAGE'?
                                              <h6>Rs.{item.cpAmount} % OFF upto RS. {item.cpCap}</h6>
                                              :''

                                          }
                                          
                                          <h6>Expire on: {Helper.changeTime(item.cpExpiry)}</h6>
                                      </div>
                                      </div>
                                      <div>
                                      <p className='text-primary' style={{textAlign:'end'}}>Minimum order amount {item.cpMinOrderAmount}</p>
                                      </div>
                                   </div>
                                ))
                            }
                           
                            <div style={{textAlign:'end'}}>
                                <button className='btn btn-danger' onClick={this.applyCoupon}>Apply Voucher</button>
                            </div>
                        </div>
                        
                        </Modal.Body>
                    
                </Modal>
                <br/>
                <Footer/>
         </div>
        )
    }
}


export default  withRouter(Cart);