import React from 'react';
import Header from '../components/Header';
import {ImHome3,ImPhone}  from 'react-icons/im';
import {HiOutlineMail} from 'react-icons/hi';
const ContactForm = () => {
    return (
        <div>
            <Header/>
            <div className='app-bg-blue text-center' style={{paddingBottom:'80px'}}>
                <h1 className='text-light'>Get in touch with us</h1>
                <h5 className='text-light '>Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.</h5>
                <br/>
                <div className='row text-light'>
                  <div className='col-md'>
                      <span style={{fontSize:'3em'}}>
                         <ImHome3/>
                      </span>
                      <h5>OFFICE ADDRESS</h5>
                      <p>Central Tower, Near Metro Pillar NO: P/319, Kalamassery, Kochi, Kerala - 682033</p>
                  </div>
                  <div className='col-md'>
                      <span style={{fontSize:'3em'}}>
                        <ImPhone/>
                      </span>
                      <h5>PHONE</h5>
                      <p>+91 7594999934</p>
                  </div>
                  <div className='col-md'>
                      <span style={{fontSize:'3em'}}>
                        <HiOutlineMail/>
                      </span>
                      <h5>EMAIL</h5>
                      <p>info@centrealbazaaronline.com</p>
                  </div>
               </div>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='card p-4' style={{maxWidth:'700px',
                                              marginTop:'-80px'}}>
                    <h1>Lets keep in touch</h1>
                    
                </div>
            </div>
           
            <br/>
            <br/>
            <br/> <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <br/>
            <br/>
        </div>
    );
}

export default ContactForm;
