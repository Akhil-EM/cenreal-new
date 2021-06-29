import Config from '../config';
import http from './@axios';
class ProductsApi{


    constructor(){
        var customerDetails=JSON.parse(localStorage.getItem('custInfo'));
        
        if(customerDetails != null){
           this.customerID=customerDetails.custId;
        }else{
            console.log(localStorage.getItem('gustId'))
            this.guestID=localStorage.getItem('gustId');
        }
    }

    categoryGET(){
       return http.get('Category');
    }

    searchFilterPOST(_currentPage,_filter,_filterValues,_pageSize,_sortOrder){
        return http.post('Product/SearchFilter',{
                    currentpage:_currentPage,
                    custId:this.customerID,
                    filter:_filter,
                    filtervalues:_filterValues,
                    guestId:this.guestID,
                    pagesize:_pageSize,
                    sortorder:_sortOrder,
                    vendorUrlKey:Config.Headers.vendorurlkey})
    }

    searchPOST(_currentPage,_filter,_filterValues,_pageSize,_sortOrder){
        return http.post('Product/Search',{
                    currentpage:_currentPage,
                    custId:this.customerID,
                    filter:_filter,
                    filtervalues:_filterValues,
                    guestId:this.guestID,
                    pagesize:_pageSize,
                    sortorder:_sortOrder,
                    vendorUrlKey:Config.Headers.vendorurlkey})
    }
    
    
}


export default new ProductsApi();