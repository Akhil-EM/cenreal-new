import Config from '../config';
import http from './@axios';
import axios from 'axios';

class HeaderApi{
    searchAutoCompleteGET(_term){
        return http.get('Product/SearchAutoComplete',{
           
            params:{
                term:_term
            } 
        })
    }
     
    cartListGET(){
        return http.get('Order/CartList',{
            params:{
                cusId:Config.customerId,
                guestId:Config.guestId,
            }  
        })
    }
    WishListGET(){
        return http.get('Order/WishLists',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId,
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
        return http.get('Order/CartSummary',{
            params:{
                cusId:Config.customerId,
                guestId:Config.guestId,
                vendorurlkey:Config.Headers.vendorurlkey
            }  
        });
    }

    categoryGET(){
        return http.get('Category')
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