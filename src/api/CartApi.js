import Config from '../config';
import http from './@axios';

class CartApi{
 
    
    saveForLaterListGET(){
        return http.get('Order/saveForLaterList',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId,
            }  
        })
    }

    moveToCartPOST(_urlKey){
        return http.post('Order/MoveFromSaveForLaterToCart',{
                cusId:Config.customerId,
                guestId:Config.guestId, 
                productQty: 1,
                urlKey:_urlKey,
                vendorUrlKey:Config.Headers.vendorurlkey
        })
    }

    recentProductsGET(){
        return http.get('RecentProducts',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId
            }
        })
    }

    couponListGET(){
        return http.get('CouponList',{
            params:{
                custId:Config.customerId,                
            }
        })
    }
    
    applyCouponPOST(_code){
        return http.post('Order/ApplyCouponCode',{
            ccode:_code,
            custId:Config.customerId,
            vendorurlkey:Config.Headers.vendorurlkey
        })
    }
    
   
}

export default new CartApi();