import Config from '../config';
import http from './@axios';
class ChangePasswordApi{
    changePasswordPOST(_oldPassword,_newPassword){
        return http.post('customer/ChangePassword',{
            custId:Config.customerId,
            newPassword:_newPassword,
            oldPassword:_oldPassword
        })
      }
   
}

export default new ChangePasswordApi();
