import Config from '../config';
import http from './@axios';
class MyOrdersApi {
      orderListGET(){
        return http.get(`Order/CustOrderList?cusId=${Config.customerId}`);
      }

     
      
}

export default new MyOrdersApi();
