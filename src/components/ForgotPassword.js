import React from 'react'

export default function ForgotPassword(props) {
    return (
        <div style={{display:props.display}}>
            <h4>Forgot Password?</h4>
            <br/>
            <form>
                <div className="form-group mb-2">
                    <label for="exampleFormControlInput1">Email Id</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <h5>--OR--</h5>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Mobile Number</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <br/>
                <div className='text-center'>
                    <button className='login-btn'>GET OTP</button>
                </div>
            </form>
        </div>
    )
}
