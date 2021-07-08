import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import MyOrdersApi from '../api/MyOrdersApi';
import MyOrdersItem from '../components/MyOrdersItem';
import {AiOutlineClose} from 'react-icons/ai';
import '../assets/css/my-orders.css'
import { IconContext } from "react-icons";
import {MdLocationOn,MdArrowDropUp,MdArrowDropDown} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi';
import Radium, {StyleRoot} from 'radium';
import {slideOutRight, slideInRight} from 'react-animations';
import Helper  from '../helper/Helper' 
import { imageUrlBase } from '../config';
class MyOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersList:[],
            showFullAddress:false,
            showTrackOrder:false,
            orderDetailsMenuStyle:{display:'none'},
            spinnerDisplay:false,
            orderStatus:'',
            deliveryMode:'',
            PayMethod:'',
            slotTime:'',
            orderNumber:'',
            customerName:'',
            addLine1:'',
            addLine2:'',
            area:'',
            state:'',
            orderTracks:[],
            OrderItemsDetails:[],
            subTotal:0,
            grandTotal:0,
            deliveryCharge:0,
            couponDiscount:0

        }
        
        this.StartAnimation=this.StartAnimation.bind(this)
    }
 
    componentWillMount(){
        this.getInitialData();
    }

    StartAnimation=(_orderId)=>{
        this.setState({orderDetailsMenuStyle:{animation: 'x 1s',
                                     animationName: Radium.keyframes(slideInRight, 'left')},
                       orderStatus:"",
                       deliveryMode:"",
                       slotTime:"",
                       orderNumber:"",
                       PayMethod:"",
                       customerName:"",
                       addLine1:"",
                       addLine2:"",
                       area:"",
                       state:"",
                       ShippingAddress:{},
                       orderTracks:[],
                       spinnerDisplay:true,
                       OrderItemsDetails:[],
                       subTotal:0,
                       grandTotal:0,
                       deliveryCharge:0,
                       couponDiscount:0
                       });

        MyOrdersApi.orderDetailsGET(_orderId)
                   .then((response)=>{
                        let OrderDetails=response.data.Data.OrderDetails;
                        let ShippingAddress=response.data.Data.ShippingAddress;
                        if(response.data.Data.ShippingAddress!=null){
                            this.setState({ShippingAddress:response.data.Data.ShippingAddress,
                                            orderStatus:OrderDetails.status,
                                            deliveryMode:OrderDetails.deliveryMode,
                                            slotTime:OrderDetails.orderSlotDate,
                                            orderNumber:OrderDetails.orderNumber,
                                            PayMethod:OrderDetails.PayMethod,
                                            customerName:ShippingAddress.firstName+' '+ShippingAddress.lastName,
                                            addLine1:ShippingAddress.addLine1,
                                            addLine2:ShippingAddress.addLine2,
                                            area:ShippingAddress.area,
                                            state:ShippingAddress.state,
                                            orderTracks:response.data.Data.orderTracks,
                                            OrderItemsDetails:response.data.Data.OrderItemsDetails,
                                            subTotal:OrderDetails.subTotal,
                                            grandTotal:OrderDetails.orderAmount,
                                            deliveryCharge:OrderDetails.orderDeliveryCharge,
                                            couponDiscount:OrderDetails.couponDiscount,
                                            spinnerDisplay:false});
                        }else{
                            this.setState({ShippingAddress:response.data.Data.ShippingAddress,
                                            orderStatus:OrderDetails.status,
                                            deliveryMode:OrderDetails.deliveryMode,
                                            slotTime:OrderDetails.orderSlotDate,
                                            orderNumber:OrderDetails.orderNumber,
                                            PayMethod:OrderDetails.PayMethod,
                                            orderTracks:response.data.Data.orderTracks,
                                            OrderItemsDetails:response.data.Data.OrderItemsDetails,
                                            subTotal:OrderDetails.subTotal,
                                            grandTotal:OrderDetails.orderAmount,
                                            deliveryCharge:OrderDetails.orderDeliveryCharge,
                                            couponDiscount:OrderDetails.couponDiscount,
                                            spinnerDisplay:false});
                        }


                        
                   }).catch((error)=>{
                        this.setState({spinnerDisplay:false});
                        console.log(error);
                   })
        
    }

    EndAnimation=()=>{
        this.setState({orderDetailsMenuStyle:{
                                    animation: 'x 1s',
                                    animationName: Radium.keyframes(slideOutRight, 'right')}});
       setTimeout((()=>{ this.setState({orderDetailsMenuStyle:{display:'none'},minCartDisplayed:false}) }),1000);
    }
        
    updateFullAddressShow=()=>{
        this.setState({showFullAddress:!this.state.showFullAddress});
    }

    updateOrderTrackShow=()=>{
        this.setState({showTrackOrder:!this.state.showTrackOrder})
    }
    getInitialData(){
        MyOrdersApi.orderListGET()
                   .then((response)=>{
                       this.setState({ordersList:response.data.Data});
                   }).catch((error)=>{
                       console.log(error)
                   });  
    }    

    render() {
        
        return (
            <div>
             <Header/>
             <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfileNavigation setColorFor={1}/>
                        </div>
                        <div className="col-md-9">
                           {
                              this.state.ordersList.length<=0?'No orders found..!':''
                           }
                           {
                               this.state.ordersList.map((item,key)=>(
                                  <MyOrdersItem key={key}
                                                status={item.status}
                                                itemList={item.itemList}
                                                orderAmount={item.orderAmount}
                                                ProductCount={item.ProductCount}
                                                orderId={item.orderId}
                                                ShowDetails={this.StartAnimation}/>
                               ))
                           }
                            

                        </div>  
                    </div>
                </div>
                <StyleRoot>
                  <div className='nav-bar' style={this.state.orderDetailsMenuStyle}>
                      <div className='bg-success p-3 text-light d-flex justify-content-between'>
                          <h6 className='text-light'>View Details</h6>
                          <button style={{backgroundColor:'transparent',
                                          border:'none'}}
                                  onClick={this.EndAnimation}>
                            <IconContext.Provider value={{ color: "#fff"}}>
                                <AiOutlineClose />
                            </IconContext.Provider>    
                          </button>
                
                      </div>
                      { 
                        this.state.spinnerDisplay &&
                        <div className='text-center m-4'>
                           <div className="spinner-border text-warning" role="status"/>
                        </div>
                       }
                       {
                        !this.state.spinnerDisplay &&
                        <div className='p-3' style={{overflowY:'scroll'}}>
                          <div className='d-flex justify-content-between'>
                              <div>
                                  <h6>Order Status</h6>
                                  
                                  <h6 className={`${this.state.orderStatus==='Order Accepted'?'text-success':''}
                                                  ${this.state.orderStatus==='Order Cancelled'?'text-danger':''}
                                                  ${this.state.orderStatus==='Order Processing'?'text-primary':''}`}
                                  >{this.state.orderStatus}</h6>
                              </div>
                              <div>
                                  <p>Slot:June 9, 2021<br/> between
                                   2:03 PM-6:03 PM</p>
                                   <p className='text-success bg-success text-light p-1'
                                      style={{borderRadius:'4px'}}>
                                          Delivery Mode:{this.state.deliveryMode}</p>
                              </div>
                          </div>
                          <div >
                              {/* PickUpFromStore */}
                              { this.state.ShippingAddress!==null?
                                <div>
                                    <p style={{cursor:'pointer',userSelect:'none'}}
                                        onClick={this.updateFullAddressShow}>
                                        <MdLocationOn/>
                                        Delivery Address
                                        {this.state.showFullAddress&& <MdArrowDropUp/>}
                                        {!this.state.showFullAddress&&<MdArrowDropDown/>}
                                    </p>
                                    {
                                        this.state.showFullAddress&&
                                        <p style={{width:'100px',
                                                marginLeft:'5px'}}>
                                                {this.state.customerName}<br/>
                                                {this.state.addLine1}<br/>
                                                {this.state.addLine2}<br/>
                                                {this.state.area}<br/>
                                                {this.state.state} 
                                        </p>
                                    }
                                </div>:''
                              }
                              
                              <h6 style={{color:'rgba(0, 0, 0, 0.527)'}}>
                                  Payment:{this.state.PayMethod==='COD'?
                                             'Pay on Delivery':
                                             this.state.PayMethod}
                              </h6>
                          </div>
                          <hr/>
                          <h6>Order #{this.state.orderNumber}</h6>
                          <hr/>
                          <div className=''>
                            <h5 style={{cursor:'pointer',userSelect:'none'}}
                                onClick={this.updateOrderTrackShow}>
                                 Track Order 
                                {!this.state.showTrackOrder&& <MdArrowDropUp/>}
                                {this.state.showTrackOrder&& <MdArrowDropDown/>}
                            </h5>
                            {
                                this.state.showTrackOrder&&
                                <div>
                                 {
                                     this.state.orderTracks.map((item,key)=>(
                                        <div className='d-flex' key={key}>
                                        <GiCheckMark/>
                                        {/* <AiOutlineClose/> */}
                                        <h6 style={{marginRight:'5px'}}>{item.status}</h6>{Helper.changeTimeWithAMorPM(item.statusDate)}
                                        </div>
                                     ))
                                 }
                               
                               
                             </div>
                            }
                            
                          </div>
                          <hr/>
                          <p>order items</p>
                          <div style={{overflowY:'scroll',height:'100px'}}>
                            {
                                this.state.OrderItemsDetails.map((item,key)=>(
                                   <div className='d-flex' key={key} style={{marginBottom:'5px'}}>
                                       <img src={imageUrlBase+item.imageUrl} alt={item.imageUrl} width="30px" height='30px'/>
                                       <div>
                                           {item.prName}<br/>
                                           Rs{item.productSpecialPrice} <span>Rs{item.productPrice}</span>
                                           <p>Qty{parseInt(item.qty)}</p>
                                       </div>
                                   </div>    
                                ))
                            }
                          </div>
                          <div className='text-end'>
                            <h6>Sub Total :Rs {this.state.subTotal}</h6>
                            <h6>Delivery Charge :Rs 50.00</h6>
                            <h6>Discount :Rs {this.state.couponDiscount}</h6>
                            <h6>Grand Total :Rs {this.state.grandTotal}</h6>
                        </div>
                       </div>}
                       
                  </div>
                </StyleRoot>
            </div>
        );
    }
}

export default MyOrders;
