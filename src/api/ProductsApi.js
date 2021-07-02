import Config from '../config';
import http from './@axios';
class ProductsApi{

    categoryGET(){
       return http.get('Category');
    }

    searchFilterPOST(_currentPage,_filter,_filterValues,_pageSize,_sortOrder,_minPrice,_maxPrice){
        return http.post('Product/SearchFilter',{
                    currentpage:_currentPage,
                    custId:Config.customerId,
                    filter:_filter,
                    filtervalues:_filterValues,
                    guestId:Config.guestId,
                    pagesize:_pageSize,
                    sortorder:_sortOrder,
                    vendorUrlKey:Config.Headers.vendorurlkey,
                    maxPrice:_maxPrice,
                    minPrice:_minPrice})
    }

    searchPOST(_currentPage,_filter,_filterValues,_pageSize,_sortOrder,_minPrice,_maxPrice){
        return http.post('Product/Search',{
                    currentpage:_currentPage,
                    custId:Config.customerId,
                    filter:_filter,
                    filtervalues:_filterValues,
                    guestId:Config.guestId,
                    pagesize:_pageSize,
                    sortorder:_sortOrder,
                    vendorUrlKey:Config.Headers.vendorurlkey,
                    maxPrice:_maxPrice,
                    minPrice:_minPrice})
    }
    
    
}


export default new ProductsApi();