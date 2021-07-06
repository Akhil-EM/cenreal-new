import Config from '../config';
import http from './@axios';
class CouponApi{
    
    couponListGET(){
        return http.get(`CouponList?custId=${Config.customerId}`);
    }
   
}

export default new CouponApi();
