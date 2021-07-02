import React, { Component } from 'react'
import {FaFacebookF,FaInstagram,FaTwitter,FaYoutube,FaLinkedinIn,FaPinterestP} from 'react-icons/fa';
import '../assets/css/footer.css';
export default class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categoryList:[]
        }
    }
    componentWillMount(){
        this.getInitialData();
    }
    getInitialData=()=>{
        //  HomePageApi.categoryListGET()
        //             .then((response)=>{
        //                 this.setState({categoryList:response.data.Data});
                     
        //                 var catList=this.state.categoryList;
        //                 catList.map((item=>{
        //                       console.log(item.catId)
        //                 }))
        //             }).catch((err)=>{
        //                 console.log(err);
        //             });
    }
    
    render() {

        return (
            <div className='footer'>
                
                <div className='d-flex mb-2 justify-content-around app-bg-blue'>
                  
                  <div className='icons d-flex'>
                       <div className='icon-container'>
                          <FaFacebookF/>
                       </div>
                       <div className='icon-container'>
                          <FaInstagram/>
                       </div>
                       <div className='icon-container'>
                           <FaTwitter/>
                       </div>
                       <div className='icon-container'>
                          <FaYoutube/>
                       </div>
                       <div className='icon-container'>
                         <FaLinkedinIn/>
                       </div>
                       <div className='icon-container'>
                          <FaPinterestP/>
                       </div>
                  </div>
                  <div className='icons d-flex p-3'>
                       <h4 className='text-light '>Signup For News Letter</h4>
                       <div>
                       <div className="input-group">
                         <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username"/>
                         <div className="">
                            <button className='btn btn-danger'>Subscribe</button></div>
            
                        </div>
                      </div>
                       </div>
                 </div>
                 

            </div>
        )
    }
}
