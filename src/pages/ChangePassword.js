import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import ChangePasswordApi from '../api/ChangePasswordApi'
class ChangePassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             oldPassword:'',
             newPassword:'',
             confirmPassword:'',
             oldPasswordErrorClass:'',
             newPasswordErrorClass:'',
             confirmPasswordErrorClass:''
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    onFormSubmit=()=>{
          this.setState({oldPasswordErrorClass:'',
                         newPasswordErrorClass:'',
                         confirmPasswordErrorClass:''});
        
         var oldPass=this.state.oldPassword;
         var newPass=this.state.newPassword;
         var cnfPass=this.state.confirmPassword;
         var formHasError=false;
         if(!oldPass){
            this.setState({oldPasswordErrorClass:'is-invalid'});
            formHasError=true;
         }

         if(!newPass){
            this.setState({newPasswordErrorClass:'is-invalid'});
            formHasError=true;
         }

         if(!cnfPass){
            this.setState({confirmPasswordErrorClass:'is-invalid'});
            formHasError=true;
         }

         if(cnfPass !== newPass){
             this.setState({confirmPasswordErrorClass:'is-invalid'})
             alert('password miss match.!');
             formHasError=true;
         }

         if(!formHasError){
              ChangePasswordApi.changePasswordPOST(oldPass,newPass)
                               .then((response)=>{
                                   alert(response.data.Message);
                                   this.setState({oldPassword:'',
                                                  newPassword:'',
                                                  confirmPassword:''})
                               }).catch((error)=>{
                                   alert(error.response.data.Message);
                               })
         }
    }
    
    render() {
        return (
            <div>
             <Header/>
             <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfileNavigation setColorFor={6}/>
                        </div>
                        <div className="col-md-9">
                            <div className='card p-3' style={{maxWidth:'559px',
                                                              backgroundColor:'rgba(51, 51, 51, 0.247)'}}>
                                <h5>Change Password</h5>
                                <br/>
                                <input type="password" 
                                       className={`form-control ${this.state.oldPasswordErrorClass}`}
                                       placeholder='Old password'
                                       value={this.state.oldPassword}
                                       name='oldPassword'
                                       onChange={this.onChange}/>
                                <br/>
                                <input type="password" 
                                       className={`form-control ${this.state.newPasswordErrorClass}`}
                                       placeholder='New password'
                                       value={this.state.newPassword}
                                       name='newPassword'
                                       onChange={this.onChange}/>
                                <br/>
                                <input type="password" 
                                       className={`form-control ${this.state.confirmPasswordErrorClass}`}
                                       placeholder='Confirm password'
                                       value={this.state.confirmPassword}
                                       name='confirmPassword'
                                       onChange={this.onChange}/>
                                <br/>
                                <button className='btn btn-success'
                                        style={{width:'200px'}}
                                        onClick={this.onFormSubmit}>CHANGE PASSWORD</button>
                            </div>
                        </div>
                    </div>
                </div>
         </div>
        );
    }
}

export default ChangePassword;
