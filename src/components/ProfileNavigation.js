import React, { Component,Fragment} from 'react';
import {MdDashboard} from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import '../assets/css/profile-navigation.css';

const liStyle={
    backgroundColor:'#fff',
    color:'rgb(32, 32, 32)'
}
class ProfileNavigation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          navigationDisplay:false
        }
    }
    navigateTo(_navigateTo){
        this.props.history.push(`/${_navigateTo}`);    
    }

    dashboardButtonClicked=()=>{
        this.setState({navigationDisplay:!this.state.navigationDisplay})
    }
    
    render() {
        let styleFor=this.props.setColorFor
        return (
             <Fragment>
                 <div className='main-nav d-none d-md-block'>
                      <ul>
                          <li >My Orders</li>
                          <li>My Wishlist</li>
                          <li style={styleFor==3?liStyle:{}}
                              onClick={()=>this.navigateTo('my-profile')}>My Profile</li>
                          <li style={styleFor==4?liStyle:{}}
                              onClick={()=>this.navigateTo('my-address')}>My Address</li>
                          <li>Coupons</li>
                          <li>Change Password</li>
                          <li>Contact us</li>
                          <li>Logout</li>
                      </ul>
                 </div>
                 <button className='nav-button d-block d-md-none'
                         onClick={this.dashboardButtonClicked}>
                                 <MdDashboard/>
                                 Dashboard
                  </button>
                  <br/>
                 {this.state.navigationDisplay &&
                      <div className='main-nav d-block d-md-none'>
                      <ul>
                          <li>My Orders</li>
                          <li>My Wishlist</li>
                          <li style={styleFor==3?liStyle:{}}
                              onClick={()=>this.navigateTo('my-profile')}>My Profile</li>
                          <li style={styleFor==4?liStyle:{}}
                              onClick={()=>this.navigateTo('my-address')}>My Address</li>
                          <li>Coupons</li>
                          <li>Change Password</li>
                          <li>Contact us</li>
                          <li>Logout</li>
                      </ul>
                 </div>}
             </Fragment>
        );
    }
}

export default withRouter(ProfileNavigation);
