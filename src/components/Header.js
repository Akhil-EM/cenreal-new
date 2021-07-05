import React,{Component} from 'react'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from './Badge';
import SearchItemLoader from './SearchItemLoader'
import { AiOutlineHeart,AiOutlineClose,AiOutlineUnorderedList,
         AiOutlineSearch} from 'react-icons/ai';
import {FiShoppingBag} from 'react-icons/fi'
import {FaRegUser} from 'react-icons/fa';
import {FcMenu} from 'react-icons/fc';
import {BiCurrentLocation,BiSearch,BiUserCircle} from 'react-icons/bi';
import Login from './Login';
// import ForgotPassword from './ForgotPassword';
// import LoginWithOtp from './LoginWithOtp';
import HeaderApi from '../api/HeaderApi';

import Radium, {StyleRoot} from 'radium';
import {slideOutRight,slideOutLeft,slideInLeft} from 'react-animations';
import { withRouter} from "react-router-dom";
import '../assets/css/header.css';
import '../assets/css/animate.css'

import CartItem from './CartItem';

const styles={
    cartCount:{
        backgroundColor:'#fff',
        color:'black',
        padding:'0',
        width:'35px',
        height:'35px',
        textAlign:'center',
        borderRadius:'50%',
        marginLeft:'15px' 
    }
}
class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
             searchProducts:[],
             cartList:[],
             wishList:[],
             deliveryList:[],
             searchBoxDisplay:'none',
             searchLoadDisplay:'none',
             searchTerm:'',
             show:false,
             showDeliveryLocationBox:false,
             DellistDisplay:'none',
             loginBtnDisp:'',
             userNameDisp:'none',
             userName:'',
             currentDeliveryLocation:'',
             minCartStyle:{display:'none'},
             minCartDisplayed:false,
             cartSubTotal:0,
             cartSummery:[],
             categoryList:[],
             deliverLocation:'',
             delLocationId:null,
             delLocationPincode:null,
             mainMenuStyle:{display:'none'},
             searchMenuStyle:{display:'none'},
             searchMenuOpen:false    
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.preSettings=this.preSettings.bind(this);
        this.changeSearchValue=this.changeSearchValue.bind(this);

        this.length=0;
        
    }

    navigateTo(_navigateTo){
        if((window.location.href).search('cart')>0){
            //closes mini cart on cart page
            this.EndAnimation();
        }else{
            this.props.history.push(`/${_navigateTo}`);
        }
         
          
    }
    navigateToLocations(){
        this.handleDeliveryLocationBoxClose();
        this.props.history.push(`/locations`);
    }

    componentWillMount(){
        this.preSettings();
    }
    
    StartAnimation=()=>{
        this.setState({minCartStyle:{display:'none'}});
       
    }

    EndAnimation=()=>{
        if(this.state.minCartDisplayed===false) return;
        this.setState({minCartStyle:{backgroundColor:'#fff',
                                  height:'100vh',
                                  width:'60%',
                                  position:'absolute',
                                  right:0,
                                  top:0,
                                  zIndex:'600',
                                  boxShadow: '-7px 3px 15px 0px rgba(0, 0, 0, 0.295)',
                                  animation: 'x 1s',
                                  animationName: Radium.keyframes(slideOutRight, 'left')}});
        setTimeout((()=>{ this.setState({minCartStyle:{display:'none'},minCartDisplayed:false}) }),1000);
        
    }

    slideMenu=()=>{
        this.setState({mainMenuStyle:{animation: 'x 1s',
                                      height:'100vh',
                                      width:'340px',
                                      position:'absolute',
                                      top:0,
                                      left:0,
                                      zIndex:'100',
                                      boxShadow:'10px 1px 19px -14px rgba(0,0,0,0.75)',
                                      animationName: Radium.keyframes(slideInLeft, 'left')},
                                      });
    }
    endMenuSlide=()=>{
        this.setState({mainMenuStyle:{animation: 'x 1s',
                       height:'100vh',
                       width:'340px',
                       position:'absolute',
                       top:0,
                       left:0,
                       zIndex:'100',
                       boxShadow:'10px 1px 19px -14px rgba(0,0,0,0.75)',
                       animationName: Radium.keyframes(slideOutLeft, 'left')},
                       display:'none'
                        });
        setTimeout((()=>{ this.setState({mainMenuStyle:{display:'none'}}) }),1000);
    }
    
    slideSearchMenu=()=>{
        if(this.state.searchMenuOpen){
            this.setState({searchMenuStyle:{animation: 'x 1s',
                                        backgroundColor:'#fff',
                                        height:'100vh',
                                        width:'400px',
                                        position:'absolute',
                                        top:0,
                                        left:0,
                                        zIndex:'100',
                                        boxShadow:'10px 1px 19px -14px rgba(0,0,0,0.75)',
                                        animationName: Radium.keyframes(slideOutLeft, 'left')},
                         searchMenuOpen:false});
            setTimeout((()=>{ this.setState({searchMenuStyle:{display:'none'}}) }),1000);
        }else{
            this.setState({searchMenuStyle:{animation: 'x 1s',
                                            backgroundColor:'#fff',
                                            height:'100vh',
                                            width:'400px',
                                            position:'absolute',
                                            top:0,
                                            left:0,
                                            zIndex:'100',
                                            boxShadow:'10px 1px 19px -14px rgba(0,0,0,0.75)',
                                            animationName: Radium.keyframes(slideInLeft, 'left')},
                                            searchMenuOpen:true
                                            });
        }
    }
    endSlideSearchMenu=()=>{
        this.setState({searchMenuStyle:{animation: 'x 1s',
                                        backgroundColor:'#fff',
                                        height:'100vh',
                                        width:'400px',
                                        position:'absolute',
                                        top:0,
                                        left:0,
                                        zIndex:'100',
                                        boxShadow:'10px 1px 19px -14px rgba(0,0,0,0.75)',
                                        animationName: Radium.keyframes(slideOutLeft, 'left')},
                                        searchMenuOpen:false
                                        });
        setTimeout((()=>{ this.setState({searchMenuStyle:{display:'none'}}) }),1000);
    }
    
    
    preSettings=()=>{
        let custDetails=JSON.parse(localStorage.getItem('custInfo'));
        this.setState({deliverLocation:localStorage.getItem('area')});
        if(custDetails !=null){
          localStorage.setItem('gustId','null')
          this.setState({userName:custDetails.custName,loginBtnDisp:'none'})
         
        }

        HeaderApi.cartListGET()
                 .then((response)=>{
                    
                     if((response.data.Data.cartList).length>0){
                        this.setState({cartList:response.data.Data.cartList,
                                       subTotal:response.data.Data.cartList[0].subTotal})
                     }
                    
                 }).catch((error)=>{
                     console.log(error)
                 })
        
        HeaderApi.WishListGET()
                 .then((response)=>{
                      this.setState({wishList:response.data.Data})
                 }).catch((error)=>{
                     console.log(error)
                 })

        HeaderApi.deliveryLocationsGET('')
                 .then((response)=>{
                    
                     this.setState({deliveryList:response.data.Data})
                 }).catch((error)=>{
                     console.log(error)
                 });

        HeaderApi.cartSummeryGET()
                 .then((response)=>{
                    
                    this.setState({cartSummery:response.data.Data,subTotal:response.data.Data.subTotal})
                 }).catch((error)=>{
                     console.log(error.response)
                 });
        
        HeaderApi.categoryGET()
                 .then((response)=>{
                    this.setState({categoryList:response.data.Data})
                 }).catch((error)=>{
                     console.timeLog(error);
                 })
        
    }

    handleDeliveryLocationBoxClose=()=>{
        this.setState({showDeliveryLocationBox:false})}
    handleDeliveryLocationBoxShow=()=>{
       
        this.setState({showDeliveryLocationBox:true});
    }
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    handleChange=(event)=>{
        this.setState({searchTerm: event.target.value});
        this.searchProduct();
    } 

    handleDelListShow=()=>{
        if(this.state.DellistDisplay==='none') this.setState({DellistDisplay:''});
        if(this.state.DellistDisplay==='') this.setState({DellistDisplay:'none'});
    }
    
    ShowFavorite=()=>{
        let custId=localStorage.getItem('custId')
        if(custId == null){
            this.handleShow();
        }else{
            console.log('continue here ')
        }
    }

    signOut=()=>{
        window.localStorage.clear();
        window.location.reload();
    }
    
    changeDeliveryLocation(_location,_pincodeId,_pincode){
        ///item.area,item.pincodeId,item.pincode
        this.setState({currentDeliveryLocation:_location,
                       delLocationId:_pincodeId,
                       delLocationPincode:_pincode,
                       DellistDisplay:'none'})
    }
   
    searchProduct=()=>{
    
      var _term=this.state.searchTerm;
      this.setState({searchLoadDisplay:''});
      HeaderApi.searchAutoCompleteGET(_term)
                .then((response)=>{
                   this.setState({searchBoxDisplay:'',searchLoadDisplay:'none',searchProducts:response.data.Data});

                }).catch((err)=>{
                    this.setState({searchLoadDisplay:'none'});
                    console.log(err)
                })   

    }
    closeSearch=()=>{
        this.setState({searchBoxDisplay:'none',searchTerm:''})
    }
    deliveryLocationCheck=()=>{
        if(this.state.currentDeliveryLocation==='') return alert('select delivery location');
        localStorage.setItem('area',this.state.currentDeliveryLocation);
        localStorage.setItem('pincodeId',this.state.delLocationId);
        localStorage.setItem('pincode',this.state.delLocationPincode);
        window.location.reload();
    }

   
    changeSearchValue=(_searchVal)=>{
        this.setState({searchTerm:_searchVal});
    }
    
    
    searchProductAndNavigate=()=>{
        var term=this.state.searchTerm;
        if(term==='') return alert('please enter a value.!!')
         this.props.history.push({pathname: '/products',
                                  search: `?search=${term}`,from:'category-card',
                                  state:{from:'search',searchTerm:term}});
         window.location.reload();
    }
    
    counter(){
       console.log(this.length)
       return this.length+1;
    }

    render() {
        let cartList=this.state.cartList;
        let wishList=this.state.wishList;
        let deliveryList=this.state.deliveryList;
        let logoUrl=process.env.PUBLIC_URL+'/img/Centreal_Bazaar.png';
        let subTot=this.state.subTotal;
        let fullCategory=this.state.categoryList;
        let categoryList=fullCategory.filter((item)=>item.parentId==1)//select parent id
        categoryList=categoryList.slice(0,5)
        ///console.log('category list',categoryList);
        return (
             <div>

             
             <div className='app-base-bg p-2  d-flex justify-content-between'>
                <div className='d-flex '>
                   <img src={logoUrl} alt='logo' height={50} onClick={()=>this.navigateTo('')}/>
                    <div className='d-none d-lg-block'>
                        <div className='search-container '>
                          <input    onChange={this.handleChange} className="search-input" value={this.state.searchTerm} type="text" placeholder="Search Inside 15,000 products....."/>
                          <button className="search-icon" onClick={this.closeSearch}><AiOutlineClose style={{fontSize:'1.5em'}}/></button>
                          <button className="search-btn" type="submit" onClick={this.searchProductAndNavigate}>Search</button>
                        </div> 
                        <SearchItemLoader changeTerm={this.changeSearchValue} 
                                          searchBoxDisp={this.state.searchBoxDisplay}
                                          searchLoadDisp={this.state.searchLoadDisplay}
                                          searchList={this.state.searchProducts}/>
                    </div>
                </div>
                <div className='d-flex align-items-center margin  justify-content-between width-250px'>
                    <div onClick={this.ShowFavorite}>
                       <Badge count={wishList.length} bgColor='#023f88'><AiOutlineHeart className="icon "/></Badge>
                    </div>
                    
                    <div  onClick={this.StartAnimation}>
                      <Badge count={cartList.length} bgColor='#023f88'><FiShoppingBag className="icon"/></Badge>
                    </div>
                    <button className="icon-btn text-light"
                             onClick={()=>this.navigateTo('my-profile')}><FaRegUser /></button>
                    <button className="icon-btn text-light" style={{display:this.state.loginBtnDisp}}><h5 className="mt-3" onClick={this.handleShow}>Login</h5></button>
                    <button className="icon-btn text-light " 
                            style={{fontSize:'1em',whiteSpace:'nowrap'}}
                            onClick={()=>this.navigateTo('my-profile')}>{this.state.userName}</button>
                </div>
               

                <Modal show={this.state.show} onHide={this.handleClose}
                        size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                           <button className='btn' onClick={this.handleClose}>
                            <AiOutlineClose  style={{fontSize:'1.5em',
                                                        position:'absolute',
                                                        right:0,
                                                        margin:'10px'}}/>
                           </button>
                           
                         <br/>
                    <Modal.Body>
                    <div className="container">
                    <div className="row">
                        <div className="col-sm d-none d-lg-block ">
                            <img width={380} alt='logo'  src={process.env.PUBLIC_URL+'/img/sign-up-image.jpg'} />
                        </div>
                        <div className="col-sm">
                            <Login closeFn={this.handleClose} preSett={this.preSettings}/>
                            {/* <ForgotPassword /> */}
                            {/* <LoginWithOtp /> */}
                            
                        </div>
                        
                    </div>
                    </div>
                    
                    </Modal.Body>
                    
                </Modal>
                {/* <StyleRoot className="test" style={styles.bounce}><MiniCart/></StyleRoot> */}
                
             </div>
             <div className='under-nav justify-content-between p-l-5'>
                 <div className='d-flex '>
                   <button className='menu-btn' onClick={this.slideMenu}><FcMenu/></button>
                 </div>
                 {/* <div className='under-nav-item d-flex justify-content-between w-80 d-none d-lg-flex'>
                     {  
                        categoryList.map((item1,key)=>(
                               
                                <div style={{backgroundColor:'blue',zIndex:300}}>
                                    <p key={key} >{item1.catName}</p>
                                    <div>
                                        {
                                            fullCategory.map((item2,key)=>(
                                               item1.catId===item2.parentId?
                                                <div>
                                                 <p style={{marginLeft:'20px'}}>{item2.catName}</p>
                                                  {
                                                      fullCategory.map((item3,key)=>(
                                                         item2.catId===item3.parentId?
                                                         <p style={{marginLeft:'30px'}}>{item3.catName}</p>:
                                                         ''
                                                      ))
                                                  }
                                                </div>
                                                :
                                                ''
                                                 
                                            ))
                                        }
                                        
                                    </div>    
                                </div>
                        ))
                        
                     }
                     <p>More</p>
                 </div> */}
                 
                 <div>
                   <button className='menu-btn' onClick={this.handleDeliveryLocationBoxShow}>
                       <span style={{fontSize:'.6em',color:'black'}}>
                           {
                               this.state.deliverLocation==null?'Choose Delivery location':
                               'Deliver to: '+this.state.deliverLocation
                           }
                       </span>
                       <BiCurrentLocation/>
                   </button>
                 </div>
                
             </div>
             
             <Modal show={this.state.showDeliveryLocationBox} onHide={this.handleDeliveryLocationBoxClose}
                        size="md"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                           <AiOutlineClose onClick={this.handleDeliveryLocationBoxClose} style={{fontSize:'1.5em',
                                                                            position:'absolute',
                                                                            right:0,
                                                                            margin:'10px'}}/>
                                                                            <br/>
                    <Modal.Body>
                        <br/>
                    <div className="container">
                         <input value={this.state.currentDeliveryLocation} style={{width:'100%'}} onFocus={this.handleDelListShow}/>
                         <div style={{width:'100%',display:this.state.DellistDisplay}} >
                             {
                                 deliveryList.map((item,key)=>(
                                    <div key={key} className='delivery-list' onClick={() => this.changeDeliveryLocation(item.area,item.pincodeId,item.pincode)}>
                                       <p>{item.area}</p>
                                   </div>
                                  ))
                             }
                         </div>
                         <br/>
                         <br/>
                         <div className='d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={()=>this.deliveryLocationCheck()}>Submit</button>
                            <button onClick={()=>this.navigateToLocations()} className='btn'>Available locations</button>
                         </div>
                         
                    </div>
                    
                    </Modal.Body>
                    
                </Modal>
                <StyleRoot>
                  <div  style={this.state.minCartStyle}>
                  <div className='header d-flex justify-content-between'>
                        <div className='d-flex'>
                        <h4>MY CART</h4>
                        <h4 style={styles.cartCount}>{cartList.length}</h4>
                        </div>
                        <div>
                            <AiOutlineClose style={{fontSize:'2em'}} onClick={this.EndAnimation}/>
                        </div>
                        </div>
                        <div className='p-3 ' style={{height:'500px',overflowY:'scroll'}}>
                        
                         <CartItem ItemsArr={cartList}/>
                        
                        </div>
                        <div className='bottom-buttons '>
                            <h4 style={{textAlign:'right',padding:'25px'}}>Sub Total  Rs.{subTot}</h4>
                            <div className='d-flex justify-content-around'>
                            <button className='btn btn-primary w-25' onClick={()=>this.navigateTo('cart')}>View Cart</button>
                            <button className='btn btn-danger w-25'>Checkout</button>
                        </div>
                            
                        </div>
                  </div>
                </StyleRoot>
                <StyleRoot>
                <div className='main-header' style={this.state.mainMenuStyle}>
                  <div className='main-header-head'>
                     <div style={{fontSize:'1.5em',
                                   width:'100%',
                                   textAlign:'end'}}>
                       
                       <button className='btn text-light' onClick={this.endMenuSlide}>
                          <AiOutlineClose/>
                       </button>
                     </div>
                     {
                             this.state.userName===''?'':
                             <div className='d-flex'>
                                <div style={{fontSize:'1.9em',
                                            marginRight:'10px',
                                            }}>
                                    <BiUserCircle/>
                                </div>
                                <h5 className='mt-3'>Hello, {this.state.userName}</h5>
                                
                                
                                <br/>
                            </div>
                             
                     }
                     
                     <div className='d-flex  justify-content-between text-center'>
                            <h5 className='head-btn'>Account</h5>
                            <h5 className='head-btn'>My Orders</h5>
                     </div>
                  </div>
                  <div style={{padding:'10px'}}>
                      <h6  className='nav-item' onClick={()=>this.navigateTo('')}>Home</h6>
                      <h6 className='nav-item' >My Wishlist</h6>
                      <h6 className='nav-item' >All Offers</h6>
                      <hr/>
                      <h6 className='nav-item' >Account</h6>
                      <h6 className='nav-item' >Help</h6>
                      <h6 className='nav-item' onClick={()=>this.navigateTo('locations')}>Change location
                                                {
                                                  this.state.deliverLocation===''?'':
                                                  (this.state.deliverLocation)
                                                }</h6>
                      <h6 className='nav-item' onClick={this.signOut}>Sign Out</h6>
                      <hr/>
                      <h6><b>CONTACT US</b></h6>
                      <h6 className='nav-item' >WhatsApp Us +91 7594999934</h6>
                      <h6 className='nav-item' >Call Us +91 7594999934</h6>
                  </div>
                </div>
                </StyleRoot>
                {/* search nav */}
                <StyleRoot >
                <div style={this.state.searchMenuStyle}     
                     className='main-header'>
                  <div className='main-header-head'>
                     <div style={{fontSize:'1.5em',
                                   width:'100%',
                                   textAlign:'end'}}>
                       
                       <button className='btn' style={{color:'#fff'}} onClick={this.endSlideSearchMenu}>
                          <AiOutlineClose/>
                       </button>
                     </div>
                     <div className='w-100'>
                          <input style={{width:'80%'}} 
                                onKeyUp={this.searchProduct}
                                onChange={this.handleChange}  
                                value={this.state.searchTerm} 
                                type="text" 
                                placeholder="Search Inside 15,000 products....."/>
                          <button style={{border:'none',
                                          backgroundColor:'black',
                                          color:'#fff'}}>
                              <BiSearch style={{fontSize:'1.5em'}}/>
                          </button>
                          <br/>
                        <SearchItemLoader topHeight='80px'
                                          searchBoxDisp={this.state.searchBoxDisplay}
                                          searchLoadDisp={this.state.searchLoadDisplay}
                                          searchList={this.state.searchProducts}/>
                    </div>
                     
                  </div>
                  <div style={{padding:'10px'}}>
                      
                  </div>
                </div>
                </StyleRoot>
                <div className='mobile-nav  d-lg-none'>
                     <div className='items-container d-flex justify-content-around'>
                         <div style={{cursor:'pointer'}} onClick={this.slideMenu}>
                             <span style={{fontSize:'2em'}}>
                               <FcMenu/>
                            </span><br/>
                             Menu
                         </div>
                         <div style={{cursor:'pointer'}}>
                             <span style={{fontSize:'2em'}}>
                              <AiOutlineUnorderedList/>
                             </span>
                             <br/>
                             Category
                         </div>
                         <div style={{cursor:'pointer'}}
                              onClick={this.slideSearchMenu}>
                             <span style={{fontSize:'2em'}}>
                             <AiOutlineSearch/>
                             </span>
                             <br/>
                             Search
                         </div>
                         <div style={{cursor:'pointer'}}>
                            <Badge count={cartList.length} bgColor='#dd2400'><FiShoppingBag className="icon"/></Badge>
                            Cart
                         </div>
                     </div>
                </div>
            </div>

        )
    }
}

export default  withRouter(Header); //important to withRouter