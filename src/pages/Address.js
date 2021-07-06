import React, { Component } from 'react';
import AddressApi from '../api/AddressApi';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineClose} from 'react-icons/ai';
class Address extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             addressList:[],
             deliverableLocations:[],
             show:false,
             firstName:'',
             lastName:'',
             addressLine1:'',
             addressLine2:'',
             state:'',
             country:'',
             district:'',
             place:'',
             pincode:'',
             countrycode:'+91',
             phone:'',
             defaultDeliveryLocation:false,
             firstNameErrorClass:'',
             lastNameErrorClass:'',
             addressLine1ErrorClass:'',
             addressLine2ErrorClass:'',
             stateErrorClass:'',
             districtErrorClass:'',
             countryErrorClass:'',
             countrycodeErrorClass:'',
             pincodeErrorClass:'',
             phoneErrorClass:'',
             buttonText:''
        }
    }

    componentWillMount(){
        this.getInitialData();
    }

     
    showModal=()=>{
        this.setState({show:true})
    }

    hideModal=()=>{
        this.setState({show:false});
        this.setState({firstNameErrorClass:'',
                       lastNameErrorClass:'',
                       addressLine1ErrorClass:'',
                       addressLine2ErrorClass:'',
                       stateErrorClass:'',
                       districtErrorClass:'',
                       countryErrorClass:'',
                       pincodeErrorClass:'',
                       phoneErrorClass:'',
                       countrycodeErrorClass:''});
    }
    getInitialData(){
        AddressApi.customerAddressGET()
                  .then((response)=>{
                     this.setState({addressList:response.data.Data})
                  }).catch((error)=>{
                      console.log(error)
                  });
        AddressApi.deliverableLocationsGET('')
                  .then((response)=>{
                      this.setState({deliverableLocations:response.data.Data})
                  }).catch((error)=>{
                      console.log(error);
                  })
    }
    
    deleteAddress(_id){
        console.log('address id',_id)
        AddressApi.deleteAddressGET(_id)
                  .then(()=>{
                      alert('address removed successfully!!');
                      this.getInitialData();
                  }).catch((error)=>{
                      console.log(error);
                  })
    }

    editAddress=(_firstName,_lastName,_addressLine1,_addressLine2,_district,_state,_country,
                 _pincode,_phone,_defaultDelivery)=>{

        this.setState({firstName:_firstName,
                       lastName:_lastName,
                       addressLine1:_addressLine1,
                       addressLine2:_addressLine2,
                       state:_state,
                       district:_district,
                       country:_country,
                       pincode:_pincode,
                       phone:_phone,
                       defaultDeliveryLocation:_defaultDelivery,
                       buttonText:'UPDATE ADDRESS'});
        this.showModal();
                
    }

    validateForm=()=>{
        this.setState({firstNameErrorClass:'',
                       lastNameErrorClass:'',
                       addressLine1ErrorClass:'',
                       addressLine2ErrorClass:'',
                       stateErrorClass:'',
                       districtErrorClass:'',
                       countryErrorClass:'',
                       pincodeErrorClass:'',
                       phoneErrorClass:'',
                       countrycodeErrorClass:''});

       var formHasError=false;
       

       var firstName=this.state.firstName;
       var lastName=this.state.lastName;
       var addressLine1=this.state.addressLine1;
       var addressLine2=this.state.addressLine2;
       var countrycode=this.state.countrycode
       var pincode=this.state.pincode;
       var phone=this.state.phone;

       if(!firstName){
            formHasError=true;
            this.setState({firstNameErrorClass:'is-invalid'});
       }

       if(!lastName){
            formHasError=true;
            this.setState({lastNameErrorClass:'is-invalid'});
       }

       if(!addressLine1){
            formHasError=true;
            this.setState({addressLine1ErrorClass:'is-invalid'});
       }

        if(!addressLine2){
            formHasError=true;
            this.setState({addressLine2ErrorClass:'is-invalid'});
        }
       
        if(!pincode || pincode.length !==6){
            formHasError=true;
            this.setState({pincodeErrorClass:'is-invalid'});
        }

        if(!phone || phone.length !==10){
            formHasError=true;
            this.setState({phoneErrorClass:'is-invalid'});
        }

        if(!countrycode ){
            formHasError=true;
            this.setState({countrycodeErrorClass:'is-invalid'});
        }
       
        return formHasError;
    }
     
    validateAndEditUser=()=>{
        if(!this.validateForm()){
            console.log('validation success');
            AddressApi.updateAddressPOST(this.state.addressLine1,
                                         this.state.addressLine2,
                                         this.state.district,
                                         "area id",
                                          this.state.country,
                                          "cust address id",
                                          
                                          )
                      .then(()=>{
                          alert('address updated');
                      }).catch((error)=>{
                          console.log(error);
                      })

        }else return;
    }
    onChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        var addressList=this.state.addressList;
        return (
            <div>
              <Header/>
              <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                           <ProfileNavigation setColorFor={4}/>
                        </div>
                        <div className="col-md-9">
                            <h5>Address</h5>
                            <br/>
                            <div className='container-fluid p-0'>
                                <div className='row'>
                                   {
                                     addressList.length<=0?'no address found':
                                     addressList.map((item,key)=>(
                                         <>
                                        <div className='col-sm' key={key}>
                                        <div className={`p-3 ${item.isDefaultShippingAddress?'card':''}`}
                                             >
                                          <p><b>{item.firstName+item.lastName}</b></p>
                                          <p>{item.addLine1+"  "+item.addLine2}</p>
                                          <p>{item.pincode}</p>
                                          <p>{item.area},{item.state},{item.country},</p>
                                          <p>{item.phone}</p>
                                          <div className='d-flex justify-content-between'>
                                              <button style={{backgroundColor:'rgba(156, 156, 156, 0.377)',
                                                              width:'80px'}} 
                                                      className='btn'
                                                      onClick={()=>this.editAddress(item.firstName,
                                                                                    item.lastName,
                                                                                    item.addLine1,
                                                                                    item.addLine2,
                                                                                    item.area, 
                                                                                    item.state,
                                                                                    item.country,
                                                                                    item.pincode,
                                                                                    item.phone,
                                                                                    item.isDefaultShippingAddress)}>Edit</button>
                                              <button style={{backgroundColor:'rgba(156, 156, 156, 0.377)',
                                                              width:'80px'}}
                                                      className='btn' 
                                                      onClick={()=>this.deleteAddress(item.custAdressId)}>Delete</button>
                                          </div>
                                        </div>
                                        <br/>
                                        </div>
                                        {
                                            key+1 %3==0?<div className='row'></div>:''
                                        }
                                        </>
                                     ))
                                    
                                   }
                                   {
                                          addressList.length % 3 ==1?
                                          <>
                                          <div className='col-sm'></div>
                                          <div className='col-sm'></div>
                                          </>:''
                                        }
                                         {
                                          addressList.length % 3 ==2?
                                          <>
                                          <div className='col-sm'></div>
                                          </>:''
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* edit or address add pop up */}
                <Modal show={this.state.show} onHide={()=>this.hideModal()}
                        size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                            <AiOutlineClose  style={{fontSize:'1.5em',
                                                        position:'absolute',
                                                        right:0,
                                                        margin:'10px'}}
                                             onClick={()=>this.hideModal()}/>

                         <br/>
                    <Modal.Body>
                      <div>
                        <input type="text" className={`form-control`}  placeholder="Enter Location"/>
                        <div style={{backgroundColor:'green',height:'180px'}}></div>
                        <br/>
                        <div className="row">
                            <div className="col-sm">
                                <input type="text" 
                                       className={`form-control ${this.state.firstNameErrorClass}`} 
                                       placeholder="First Name"
                                       value={this.state.firstName}
                                       name='firstName'
                                       onChange={this.onChange}/>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="text" 
                                     className={`form-control ${this.state.lastNameErrorClass}`} 
                                     placeholder="Last Name" 
                                     value={this.state.lastName}
                                     name='lastName'
                                     onChange={this.onChange}/>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <input type="text" 
                                       className={`form-control ${this.state.addressLine1ErrorClass}`}
                                       placeholder="Delivery address line 1"
                                       value={this.state.addressLine1}
                                       name='addressLine1'
                                       onChange={this.onChange}/>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="text"
                                     className={`form-control ${this.state.addressLine2ErrorClass}`}
                                     placeholder="Delivery address line 2"
                                     value={this.state.addressLine2}
                                     name='addressLine2'
                                     onChange={this.onChange}/>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <select id="inputState" 
                                        className={`form-control ${this.state.stateErrorClass}`}
                                        name='state'
                                        onChange={this.onChange}>
                                    <option defaultValue>{this.state.state}</option>
                                </select>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                                <select id="inputState"
                                        className={`form-control ${this.state.countryErrorClass}`}
                                        name='country'
                                        onChange={this.onChange}>
                                    <option defaultValue>{this.state.country}</option>
                                </select>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <select id="inputState"
                                        className={`form-control ${this.state.districtErrorClass}`}
                                        name='area'
                                        onChange={this.onChange}>
                                    {
                                    
                                      this.state.deliverableLocations.map((item,key)=>(
                                        <option key={key} defaultValue={this.state.district==item.area?true:false}>{item.area}</option>
                                        
                                      ))
                                      
                                    }
                                    
                                </select>
                              <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="number" 
                                     className={`form-control ${this.state.pincodeErrorClass}`} 
                                     placeholder="pincode"
                                     value={this.state.pincode}
                                     name='pincode'
                                     onChange={this.onChange}/>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="d-flex p-0 justify-content-between w-100">
                            <input type="text"
                                   style={{width:'15%'}}
                                   className={`form-control ${this.state.countrycodeErrorClass}`}
                                   value={this.state.countrycode}
                                   name='countrycode'
                                   onChange={this.onChange}/>
                            <input type="text"
                                   style={{width:'80%'}} 
                                   className={`form-control ${this.state.phoneErrorClass}`}
                                   placeholder="Phone" 
                                   value={this.state.phone}
                                   name='phone'
                                   onChange={this.onChange}/>
                            <br/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   defaultChecked={this.state.defaultDeliveryLocation==true?true:false}
                                   />
                            <label className="form-check-label" htmlFor="gridCheck">
                               Mark as default Delivery Address
                            </label>
                            </div>
                        </div> 
                        <br/>
                        <button className='btn btn-success'
                                onClick={()=>this.validateAndEditUser()}>{this.state.buttonText}</button>   
                      </div>
                    
                    </Modal.Body>
                    
                </Modal>

            </div>
        );
    }
}

export default Address;
