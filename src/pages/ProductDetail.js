import React, { Component } from 'react';
import ProductDetailApi from '../api/ProductDetailApi';
import Header from '../components/Header';
import {RiArrowDropRightLine} from 'react-icons/ri';
import {AiOutlineShoppingCart,AiFillHeart} from 'react-icons/ai'
import{FaFacebookF,FaWhatsapp} from 'react-icons/fa';
import{FiMail,FiInstagram} from 'react-icons/fi'
import refundImg from '../assets/img/refund-icon.png'
import rupeeImg from '../assets/img/rupees-icon.png'
import deliveryImg from '../assets/img/quick-delivery-icon.png'
import '../assets/css/product-detail.css'
import { imageUrlBase,frontEndUrl} from '../config';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import ProductCard from '../components/ProductCard';
import ProductCardSimple from '../components/ProductCardSimple'
import Footer from '../components/Footer'
import { withRouter } from 'react-router';

class ProductDetail extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
             product:'',
             productUrl:'',
             productCategory:'',
             productCategoryUrl:'',
             ProductDetails:{},
             ProductImages:[],
             featuredProductList:[],
             relatedProductList:[],
             essentialsList:[],
             recentProductList:[],
             LargeImageKey:0,
             Brand:'',
             specs:[],
             Price:null,
             productDescription:'',
             options: {
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
        
       this.getInitializeData();

    }
     

    getInitializeData(){
         var prodUrl=this.props.match.params.productUrl;
         var ProdDetails;
         ProductDetailApi.productDetailsGET(prodUrl)
                         .then((response)=>{
                             ProdDetails=response.data.Data.ProdDetails;
                             var unitPrice=response.data.Data.ProdDetails.unitPrice;
                             this.setState({loading:true,
                                            product:response.data.Data.ProdDetails.prName,
                                            productUrl:response.data.Data.ProdDetails.urlKey,
                                            productCategory:response.data.Data.ProdDetails.catName,
                                            productCategoryUrl:response.data.Data.ProdDetails.catUrlKey,
                                            ProductImages:response.data.Data.ProdImages,
                                            specs:response.data.Data.specDetails,
                                            productDescription:response.data.Data.ProdDetails.description,
                                            Price:unitPrice});
                                            
                         }).catch((error)=>{
                             console.log(error)
                         })
         
        ProductDetailApi.featuredProductGET()
                          .then((response)=>{
                              
                              this.setState({featuredProductList:response.data.Data})
                          }).catch((error)=>{
                              console.log(error)
                          });
                    
        ProductDetailApi.relatedProductsGET(prodUrl)
                        .then((response)=>{
                            ///console.log(response);
                            this.setState({relatedProductList:response.data.Data.RelatedList});
                        }).catch((error)=>{
                            console.log(error)
                        })
        ProductDetailApi.relatedProductsGET('home-care--cleaning')
                        .then((response)=>{
                            ///console.log(response);
                            this.setState({essentialsList:response.data.Data.RelatedList});
                        }).catch((error)=>{
                            console.log(error)
                        })

    ProductDetailApi.recentProductsGET()
                        .then((response)=>{
                            this.setState({recentProductList:response.data.Data})
                        }).catch((error)=>{
                            console.log(error)
                        });
         
    }
    
    navigateTo(_navigateTo){
        this.props.history.push(`/${_navigateTo}`);         
        window.location.reload();
    }

    render() {
        let imageArray=this.state.ProductImages;
        let specArray=this.state.specs;
        let featuredProductArray=this.state.featuredProductList;
        let relatedList=this.state.relatedProductList;
        let prodDisc=this.state.productDescription;
        let essentialList=this.state.essentialsList;
        let recentList=this.state.recentProductList;
        let price =this.state.Price;
        prodDisc=prodDisc.slice(3,prodDisc.length-6);
       
         return (
            <div className=''>
              <Header />
              <div className='p-2'>
                 <div className='anchor-nav d-none d-lg-block'>
                     <a href='#'>Home</a>
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                     <a href={this.state.productCategoryUrl}>{this.state.productCategory}</a>
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                     <a href={this.state.productUrl}>{this.state.product}</a>
                     <hr/>
                 </div>
                 <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4  p-0">
                            <div className='d-flex'>
                                <div className='' style={{width:'20%'}}>
                                     {
                                        imageArray.length <=0 ?''
                                        :imageArray.map((item,key)=>(
                                            
                                           <img className='short-img-style' src={imageUrlBase+item.imageUrl} alt='' key={key}/>
                                        ))
                                     }
                                     
                                </div>
                                <div className='' style={{width:'80%'}}>
                                    {
                                         imageArray.map((item,key)=>(
                                            
                                            <img className='large-img-style' src={imageUrlBase+item.imageUrl} alt='' key={key}/>
                                         ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 p-0">
                            <h3>{this.state.product}</h3>
                            <div className='d-flex'>
                                {
                                    specArray.length <=0?''
                                    :specArray.map((item,key)=>(
                                       
                                           item.attrValue=='N/A'?'':
                                           <p style={{marginRight:'10px'}}><span style={{fontWeight:'bold'}}>{item.attrName} </span>: {item.attrValue}</p>
                                            
                                       
                                     ))
                                }
                            </div>
                            <h3>Rs.{this.state.Price}</h3>
                            <br/>
                            <br/>
                            <p>{this.state.product}</p>
                            <div  className='d-flex '>
                                <button style={{marginRight:'25px'}} className='btn btn-success '>
                                    <span style={{fontSize:'1.5em'}}>
                                      <AiOutlineShoppingCart/>
                                    </span>
                                    Add to Cart
                                </button>
                                <button className='btn btn-danger'>
                                    <span style={{fontSize:'1.5em'}}>
                                      <AiFillHeart/>
                                    </span>
                                    Add to Wishlist
                                </button>  
                            </div>
                            <br/>
                            <div className='share-product'>
                                <h5>Share This Product</h5>
                                <div className='d-flex'>
                                    <div className='icon-cont bg-primary'>
                                         <FaFacebookF/>
                                    </div>
                                    <div className='icon-cont bg-secondary'>
                                         <FiMail/>
                                    </div>
                                    <div className='icon-cont bg-success'>
                                         <FaWhatsapp/>
                                    </div>
                                    <div className='icon-cont bg-danger'>
                                         <FiInstagram/>
                                    </div>
                                </div>
                                <br/>
                                <div className='why-block'>
                                    <h4>Why shop from Centreal Bazaar ?</h4>
                                    <ul>
                                        <li className='d-flex'>
                                            <img src={refundImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Easy returns & refunds<br/>
                                               Return products at doorstep and get refund in minutes.
                                               </h6>
                                        </li>
                                        <li className='d-flex'>
                                            <img src={rupeeImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Best quality products<br/>
                                                Get best quality products at lowest price.</h6>
                                        </li>
                                        <li className='d-flex'>
                                            <img src={deliveryImg} alt='refund' width={40} height={40} style={{marginRight:'5px'}}/>
                                            <h6>Quick delivery<br/>
                                                Get products delivered to your doorsteps in no time.</h6>
                                        </li>
                                    </ul>
                                </div>
                                <h6>{prodDisc}</h6>
                            </div>
                        </div>
                        <div className="col-sm-2  pl-4">
                            <div className="card" style={{width: '%',marginLeft:'20px',padding:'10px'}}>
                                 <h5 className='text-center  mb-4 '>Featured Items</h5>
                                 {
                                     featuredProductArray.length <=0 ?''
                                     :featuredProductArray.map((item,key)=>(
                                        key<2?
                                        <div key={key} className="card text-center p-4" style={{width: '100%',borderRadius:'8px',marginBottom:'15px'}}>
                                           
                                           <img src={imageUrlBase+item.imageUrl} alt={item.prName}/>
                                           <p  onClick={(()=>this.navigateTo('product-detail/'+item.urlKey))} href={`${frontEndUrl+'/Product-detail/'+item.urlKey}`}>{item.prName}</p>
                                           <br/>
                                           <h6 className='text-start'>Rs.{item.unitPrice}</h6>
                                        </div>
                                        :''
                                     ))
                                 }
                                
                            </div>   
                        </div>
                    </div>
                  </div>
                  <h4>Customers who viewed this item also viewed</h4>
                   <hr/>
                  <br/>
                  {
                      recentList.length >0? (
                        <div className='container-fluid' >   
                          <OwlCarousel className='owl-theme'  {...this.state.options}>
                           {
                             recentList.map((item,key)=>(
                               <ProductCardSimple price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                             ))
                           }        
                          </OwlCarousel>
                          
                         </div>
                         
                        ):''
                  }
                  <br/>
                  <br/>
                  <br/>
                  <h4>IHOME & KITCHEN ESSENTIALS</h4>
                   <hr/>
                  <br/>
                  {
                      essentialList.length >0? (
                        <div className='container-fluid' >   
                          <OwlCarousel className='owl-theme'  {...this.state.options}>
                           {
                             essentialList.map((item,key)=>(
                               <ProductCard price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                             ))
                           }        
                          </OwlCarousel>
                          
                         </div>
                         
                        ):''
                  }
                  <br/>
                  <br/>
                  <br/>
                  <h4>INSPIRED BY YOUR BROWSING HISTORY</h4>
                   <hr/>
                  <br/>
                  {
                      relatedList.length >0? (
                        <div className='container-fluid' >   
                          <OwlCarousel className='owl-theme'  {...this.state.options}>
                           {
                             relatedList.map((item,key)=>(
                               <ProductCard price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                             ))
                           }        
                          </OwlCarousel>
                          
                         </div>
                         
                        ):''
                  }
                  <br/>
                  <Footer/>
              </div>  
            </div>
        )
    }

    
}

export default withRouter(ProductDetail);