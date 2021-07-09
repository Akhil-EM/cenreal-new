import React, { Component } from 'react';
import AddressApi from '../api/AddressApi';
class AddressEdit extends Component {
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
            state:'Kerala',
            country:'India',
            district:'',
            place:'',
            pincode:'',
            countrycode:'+91',
            phone:'',
            area:'',
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
            buttonText:'',
            areaTest:''
        }
    }
    
    componentWillMount(){
        this.getInitialData();
    }

    onChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    checkBoxChange=(e)=>{
        this.setState({defaultDeliveryLocation:e.target.checked});
    }

    getInitialData(){
        var addressInfo=this.props.addressInfo;
        AddressApi.deliverableLocationsGET('')
                  .then((response)=>{
                      this.setState({deliverableLocations:response.data.Data,
                                     area:response.data.Data[0].pincodeId+"_"+response.data.Data[0].area,
                                     firstName:addressInfo.firstName,
                                     lastName:addressInfo.lastName,
                                     addressLine1:addressInfo.addLine1,
                                     addressLine2:addressInfo.addLine2,
                                     place:'',
                                     pincode:addressInfo.pincode,
                                     phone:addressInfo.phone,
                                     areaTest:addressInfo.areaId+"_"+addressInfo.area,
                                     defaultDeliveryLocation:addressInfo.isDefaultShippingAddress
                                     })
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
            // console.log('update address')
            var fullArea=this.state.area;
            var searchPos=(fullArea).indexOf("_");
            var strLen=this.state.area.length;
            var areaId=fullArea.slice(0,searchPos);
            var area=fullArea.slice(searchPos+1,strLen);

            AddressApi.updateAddressPOST(this.state.addressLine1,this.state.addressLine2,
                                         areaId,this.state.country,this.props.addressInfo.custAdressId,this.state.district,
                                         this.state.firstName,this.props.addressInfo.isDefaultBillingAddress,this.state.defaultDeliveryLocation,
                                         this.state.lastName,this.props.addressInfo.latitude,this.props.addressInfo.longitude,this.state.phone,this.state.state,
                                         this.state.pincode,area)
                        .then(()=>{
                            alert('new address updated.!');
                            this.props.hideModal();
                         this.props.superParentDataLoader();
                        }).catch((error)=>{
                            console.log(error);
                        })

        }else return;
        
    }
    
    render() {
        return (
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
                                <option value='Kerala'>Kerala</option>
                        </select>
                        <br/>
                    </div>
                    <div className="col-sm">
                        <select id="inputState"
                            className={`form-control ${this.state.countryErrorClass}`}
                            name='country'
                            onChange={this.onChange}>
                               <option value='India'>India</option>
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
                                  <option key={key} value={item.pincodeId+"_"+item.area} selected={this.state.areaTest===item.pincodeId+"_"+item.area?true:false}>{item.area}</option>   
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
                           name='defaultDeliveryLocation'
                           onChange={this.checkBoxChange}
                           checked={this.state.defaultDeliveryLocation}/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Mark as default Delivery Address
                    </label>
                </div>
                </div> 
                <br/>
                <button className='btn btn-success'
                        onClick={()=>this.validateAndEditUser()}>Update Address
                </button>   
            </div>
        );
    }
}

export default AddressEdit;
