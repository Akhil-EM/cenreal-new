import React from 'react'
import {BrowserRouter,
        Switch,
        Route} from "react-router-dom";
// import ForgotPassword from '../components/ForgotPassword';
import HomePage from '../pages/HomePage'
import ProductDetail from '../pages/ProductDetail';
// import MinCart from '../components/MinCart';
import Cart from '../pages/Cart';
import ServiceableLocations from '../pages/ServiceableLocations';
import Products from '../pages/Products';
import ErrorPage from '../pages/ErrorPage';
import Profile from '../pages/Profile';
import Address from '../pages/Address';
import Coupons from '../pages/Coupons';
import ChangePassword from '../pages/ChangePassword';
import ContactUs from '../pages/ContactUs';
import WishList from '../pages/WishList';
import MyOrders from '../pages/MyOrders';
import ContactForm from '../pages/ContactForm';
import Checkout from '../pages/Checkout';
export default function router() {

    return (
        <div >
            
             <BrowserRouter>
                <Switch>
                    <Route  exact path="/">
                        <HomePage/>
                    </Route>
                    <Route path='/product-detail/:productUrl' component={ProductDetail}/>
                    <Route path='/cart'>
                        <Cart/>
                    </Route>
                    <Route path='/locations'>
                        <ServiceableLocations/>
                    </Route> 
                    <Route path="/products/:category" component={Products}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/my-profile" >
                        <Profile/>
                    </Route>
                    <Route path='/my-address' component={Address}/>
                    <Route path='/my-coupons' component={Coupons}/>
                    <Route path='/change-password' component={ChangePassword}/>
                    <Route path='/contact-us' component={ContactUs}/>
                    <Route path='/my-wishlist' component={WishList}/>
                    <Route path='/my-order' component={MyOrders}/>
                    <Route path='/contact-form' component={ContactForm}/>
                    <Route path='/checkout' component={Checkout}/>
                    <Route component={ErrorPage}/>
                    {/* always keep at bottom*/}
                    
                 </Switch>
             </BrowserRouter> 
        </div>
    )
}
