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
             show:false,
             firstName:'',
             lastName:'',
             addressLine1:'',
             addressLine2:'',
             state:'',
             country:'',
             place:'',
             pincode:'',
             countrycode:'+91',
             phone:''
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
    }
    getInitialData(){
        AddressApi.customerAddressGET()
                  .then((response)=>{
                     console.log(response)
                     this.setState({addressList:response.data.Data})
                  }).catch((error)=>{
                      console.log(error)
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
                 _pincode,_phone)=>{

        this.setState({firstName:_firstName,
                       lastName:_lastName,
                       addressLine1:_addressLine1,
                       addressLine2:_addressLine2,
                       state:_state,
                       country:_country,
                       pincode:_pincode,
                       phone:_phone});

        console.log('here you can edit address.!!!');
        this.showModal();
                
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
                                                                                    "",
                                                                                    item.state,
                                                                                    item.country,
                                                                                    item.pincode,
                                                                                    item.phone)}>Edit</button>
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
                        <input type="text" className="form-control"  placeholder="Enter Location"/>
                        <div style={{backgroundColor:'green',height:'180px'}}></div>
                        <br/>
                        <div className="row">
                            <div className="col-sm">
                                <input type="text" 
                                       className="form-control" 
                                       placeholder="First Name"
                                       value={this.state.firstName}/>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="text" 
                                     className="form-control" 
                                     placeholder="Last Name" 
                                     value={this.state.lastName}/>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <input type="text" 
                                       className="form-control"
                                       placeholder="Delivery address line 1"
                                       value={this.state.addressLine1}/>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="text"
                                     className="form-control"
                                     placeholder="Delivery address line 2"
                                     value={this.state.addressLine2}/>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <select id="inputState" class="form-control">
                                    <option selected>{this.state.state}</option>
                                </select>
                                <br/>
                            </div>
                            
                            <div className="col-sm">
                                <select id="inputState" className="form-control">
                                    <option selected>{this.state.country}</option>
                                </select>
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                              <br/>
                            </div>
                            
                            <div className="col-sm">
                              <input type="number" className="form-control" placeholder="pincode" />
                              <br/>
                            </div>
                            <br/>
                        </div>
                        <div className="d-flex p-0 justify-content-between w-100">
                            <input type="text"
                                   style={{width:'15%'}}
                                   className="form-control"
                                   value={this.state.countrycode}/>
                            <input type="text"
                                   style={{width:'80%'}} 
                                   className="form-control "
                                   placeholder="Phone" 
                                   value={this.state.phone}/>
                            <br/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="form-check-label" for="gridCheck">
                               Mark as default Delivery Address
                            </label>
                            </div>
                        </div> 
                        <br/>
                        <button className='btn btn-success'>UPDATE ADDRESS</button>   
                      </div>
                    
                    </Modal.Body>
                    
                </Modal>

            </div>
        );
    }
}

export default Address;
