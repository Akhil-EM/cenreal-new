import http from './@axios';
import Config from '../config';
class HomePageApi{

    

    homeProductsGET(){
        return http.get('Products/HomeProducts')
    }

    topCategoryGET(){
         return http.get('category/TopCategory');
    }
    categoryListGET(){
        
        return http.get('Category');
    }

    dealOfTheDayGET(){
        return http.get('DealOfDay',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId
            }
        })
    }
    
    popularProductGET(){
        return http.get('PopularProduct',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId
            }
        })
    }
    
    BrandListGET(){
        return http.get('BrandList',{
            params:{
                custId:Config.customerId,
                guestId:Config.guestId
            }
        })
    }
}



export default new HomePageApi();