import Config from '../config';
import http from './@axios';
class ProfileApi{

      customerDetailsGET(){
        return http.get(`CustomerDetails?custId=${Config.customerId}`);
      }

      updateProfilePOST(_customerName,_emailId,_phone){
        return http.post('ProfileUpdate',{
            custId:Config.customerId,
            custName:_customerName,
            emailId:_emailId,
            phoneNo:_phone
        })
      }
}


export default new ProfileApi();