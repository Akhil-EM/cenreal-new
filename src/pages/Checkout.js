import React, { Component } from 'react';
import Header from '../components/Header';
import CheckoutApi from '../api/CheckoutApi';
import AddressCard from '../components/AddressCard';
import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineClose} from 'react-icons/ai';
import AddressAdd from '../components/AddressAdd';
import '../assets/css/checkout.css';

class Checkout extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
            deliveryModeShow:false,
            vendorsList:[],
            addressList:[],
            selectedCardId:0,
            modalVisibility:false,
            normalDeliveryDisplay:true
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getInitialData=this.getInitialData.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }

    componentWillMount(){
        this.getInitialData();
    }
    
    showModal=()=>{
        this.setState({modalVisibility:true});
    }

    hideModal=()=>{
       this.setState({modalVisibility:false});
    }

    getInitialData(){
       CheckoutApi.vendorsListGET()
                  .then((response)=>{
                     this.setState({vendorsList:response.data.Data});
                  }).catch((error)=>{
                      console.log(error)
                  });
       CheckoutApi.customerAddressListGET()
                  .then((response)=>{
                      this.setState({addressList:response.data.Data});
                  }).catch((error)=>{
                      console.log(error);
                  })
    }
    
    onChangeValue(event) {
        let val=event.target.value;
        if(val==='delivery'){
            this.setState({deliveryModeShow:false});
            this.updateDeliveryMode('Slotted Delivery');
            
        }
        if(val==='store-pickup'){
             this.setState({deliveryModeShow:true});
             this.updateDeliveryMode('Pickup From Store');
        }
    }

    updateDeliveryMode(_deliveryMode){
        CheckoutApi.updateDeliveryModeGET(_deliveryMode)
                   .then((response)=>{
                       console.log(response);
                   }).catch((error)=>{
                       console.log(error);
                   });
    }

    selectCard(_id){
        this.setState({selectedCardId:_id});
    }
    
    changeToNormalDelivery=()=>{
        this.setState({normalDeliveryDisplay:true});
    }
    changeToExpressDelivery=()=>{
        this.setState({normalDeliveryDisplay:false});
    }

    getTime(){
        // var d=new Date()
        // var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        // // for(let i=1;i=7;i++){
        // //     console.log(i)
        // //     console.log(weekday[d.getDay()+i]);
        // //     //console.log(weekday[d.getDay()+(i%7)])
        // // }
        // console.log('\n')
        // var d=new Date();
        // var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        // console.log(d.getDay()+1)
        // var n = weekday[d.getDay()];
        // console.log(n)
    }

    render() {
        this.getTime()
        return (
            <div>
                <Header/>
                <div className='card m-4 p-3' style={{maxWidth:'500px'}}>
                   <div className='d-flex justify-content-around'
                        onChange={this.onChangeValue}>
                        <div className='d-flex'>
                            <input type='radio' 
                                   style={{border:'0px',height:'1.5em',marginRight:'10px'}}
                                   value='delivery' 
                                   name="gender"
                                   defaultChecked={!this.state.deliveryModeShow}/>
                            <h6>Delivery</h6>
                        </div>
                        <div className='d-flex'>
                            <input type='radio' 
                                   style={{border:'0px',height:'1.5em',marginRight:'10px'}}
                                   value='store-pickup'
                                   name="gender"
                                   defaultChecked={this.state.deliveryModeShow}/>
                            <h6>Pickup From Store</h6>
                        </div>
                   </div>
                   
                   
                  { this.state.deliveryModeShow &&
                    <div>
                        <hr/>
                        Select Store
                        <select className="form-control" >
                            {
                              this.state.vendorsList.map((item,key)=>(
                                <option key={key} value={item.urlKey}>{item.businessName}</option>
                              ))
                            }
                        </select>
                        <span className='text-danger'>* Shopping Cart items availability / price may vary based on the store Selected</span>
                    </div>
                  }
                </div>
                {
                    !this.state.deliveryModeShow&&
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-10 p-0'>
                              <div className='container-fluid'>
                                  <h4>Choose delivery address</h4>
                                  <hr/>
                                  <div className='row'>
                                    {
                                      this.state.addressList.map((item,key)=>(
                                        <Fragment key={key}>
                                            <div className='col-sm'
                                                key={key}
                                                //onClick={()=>this.selectCard(key+1)}
                                                >
                                            <AddressCard selectedCardId={this.state.selectedCardId}
                                                        cardId={key+1}
                                                        dataSet={item}
                                                        parentDataLoader={this.getInitialData}
                                                    />
                                            </div>
                                            {
                                                (key+1)%3==0?<div className='row'></div>:
                                                ''
                                            }
                                            
                                            
                                        </Fragment>
                                      ))
                                    }
                                    {
                                        (this.state.addressList.length)%3===1?
                                        <Fragment>
                                            <div className='col-sm'></div>
                                            <div className='col-sm'></div>
                                        </Fragment>:''
                                    }
                                    {
                                        (this.state.addressList.length)%3===2?
                                         <div className='col-sm'></div>
                                        :''
                                    }
                                  </div>
                              </div>
                              
                            </div>
                            <div className='col-md-2'>
                                <button className='btn btn-danger w-100'
                                        onClick={this.showModal}>
                                            Add New Address
                                </button>
                            </div>
                        </div>
                        <div className='delivery-mode'>
                            <p style={{
                                backgroundColor:this.state.normalDeliveryDisplay?'green':'',
                                color:this.state.normalDeliveryDisplay?'#fff':''
                               }} 
                              onClick={this.changeToNormalDelivery}>Normal Delivery Rs.0</p>
                            <p style={{
                                backgroundColor:!this.state.normalDeliveryDisplay?'green':'',
                                color:!this.state.normalDeliveryDisplay?'#fff':''
                                }}
                                onClick={this.changeToExpressDelivery}>Express Delivery Rs.50</p>
                        </div>
                        {

                        }
                        {
                            !this.state.normalDeliveryDisplay&&
                            <p>Express delivery charge 50<br/>
                            The express delivery will be available 9 am to 8pm only usually take 1 1/2 hrs to deliver</p>
                        }
                       { this.state.normalDeliveryDisplay &&
                         <div className='slot-list'>
                            <div>
                                <h4>Today</h4>
                                <h5>9 July</h5>
                            </div>
                            <div>
                                <h4>Today</h4>
                                <h5>9 July</h5>
                            </div>
                            <div>
                                <h4>Today</h4>
                                <h5>9 July</h5>
                            </div>
                            <div>
                                <h4>Today</h4>
                                <h5>9 July</h5>
                            </div>
                            <div>
                                <h4>Today</h4>
                                <h5>9 July</h5>
                            </div>
                        </div>}
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                }
                
                {/* new address add modal  show={this.state.modalVisibility}*/}
                <Modal show={this.state.modalVisibility} onHide={this.hideModal}
                        size="md"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                           <button onClick={this.hideModal} style={{backgroundColor:'transparent',
                                                                    border:'none'}}>
                           <AiOutlineClose  style={{fontSize:'1.5em',
                                                                            position:'absolute',
                                                                            right:0,
                                                                            margin:'10px'}}/>
                           </button>
                           
                                                                            <br/>
                    <Modal.Body>
                      <AddressAdd parentDataLoader={this.getInitialData}
                                  hideModal={this.hideModal}/>
                    </Modal.Body>
                </Modal>
          
            </div>
        );
    }
}

export default Checkout;
