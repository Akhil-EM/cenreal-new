import Config from '../config';
import http from './@axios';

class CartApi{
    _custId=null
    _gustId=null
    constructor(){
        
        var custDetails=JSON.parse(localStorage.getItem('custInfo'));
        
        if(custDetails != null){
           this._custId=custDetails.custId;
        }else{
            this._gustId=localStorage.getItem('gustId');
        }
    }

     
    saveForLaterListGET(){
        var _guestId,_custId;
        if(this._gustId==null) _guestId='';
        if(this.custId ==null) _custId=''
        return http.get('Order/saveForLaterList',{
            params:{
                custId:this._custId,
                guestId:_guestId,
            }  
        })
    }

    moveToCartPOST(_urlKey){
        var _guestId,_custId;
        if(this._gustId==null) _guestId='';
        if(this.custId ==null) _custId=''
        return http.post('Order/MoveFromSaveForLaterToCart',{
                cusId:this._custId,
                guestId:_guestId, 
                productQty: 1,
                urlKey:_urlKey,
                vendorUrlKey:Config.Headers.vendorurlkey
        })
    }

    recentProductsGET(){
        var _gustId,_custId;
        if(this._gustId==null) _gustId='';
        if(this.custId ==null) _custId=''
        return http.get('RecentProducts',{
            params:{
                custId:this._custId,
                guestId:_gustId
            }
        })
    }
 
   
}



export default new CartApi();