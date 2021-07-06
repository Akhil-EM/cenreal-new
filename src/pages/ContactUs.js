import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
class ContactUs extends Component {
   

  
    
    render() {
        return (
            <div>
             <Header/>
             <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfileNavigation setColorFor={7}/>
                        </div>
                        <div className="col-md-9">
                            <h6>Contact Us</h6>
                            <p>WHATSAPP US</p>
                            <p>+91 7594999934</p>
                            <p>CALL US</p>
                            <p> +91 7594999934</p>
                            <p>8:00 AM TO 8:00 PM, 365 DAYS</p>
                            <h6>Concerns not addressed?</h6>
                            <p>It is our priority to positively respond and address any concerns you may have at the earliest. To ensure this, our team is continuously working to provide you the best of support, though a few concern/issues that are complex in nature may require additional time to solve
                              in the unlikely event that you concerns are not addressed satisfactorily, you could communicate directly to higher authorities . To facilitate and better manage this we have aligned a structure to aid communication.</p>
                            <h6>Communication structure for concerns not addressed satisfactorily</h6>
                            <ul>
                            <li>Level-2 CS Head:ecommerce@centrealbazaar.com</li>
                            <li>This is the final to redress grievances that have already been conveyed to the Level1 customer support</li>
                            <li>While writing, we encourage you to quote the communication and allied resolution offered in earlier stages so that we get a holistic view</li>
                            <li>We value your time and are committed to ensure your satisfaction in all your interactions with us</li>
                            <li>Please allow 24-48 hours for a resolution</li>
                            </ul>

                        </div>  
                    </div>
                </div>
         </div>
        );
    }
}

export default ContactUs;
