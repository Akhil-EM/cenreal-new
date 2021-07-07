var customerID=''
var guestID=''
var customerDetails=JSON.parse(localStorage.getItem('custInfo'));

if(customerDetails != null){
    customerID=(customerDetails.custId);
}else{   
    guestID=localStorage.getItem('gustId');
}

module.exports={
    appBaseUrl:'http://wpr.intertoons.net/centrealapi/api/v2/',
    imageUrlBase:'http://wpr.intertoons.net/centrealadmin/',
    // frontEndUrl:'http://localhost:5000',https://react.intertoons.in/
    frontEndUrl:'https://react.intertoons.in/',
    Headers:{
        "Content-type": "application/json",
        'Accept': 'application/json',
        'lang':'1',
        'vendorurlkey':'centrealkochi',
        'token':localStorage.getItem('customer_token')
    },
    customerId:customerID,
    guestId:guestID
}