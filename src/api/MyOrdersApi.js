import Config from '../config';
import http from './@axios';
class MyOrdersApi {
      orderListGET(){
        return http.get(`Order/CustOrderList?cusId=${Config.customerId}`);
      }
      
      orderDetailsGET(_orderId){ 
        return http.get(`Order/CustOrderItemList?orderId=${_orderId}`);
      }
     
      
}

export default new MyOrdersApi();
