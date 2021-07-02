import http from './@axios';
import Config from '../config';
class ProductDetailApi{
    productDetailsGET(_urlKey){
        
        return http.get('ProductDetails',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId,
                urlKey:_urlKey
            }
        })
    }
    
    featuredProductGET(){
        
        return http.get('FeaturedProduct',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId
            }
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
    relatedProductsGET(_urlKey){

       
        return http.get('RelatedProducts',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId,
                urlKey:_urlKey
            }
        })
    }
  
}



export default new ProductDetailApi();