import Config from '../config';
import http from './@axios';

class ProductCardApi{
 
    addProductQuantityPOST(_urlKey){
        return http.post('Order/CartItemAddQtyByUrlKey',{
                custId:Config.customerId,
                guestId:Config.guestId, 
                urlKey:_urlKey,
        })
    }

    removeFromWishList(_urlKey){
         return http.post(`Order/InsertWishListsDel?custId=${Config.customerId}&guestId=${Config.guestId}&urlKey=${_urlKey}`,{
            custId:Config.customerId,
            guestId:Config.guestId, 
            urlKey:_urlKey,
        })
    }

    subProductQuantityPOST(_urlKey){
        return http.post('Order/CartItemSubQtyByUrlKey',{
                custId:Config.customerId,
                guestId:Config.guestId, 
                urlKey:_urlKey,
        })
    }

    addToCartPOST(_urlKey){
        return http.post('Order/AddToCart',{
            cusId:Config.customerId,
            guestId:Config.guestId,
            pincode:"",
            productQty: 1,
            urlKey:_urlKey,
            vendorUrlkey:Config.Headers.vendorurlkey
        })
    }

}

export default new ProductCardApi();