import Config from '../config';
import http from './@axios';
class CheckoutApi{
    
  updateDeliveryModeGET(_deliveryMode){
      return http.get('Order/UpdateDeliveryMode',{
         params:{
            custId:Config.customerId,
            deliveryMode:_deliveryMode
         }
      });
  }

  vendorsListGET(){
      return http.get('Vendor/vendorsList');
  }

  customerAddressListGET(){
      return http.get('Order/CusAddressList',{
          params:{
            cusId:Config.customerId
          }
      });
  }
   
}

export default new CheckoutApi();