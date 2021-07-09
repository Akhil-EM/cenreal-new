import React, { Component } from 'react';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import {IconContext} from "react-icons";
import AddressApi from '../api/AddressApi';
import Modal from 'react-bootstrap/Modal';
import {AiOutlineClose} from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressEdit from './AddressEdit';
class AddressCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            deliverHereDisplay:false,
            modalVisibility:false
        }

        this.hideModal=this.hideModal.bind(this);
        this.loader=this.props.parentDataLoader;
        this.loader=this.loader.bind(this);

    }

    selectDelivery=()=>{
        this.setState({deliverHereDisplay:true});
    }

    showModal=()=>{
        this.setState({modalVisibility:true});
    }

    hideModal=()=>{
       this.setState({modalVisibility:false});
    }

    deleteAddress=(_id)=>{
         AddressApi.deleteAddressGET(_id)
                   .then(()=>{
                       this.props.parentDataLoader();
                   }).catch((error)=>{
                       console.log(error)
                   })
    }
  
    // backgroundColor:this.props.cardId===this.props.selectedCardId?
    // 'rgba(156, 156, 156, 0.377)':'',
    render() {
        let addressInfo=this.props.dataSet;
        return (
            <div className='card p-3 mb-2' 
                 style={{cursor:'pointer',
                         height:'300px'
                         }}>
                
                <div  
                ///onClick={this.selectDelivery}
                     style={{height:'240px'}}>
                    <div  style={{height:'25px',minHeight:'25px'}}>
                        
                        { 
                        ///this.state.deliverHereDisplay && this.props.cardId===this.props.selectedCardId
                        (addressInfo.isDefaultShippingAddress)&&
                            <div className='d-flex justify-content-end text-success'>
                                <IconContext.Provider value={{ color: 'green', size: '30px' }}>
                                <IoMdCheckmarkCircleOutline />
                                </IconContext.Provider>
                                <b>Deliver here</b>
                            </div>
                        

                        } 
                    </div>
                    <p><b>{addressInfo.firstName+" "+addressInfo.lastName}</b></p>
                    <span>
                        {addressInfo.addLine1+"  "+addressInfo.addLine2}<br/>
                        {addressInfo.pincode}<br/>
                        {addressInfo.area},{addressInfo.state},{addressInfo.country},<br/>
                        {addressInfo.phone}
                    </span>
                </div>
                <div className='d-flex mt-2 justify-content-between'>
                   <button className='btn bg-ash'
                           style={{width:'80px',backgroundColor:'rgb(207, 207, 207)'}}
                           onClick={this.showModal}>Edit</button>
                   <button className='btn'
                           style={{width:'80px',backgroundColor:'rgb(207, 207, 207)'}}
                           onClick={()=>this.deleteAddress(addressInfo.custAdressId)}>Delete</button>
                </div>
                {/* editing modal */}
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
                      <AddressEdit addressInfo={this.props.dataSet}
                                   hideModal={this.hideModal}
                                   superParentDataLoader={this.loader}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddressCard;

