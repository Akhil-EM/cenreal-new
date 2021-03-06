import React, { Component } from 'react';
import Header from '../components/Header';
import {RiArrowDropRightLine} from 'react-icons/ri';
import HeaderApi from '../api/HeaderApi';
import '../assets/css/style.css'
import { withRouter} from "react-router-dom";
class ServiceableLocations extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            locationList:[],
        }
    }

    componentWillMount(){
        HeaderApi.deliveryLocationsGET('')
                 .then((response)=>{
                     this.setState({locationList:response.data.Data});
                 }).catch((error)=>{
                     console.log(error)
                 })
    }

    setLocation(_area,_pincodeId,_pincode){
        localStorage.setItem('area',_area);
        localStorage.setItem('pincodeId',_pincodeId);
        localStorage.setItem('pincode',_pincode);
        window.location.reload();
    }
    
    navigateTo(_navigateTo){
        this.props.history.push(`/${_navigateTo}`);         
    }

    
    render() {
        var locationList=this.state.locationList;
        
        return (
            <div>
                <Header/>
                <div className='anchor-nav d-none d-lg-block'>
                     <a onClick={()=>this.navigateTo('')} style={{cursor:'pointer'}}>Home</a>
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                      Locations
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                     <hr/>
                 </div>
                 <div className='p-4'>
                    <h3>Serviceable Locations</h3>
                    <br/>
                        {
                            locationList.length <=0 ?'No locations available':
                            locationList.map((item,key)=>(
                                <div key={key} className='location-item' onClick={()=>this.setLocation(item.area,item.pincodeId,item.pincode)}>
                                    <p>{item.area}</p>
                                </div>
                            ))
                         }                
                   
                 </div>
            </div>
        )
    }
}




export default  withRouter(ServiceableLocations);