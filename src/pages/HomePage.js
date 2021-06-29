import React, { Component } from 'react'
import Header from '../components/Header';
import Carousel from '../components/CarouselMain';
import HomePageApi from '../api/HomePageApi';
import CategoryCard from '../components/CategoryCard';
import HotDealBanner from '../components/HotDealBanner'; 
import {imageUrlBase} from '../config';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import ProductCard from '../components/ProductCard';
import BrandCard from './BrandCard';
import Footer from '../components/Footer';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            MainBanners:[],
            MobileMainBanners:[],
            TopCategories:[],
            Promo21:[],
            Promo31:[],
            PromoFull:[],
            MobilePromoFull:[],
            DailyShop1:[],
            DailyShop2:[],
            PopupBanner:[],
            deviceWidth:0,
            TopCategoryList:[],
            PopularProductList:[],
            BrandList:[],
            DealOfDayList:[],
            OwlCarouselOptions: {
              loop:false,
              margin:0,
              nav: false,
              dots:false,
              center:false,
              responsive: {
                  0: {
                      items: 1,
                  },
                  600: {
                      items: 3,
                  },
                  1000: {
                      items: 5,
                  },
              },
           }
        }
    }
    componentWillMount(){
       this.getInitialData();
    }

    getInitialData(){
        HomePageApi.homeProductsGET()
                    .then((response)=>{
                    let serverData=response.data.Data;
                        this.setState({
                            MainBanners:serverData.MainBanners,
                            MobileMainBanners:serverData.MobileMainBanners,
                            TopCategories:serverData.TopCategories,
                            Promo21:serverData.Promo21,
                            Promo31:serverData.Promo31,
                            PromoFull:serverData.PromoFull,
                            MobilePromoFull:serverData.MobilePromoFull,
                            DailyShop1:serverData.DailyShop1,
                            DailyShop2:serverData.DailyShop2,
                            PopupBanner:serverData.PopupBanner,
                        })
                    }).catch((err)=>{
                     console.log(err)
                    });

        
        HomePageApi.topCategoryGET()
                    .then((response)=>{
                        // console.log(response)
                       this.setState({TopCategoryList:response.data.Data});
                    }).catch((err)=>{
                       console.log(err)
                    });

        HomePageApi.dealOfTheDayGET()
                .then((response)=>{
                    this.setState({DealOfDayList:response.data.Data});
                }).catch((err)=>{
                    console.log(err)
                })   
                
        HomePageApi.popularProductGET()
                .then((response)=>{
                  this.setState({PopularProductList:response.data.Data});
                }).catch((err)=>{
                    console.log(err);
                });

        HomePageApi.BrandListGET()
                .then((response)=>{
                  this.setState({BrandList:response.data.Data});
                }).catch((err)=>{
                    console.log(err);
                });
    }


    render() {
        return (
            <div className='container-fluid p-0 m-0'>
                  <Header/>
                  {/* banner main */}
                  {
                     this.state.MainBanners.length <0 ? ''
                     :(
                         <Carousel resStyles={'d-none d-lg-block'} itemArray={this.state.MainBanners}/>
                     )
                  }

                  {/* mobile banner*/}
                  {
                     this.state.MobileMainBanners.length <0 ? ''
                     :(
                         <Carousel resStyles={'d-block d-lg-none'} itemArray={this.state.MobileMainBanners}/>
                     )
                  }
                  <h3 className='ml-3'>SHOP FROM TOP CATEGORIES</h3>
                  <hr/>
                  <br/>
                  {/* top category list */}
                  {
                        this.state.TopCategoryList.length <0 ? ''
                        :(   
                            
                               <CategoryCard  owlOps={this.state.OwlCarouselOptions} list={this.state.TopCategoryList}/>
                             
                         )
                  }
                  <h3>HOT DEALS</h3>
                  <hr/>
                  {
                        this.state.DealOfDayList.length <0 ? ''
                        :(
                            <HotDealBanner owlOps={this.state.OwlCarouselOptions} list={this.state.DealOfDayList}/>
                         )
                  }
                  <br/>
                  <br/>
                  {
                     this.state.Promo21.length && (
                      <div className='container-fluid' >   
                        <OwlCarousel className='owl-theme' items={2} loop={false} margin={10} dots={false} nav={false}>
                         {
                           this.state.Promo21.map((item,key)=>(
                             <div key={key} className='item text-center'>
                                <img src={imageUrlBase+item.imageUrl} alt={item.elementName} ></img>
                                <a href={item.catName}>{item.catName}</a>
                            </div>
                           ))
                         }        
                        </OwlCarousel>
                        
                       </div>
                       
                      )
                      
                     
                  }
                   <br></br>
                 <div className="text-center">
                    <h3 >BEST SELLERS</h3>
                    <div className="border-container">
                      <p className='green-border'>SO YOU GET ME TO KNOW ME BETTER</p>
                    </div>
                    <hr></hr>
                 </div>
                 {
                      this.state.PopularProductList.length && (
                        <div className='container-fluid' >   
                          <OwlCarousel className='owl-theme'  {...this.state.OwlCarouselOptions}>
                           {
                             this.state.PopularProductList.map((item,key)=>(
                               <ProductCard price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                             ))
                           }        
                          </OwlCarousel>
                          
                         </div>
                         
                        )
                  }
                  <br/>
                  <h3>DAILY SHOPPING</h3>
                  <hr></hr>
                  {
                     this.state.DailyShop2.length && (
                      <div className='container-fluid' >   
                        <OwlCarousel className='owl-theme' items={2} loop={false} margin={10} dots={false} nav={false}>
                         {
                           this.state.DailyShop2.map((item,key)=>(
                             <div key={key} className='item text-center'>
                                <img src={imageUrlBase+item.imageUrl} alt={item.elementName} ></img>
                                <a href={item.catName}>{item.catName}</a>
                            </div>
                           ))
                         }        
                        </OwlCarousel>
                        
                       </div>
                       
                      )
                      
                     
                  }
                  <br/>
                  <h3>TRENDING BRANDS</h3>
                  <hr></hr>
                  {
                        this.state.BrandList.length && (
                          <div className='container-fluid' >   
                            <OwlCarousel className='owl-theme' responsive={this.state.responsive} loop={false} margin={10} dots={false} nav={false}>
                             {
                               this.state.BrandList.map((item,key)=>(
                                 <div>
                                  
                                    <BrandCard key={key} image={item.imageUrl} altr={item.attrValue}/>
                                 </div>
                                 
                               ))
                             }        
                            </OwlCarousel>
                            
                           </div>
                           
                          )
                  }
                  <br></br>
                  <br></br>
                  <Footer />
             </div>
        )
    }
}
