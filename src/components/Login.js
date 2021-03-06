import React from 'react'
import HeaderApi from '../api/HeaderApi'
import {Alert } from 'react-bootstrap'
 class Login extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             testEmailOrPhone:'',
             testPassword:'',
             spinnerDisplay:'none',
             textDisplay:'',
             errorDisplay:'none',
             errText:''}
    }
    
    

    onInputItemChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    submitForm=()=>{
        if(this.state.testEmailOrPhone===''){
           return  alert('Email or phone required')
        }
        if(this.state.testPassword===''){
            return alert('Password is  required')
        }
        
        this.setState({spinnerDisplay:'',textDisplay:'none',errorDisplay:'none'});
        var uName=this.state.testEmailOrPhone;
        var password=this.state.testPassword;
        HeaderApi.loginPOST({userName:uName,password:password})
                        .then((response)=>{
                           // console.log('login',response.data.Message);
                            this.setState({spinnerDisplay:'none',textDisplay:''});
                            this.props.closeFn();
                            window.location.reload();
                            
                        }).catch((err)=>{
                            this.setState({spinnerDisplay:'none',
                                           textDisplay:'',
                                            errText:err.response.data.Message,
                                           errorDisplay:''});
                        })
        
    }
    render() {
        return (
            <div >
            <h4>Login</h4>
            <br/>
        
                <div className="form-group mb-2">
                    <label for="exampleFormControlInput1">Email / Mobile Number</label>
                    <input type="text" className="form-control" onChange={this.onInputItemChange}  name='testEmailOrPhone' placeholder="Email/Phone"/>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Password</label>
                    <input type="password" className="form-control" onChange={this.onInputItemChange} name='testPassword' placeholder="Password"/>
                </div>
                <br/>
                <div className='text-center'>
                    <button className='login-btn' onClick={this.submitForm}>
                         <span>SUBMIT</span>
                         {/* <Spinner animation="border" variant="light" /> */}
                    </button>

                    <Alert variant="danger" style={{display:this.state.errorDisplay,padding:'5px',marginTop:'8px'}}>
                        {this.state.errText}
                    </Alert>
                    <br/>
                    <br/>
                    <p  >Register Forgot Password ?</p>
                    <h6>or</h6>
                    <p  >Login with OTP</p>
                </div>
          
            </div>
        )
    }
}

export default Login;