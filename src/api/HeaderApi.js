import Config from '../config';
import http from './@axios';
import axios from 'axios';

class HeaderApi{
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

    searchAutoCompleteGET(_term){
        return http.get('Product/SearchAutoComplete',{
           
            params:{
                term:_term
            } 
        })
    }
     
    cartListGET(){
        
        var _guestId,_custId;
        if(this._gustId==null) _guestId='';
        if(this.custId ==null) _custId=''
        return http.get('Order/CartList',{
            params:{
                cusId:this._custId,
                guestId:_guestId,
            }  
        })
    }
    WishListGET(){
       
        var _guestId,_custId;
        if(this._gustId==null) _guestId='';
        if(this.custId ==null) _custId=''
        return http.get('Order/WishLists',{
            params:{
                custId:this._custId,
                guestId:_guestId,
            }  
        })
    }

    deliveryLocationsGET(_term){
        return http.get('Customer/getPincodeList',{
            params:{
                term:_term
            }  
        })
    }
    removeCartItemGET(_itemId){
        
        return http.get('Order/RemoveCartItem',{
            params:{
                cartItemId:_itemId
            }  
        })
    }

    ADDCartItemQuantityGET(_itemId){
        return http.get('Order/CartItemAddQty',{
            params:{
                cartItemId:_itemId
            }  
        })
    }

    SUBCartItemQuantityGET(_itemId){
        return http.get('Order/CartItemSubQty',{
            params:{
                cartItemId:_itemId
            }  
        })
    }

    cartSummeryGET(){
        
        var _guestId,_custId;
        if(this._gustId==null) _guestId='';
        if(this.custId ==null) _custId=''
        return http.get('Order/CartSummary',{
            params:{
                cusId:this._custId,
                guestId:_guestId,
                vendorurlkey:Config.Headers.vendorurlkey
            }  
        })
    }

   
    async loginPOST(payload){
        return new Promise((resolve, reject) => {

            axios.post(`${Config.appBaseUrl}Account/Login`,payload,Config.Headers).then(function(response){
                if(response.status=='200'){
                
                 localStorage.setItem('custId',response.data.Data.custId);
                 localStorage.setItem('customer_token',response.data.Data.token);
                 localStorage.setItem('custInfo',JSON.stringify(response.data.Data));
                               
               }
               
              return  resolve(response);
             }).catch(function(error){
        
                return  reject(error);
             });
   
         });
    }
   
}



export default new HeaderApi();