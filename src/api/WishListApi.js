import Config from '../config';
import http from './@axios';
class WishListApi{
    
    wishListGET(){
        return http.get(`Order/WishLists?custId=${Config.customerId}&guestId=${Config.guestId}`);
    }
   
}

export default new WishListApi();
