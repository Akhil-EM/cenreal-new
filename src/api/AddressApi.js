import Config from '../config';
import http from './@axios';
class AddressApi{

      customerAddressGET(){
        return http.get(`Order/CusAddressList?cusId=${Config.customerId}`);
      }

      deleteAddressGET(_deleteAddressId){
        return http.get(`Customer/DelAddress/${_deleteAddressId}`)
      }

      updateAddressPOST(_addLine1,_addLine2,_areaId,_country,
                        _custAdressId,_district,_firstName,_isDefaultBillingAddress,
                        _isDefaultShippingAddress,_lastName,_latitude,_longitude,
                        _phone,_pincode,_state,_area){
        //   console.log('api area',_area)
        //  let userObj={
        //   addLine1:_addLine1,
        //   addLine2:_addLine2,
        //   addressType: "",
        //   area:_area,
        //   areaId:_areaId,
        //   country:_country,
        //   custAdressId:_custAdressId,
        //   custId:Config.customerId,
        //   district:_district,
        //   firstName:_firstName,
        //   isDefaultBillingAddress:_isDefaultBillingAddress,
        //   isDefaultShippingAddress:_isDefaultShippingAddress,
        //   landmark:"",
        //   lastName:_lastName,
        //   latitude:_latitude,
        //   longitude:_longitude,
        //   phone:_phone,
        //   pincode:_pincode,
        //   state:_state
        //  }
        //  console.log(userObj);

        return http.post('Customer/UpdateAddress',{
                        addLine1:_addLine1,
                        addLine2:_addLine2,
                        addressType: "",
                        area:_area,
                        areaId:_areaId,
                        country:_country,
                        custAdressId:_custAdressId,
                        custId:Config.customerId,
                        district:_district,
                        firstName:_firstName,
                        isDefaultBillingAddress:_isDefaultBillingAddress,
                        isDefaultShippingAddress:_isDefaultShippingAddress,
                        landmark:"",
                        lastName:_lastName,
                        latitude:_latitude,
                        longitude:_longitude,
                        phone:_phone,
                        pincode:_pincode,
                        state:_state})
      }

      addNewAddress(_addressLine1,_addressLine2,_area,_areaId,_country,
                    _district,_firstName,_isDefaultBillingAddress,
                    _isDefaultShippingAddress,_lastName,_latitude,
                    _longitude,_phone,_pincode,_state){
         return http.post('NewAddress',{
            addLine1:_addressLine1,
            addLine2:_addressLine2,
            addressType: "",
            area:_area,
            areaId:_areaId,
            country:_country,
            custAdressId: "",
            custId:Config.customerId,
            district:_district,
            firstName:_firstName,
            isDefaultBillingAddress:_isDefaultBillingAddress,
            isDefaultShippingAddress:_isDefaultShippingAddress,
            landmark: "",
            lastName:_lastName,
            latitude: "",
            longitude: "",
            phone:_phone,
            pincode:_pincode,
            state:_state,
         })

        ///to test values
        // let obj={ addLine1:_addressLine1,
        //   addLine2:_addressLine2,
        //   addressType: "",
        //   area:_area,
        //   areaId:_areaId,
        //   country:_country,
        //   custAdressId: "",
        //   custId:Config.customerId,
        //   district:_district,
        //   firstName:_firstName,
        //   isDefaultBillingAddress:_isDefaultBillingAddress,
        //   isDefaultShippingAddress:_isDefaultShippingAddress,
        //   landmark: "",
        //   lastName: "E M",
        //   latitude: "",
        //   longitude: "",
        //   phone:_phone,
        //   pincode:_pincode,
        //   state:_state,}

        //   console.log(obj)
      }
      
      deliverableLocationsGET(_term){
          return http.get(`Customer/getPincodeList?term=${_term}`);
      }

}


export default new AddressApi();