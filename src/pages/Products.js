import React, { Component } from 'react'
import Header from '../components/Header';
import {RiArrowDropRightLine} from 'react-icons/ri';
import ProductsApi from '../api/ProductsApi';
import ProductCard from '../components/ProductCard';


export default class Products extends Component {
    category
    categoryId
    parentId
    constructor(props) {
        super(props)
        this.category=this.props.location.state.categoryName;
        this.categoryId=this.props.location.state.categoryId;
        this.parentId=this.props.location.state.parentId;
        this.cateUrlKey=this.props.location.state.categoryUrlKey;
        this.state = {
            categoryList:[],
            productsList:[]
        }
    }

    componentWillMount(){
      this.getInitialData();
    }

    getInitialData(){
        ProductsApi.categoryGET()
                   .then((response)=>{
                       this.setState({categoryList:response.data.Data})
                   }).catch((error)=>{
                       console.log(error.response)
                   });

        
        ProductsApi.searchFilterPOST(1,{category:this.cateUrlKey},'',
                                     100,{direction: "asc", field: ""},0,630)
                   .then((response)=>{
                    //    console.log('search filter response',response)
                   }).catch((error)=>{
                       console.log(error);
                   });

        ProductsApi.searchPOST(1,{category:this.cateUrlKey},'',
                               100,{direction: "asc", field: ""},0,630)
                .then((response)=>{
                   
                   this.setState({productsList:response.data.Data.List});
                  
                }).catch((error)=>{
                   console.log(error);
                });
    }

    navigateTo(_navigateTo){
            this.props.history.push(`/${_navigateTo}`);         
    }
    
    render() {
        var categoryList=this.state.categoryList;
        var productsList=this.state.productsList;
        console.log('product list ',productsList)
        return (
            <div>
                <Header/>
                <div className='anchor-nav d-none d-lg-block'>
                     <a href='' onClick={()=>this.navigateTo('')}>Home</a>
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                     <a href=''>{this.category}</a>
                     <hr/>
                 </div>
                 <div className='p-4'>
                     <div className='container-fluid'>
                         <div className='row'>
                             <div className='col-md-3 '>
                                <div className='card w-100 p-3'>
                                    <h5>CATEGORIES</h5>
                                     <p className="ml-1">{this.category}</p>
                                    {
                                        categoryList.map((item,key)=>(
                                            item.parentId==this.categoryId?
                                            <div style={{marginLeft:'10px'}}>
                                                <p >{item.catName}</p>
                                                {
                                                     categoryList.map((item2,key)=>(
                                                        
                                                         <div style={{marginLeft:'10px'}}>
                                                               {
                                                                   <p>{item2.parentId==item.catId?item2.catName:''}</p>
                                                               }
                                                         </div>
                                                        
                                                        
                                                    ))
                                                 }
                                            </div>:
                                            ''
                                            
                                        ))
                                    }
                                </div>
                                <br/>
                             </div>
                             <div className='col-md-9 p-0 m-0'>
                                 <div className='d-flex justify-content-between'>
                                     <div className=''>

                                          { productsList.length>0?
                                            <h4>{productsList.length} Products found</h4>:''
                                          }
                                     </div>
                                     <div >
                                     <div className="form-group">
                                        <select className="form-control">
                                            <option value="latest">Sort by latest</option>
                                            <option value="discount">Discount</option>
                                            <option value="lowToHigh">Price: low to high</option>
                                            <option value="highToLow">Price: high to low</option>
                                            <option value="a-z" >Sort by A to Z</option>
                                            <option value="z-a" >Sort by Z to A</option>
                                        </select>
                                        </div> 
                                     </div>
                                 </div>
                                 <br/>
                                 <div className='products-container'>
                                 <div class="container-fluid">
                                    <div class="row">
                                         {
                                            productsList.map((item,key)=>(
                                                <div class="col-sm ">
                                                  <ProductCard price={item.unitPrice} name={item.prName} imgurl={item.imageUrl} alt={item.urlKey} key={key}/>
                                                  <br/>
                                                </div>
                                                
                                            ))
                                         }
                                    </div>
                                 </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}
