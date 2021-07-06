import React, { Component } from 'react';
import CouponApi from '../api/CouponApi';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import {MdContentCopy} from 'react-icons/md';
import '../assets/css/coupon.css';
import Helper from  '../helper/Helper'
class Coupons extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            couponList:[]
        }
    }

    componentWillMount(){
        this.getInitialData();
    }

    getInitialData(){
        CouponApi.couponListGET()    
                 .then((response)=>{
                     console.log(response)
                    this.setState({couponList:response.data.Data});
                 }).catch((error)=>{
                    console.log(error);
                 });
    }

    copyItem=(_code)=>{
          navigator.clipboard.writeText(_code);
          alert(`${_code} copied to clip board`);
    }
    
    render() {
        return (
            <div>
               <Header/>
              <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                           <ProfileNavigation setColorFor={5}/>
                        </div>
                        <div className="col-md-9">
                            {
                                this.state.couponList.length<=0?'no coupons found':
                                this.state.couponList.map((item,key)=>(
                                    <div className='coupon-container' key={key}>
                                    <div className='d-flex justify-content-around'
                                         style={{cursor:'pointer'}}>
                                        {
                                            item.cpMode==='FIXED'?
                                            <h1>Rs.{item.cpAmount} OFF</h1>:''
                                            
                                        }
                                        {
                                            item.cpMode==='PERCENTAGE'?
                                            <h1>{item.cpAmount}% OFF</h1>:''
                                        }
                                        
                                        <div className='d-flex'
                                             onClick={()=>this.copyItem(item.cpCode)}>
                                            <b>{(item.cpCode).toUpperCase()}</b>
                                            <MdContentCopy style={{fontSize:'1.3em',marginLeft:'5px'}}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className='d-flex justify-content-around'>
                                        <p><b>Minimum order Amount Rs. {item.cpMinOrderAmount}</b></p>
                                        <p>Expires {Helper.changeTime(item.cpExpiry)}</p>
                                    </div>
                                 </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Coupons;
