import Config from '../config';
import http from './@axios';
class AddressApi{

      customerAddressGET(){
        return http.get(`Order/CusAddressList?cusId=${Config.customerId}`);
      }

      deleteAddressGET(_deleteAddressId){
        return http.get(`Customer/DelAddress/${_deleteAddressId}`)
      }

      updateAddressPOST(_addressLine1,_addressLine2,_addressType,_area,_areaId,_area_id,_country,_custAdressId,
                       _district,_firstName,_lastName,_isDefaultBillingAddress,_isDefaultShippingAddress,
                       _landmark,_latitude,_longitude,_phone,_pincode,_state){
        return http.post('Customer/UpdateAddress',{
            addLine1:_addressLine1,
            addLine2:_addressLine2,
            addressType:_addressType,
            area:_area,
            areaId:_areaId,
            area_id:_area_id,
            country:_country,
            custAdressId:_custAdressId,
            custId:Config.customerId,
            district:_district,
            firstName:_firstName,
            isDefaultBillingAddress:_isDefaultBillingAddress,
            isDefaultShippingAddress:_isDefaultShippingAddress,
            landmark:_landmark,
            lastName:_lastName,
            latitude:_latitude,
            longitude:_longitude,
            phone:_phone,
            pincode:_pincode,
            state:_state,
      })
      }
}


export default new AddressApi();