import http from './@axios';

class ProductDetailApi{
    _custId=null
    _gustId=null
    constructor(){
        
        var custDetails=JSON.parse(localStorage.getItem('custInfo'));
        
        if(custDetails != null){
           this._custId=custDetails.custId;
        }else{
            this._gustId=localStorage.getItem('gustId');
        }
    }
    productDetailsGET(_urlKey){

        var _gustId,_custId;
        if(this._gustId==null) _gustId='';
        if(this.custId ==null) _custId=''
        return http.get('ProductDetails',{
            params:{
                custId:this._custId,
                guestId:_gustId,
                urlKey:_urlKey
            }
        })
    }
    
    featuredProductGET(){
        
        var _gustId,_custId;
        if(this._gustId==null) _gustId='';
        if(this.custId ==null) _custId=''
        return http.get('FeaturedProduct',{
            params:{
                custId:this._custId,
                guestId:_gustId,
            }
        })
    }
    
    recentProductsGET(){
        
        var _gustId,_custId;
        if(this._gustId==null) _gustId='';
        if(this.custId ==null) _custId=''
        return http.get('RecentProducts',{
            params:{
                custId:this._custId,
                guestId:_gustId,
                
            }
        })
    }
    relatedProductsGET(_urlKey){

        var _gustId,_custId;
        if(this._gustId==null) _gustId='';
        if(this.custId ==null) _custId=''
        return http.get('RelatedProducts',{
            params:{
                custId:this._custId,
                guestId:_gustId,
                urlKey:_urlKey
            }
        })
    }
  
}



export default new ProductDetailApi();