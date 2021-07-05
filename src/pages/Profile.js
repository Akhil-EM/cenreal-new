import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import {AiOutlineClose} from 'react-icons/ai';
import ProfileApi from '../api/ProfileApi';
class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             editFormDisplayed:false,
             name:'',
             emailId:'',
             phoneNo:'',
             displayName:'',
             displayEmail:'',
             displayPhone:'',
             nameErrorClass:'',
             emailErrorClass:'',
             phoneErrorClass:''}
    }
    
    componentWillMount(){
        this.getInitialData();
    }
    
    getInitialData(){
        ProfileApi.customerDetailsGET()
                  .then((response)=>{
                    this.setState({name:response.data.Data.custName,
                                   emailId:response.data.Data.emailId,
                                   phoneNo:response.data.Data.phoneNo,
                                   displayName:response.data.Data.custName,
                                   displayEmail:response.data.Data.emailId,
                                   displayPhone:response.data.Data.phoneNo})
                  }).catch((error)=>{
                      console.log(error);
                  })
    }
    
    changeEditFormDisplay=(_type)=>{
        if(_type=='edit'){
            this.setState({editFormDisplayed:true})
        }
        if(_type=='close'){
            this.setState({editFormDisplayed:false})
        }
    }

    validateAndSubmitForm=()=>{
        if(this.validateForm()){
            var name=this.state.name;
            var email=this.state.emailId;
            var phone=this.state.phoneNo;
             ProfileApi.updateProfilePOST(name,email,phone)
                       .then(()=>{
                           this.getInitialData();
                       }).catch((error)=>{
                           console.log(error);
                       })
        }
    }

    validateForm(){
        this.setState({emailErrorClass:'',
                       nameErrorClass:'',
                       phoneErrorClass:''});

        var name=this.state.name;
        var email=this.state.emailId;
        var phone=this.state.phoneNo;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!name){
            this.setState({nameErrorClass:'is-invalid'});
            return false;
        }
        
        if(!email || !regex.test(String(email).toLowerCase())){
 
            this.setState({emailErrorClass:'is-invalid'});
            return false;  
        }  
        if(!phone || phone.length !=10){
            this.setState({phoneErrorClass:'is-invalid'});
            return false;
        }
        
         
        return true;
        
    }
    onChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        var name=this.state.name;
        var email=this.state.emailId;
        var phone=this.state.phoneNo;
        var nameErrorClass=this.state.nameErrorClass;
        var emailErrorClass=this.state.emailErrorClass;
        var phoneErrorClass=this.state.phoneErrorClass;
        return (
            <div>
                <Header/>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                         <ProfileNavigation setColorFor={3}/>
                        </div>
                        <div className="col-md-9">
                           <div className="container-fluid mt-2">
                             <div className="row">
                                <div className="col-md">
                                    <div className='card w-100 p-3'>
                                      <div className='text-end'>
                                         <button className="btn text-danger w-25"
                                                 onClick={()=>this.changeEditFormDisplay('edit')}>Edit</button>
                                      </div>
                                      <p>
                                          <b>Fullname</b>
                                           <br/>
                                          {this.state.displayName}
                                      </p>
                                      <p>
                                          <b>Email ID</b>
                                           <br/>
                                           {this.state.displayEmail}
                                      </p>
                                      <p>
                                          <b>Mobile Number</b>
                                           <br/>
                                           {this.state.displayPhone}
                                      </p>
                                    </div>
                                </div>
                                <div className="col-md">
                                   {   this.state.editFormDisplayed&&
                                       <div> 
                                            <div className='text-end'>
                                                <button className='btn' onClick={()=>this.changeEditFormDisplay('close')}>
                                                    <AiOutlineClose className='text-danger' style={{fontSize:'1.5em'}}/>
                                                </button>
                                            </div>
                                            <input type="text" 
                                                   value={this.state.name} 
                                                   className={`form-control ${nameErrorClass}`} 
                                                   name='name'
                                                   placeholder="first name"
                                                   onChange={this.onChange}/>
                                            <br/>
                                            <input type="email" 
                                                   value={email} 
                                                   name='emailId'
                                                   className={`form-control ${emailErrorClass}`} 
                                                   placeholder="Email"
                                                   onChange={this.onChange}/>
                                            <br/>
                                            <input type="number" 
                                                   value={phone}
                                                   name='phoneNo'
                                                   className={`form-control ${phoneErrorClass}`} 
                                                   placeholder="Phone"
                                                   onChange={this.onChange}/>
                                            <br/>
                                            <button className='btn btn-success'
                                                    onClick={this.validateAndSubmitForm}>Update Profile</button>
                                       </div>
                                   }
                                </div>
                             </div>
                           </div>
                        </div>
                        
                    </div>
                    </div>
            </div>
        );
    }
}

export default Profile;
