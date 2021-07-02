import React from 'react'

export default function LoginWithOtp(props) {
    return (
        <div style={{display:props.display}}>
            <h4>Login</h4>
            <br/>
            <form>
                <h5>This phone/email/whatsApp will get a confirmation code.</h5>
                <div className="form-group mb-2">
                    <label for="exampleFormControlInput1">Email Id</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <br/>
                <div className='text-center'>
                    <button className='login-btn'>SUBMIT</button>
                    <br/>
                    <br/>
                    <p>Register Forgot Password ?</p>
                    <h6>or</h6>
                    <p>Login with OTP</p>
                </div>
            </form>
        </div>
    )
}
