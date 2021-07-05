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
                    <Route component={ErrorPage}/>
                    {/* always keep at bottom of switch */}
                    
                 </Switch>
             </BrowserRouter> 
        </div>
    )
}
