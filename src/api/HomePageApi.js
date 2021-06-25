import http from './@axios';

class HomePageApi{
    
    constructor(lang,vendorurlkey,token){
        this._lang=1;
        this._venderUrlKey='centrealkochi';
        this._token=null;
    }
     _lang
     _venderUrlKey;
     _token;
    homeProductsGET(){
        return http.get('Products/HomeProducts')
    }

    topCategoryGET(){
         return http.get('category/TopCategory');
    }
    categoryListGET(){
        
        return http.get('Category');
    }

    dealOfTheDayGET(){
        return http.get('DealOfDay',{
            params:{
                custId:'',
                guestId:'ai6y3xy'
            }
        })
    }
    
    popularProductGET(){
        return http.get('PopularProduct',{
            params:{
                custId:'',
                guestId:'ai6y3xy'
            }
        })
    }
    
    BrandListGET(){
        return http.get('BrandList',{
            params:{
                custId:'',
                guestId:'ai6y3xy'
            }
        })
    }
}



export default new HomePageApi;