import React, { Component } from 'react'
import Header from '../components/Header';
import {RiArrowDropRightLine} from 'react-icons/ri';
import ProductsApi from '../api/ProductsApi';
import ProductCard from '../components/ProductCard';
import {IoMdArrowDropdown,IoMdArrowDropup} from 'react-icons/io'


export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state={
            category:'',
            categoryId:'',
            parentId:'',
            cateUrlKey:'',
            categoryName:'',
            searchTerm:'',
            categoryList:[],
            productsList:[],
            attributes:[],
            attributesSearch:[],
            showFirstChild:false,
        }

        this.checkedItems=[];
        
    }

    componentWillMount(){
       this.getInitialData();
    }

    getInitialData(){
        var navigatedFrom=this.props.location.state.from;
        if(navigatedFrom==='category-card'){
            this.setState({
                category:this.props.location.state.categoryName,
                categoryId:this.props.location.state.categoryId,
                parentId:this.props.location.state.parentId,
                categoryName:this.props.location.state.categoryName,
                cateUrlKey:this.props.location.state.categoryUrlKey},()=>{
                    this.fetchApiData(this.state.cateUrlKey,this.state.searchTerm,{direction: "asc", field: ""},'');
                });

            
            
        }

        if(navigatedFrom==='search'){
            this.setState({searchTerm:this.props.location.state.searchTerm},()=>{
                this.fetchApiData(this.state.cateUrlKey,this.state.searchTerm,{direction: "asc", field: ""},'');
            });
        }


        ProductsApi.categoryGET()
                   .then((response)=>{
                       
                       this.setState({categoryList:response.data.Data})
                   }).catch((error)=>{
                       console.log(error.response)
                   });

        
        ProductsApi.searchFilterPOST(1,{category:this.state.cateUrlKey},'',
                                     100,{direction: "asc", field: ""},0,630)
                   .then((response)=>{
                    //    console.log('search filter response',response)
                       this.setState({attributes:response.data.Data.attributes,
                                      attributesSearch:response.data.Data.attributes,
                                      minPrice:response.data.Data.minPrize,
                                      maxPrice:response.data.Data.maxPrize
                                     })
                   }).catch((error)=>{
                       console.log(error);
                   });
        
        
    }

    fetchApiData(_catUrl,_searchString,_sortBy,_filterValues){
        ProductsApi.searchPOST(1,{category:_catUrl},_filterValues,
                                  100,_sortBy,0,630,_searchString)
        .then((response)=>{
        this.setState({productsList:response.data.Data.List});

        }).catch((error)=>{
        console.log(error);
        });
    }

    navigateTo(_navigateTo){
            this.props.history.push(`/${_navigateTo}`);         
    }
    
    sortItemChanged=(e)=>{

        var sortBy=e.target.value;
        this.fetchApiData(this.state.cateUrlKey,this.state.searchTerm,{direction:sortBy, field: "prName"})
    }

    showFirstChildHandler=()=>{
        this.setState({showFirstChild:!this.state.showFirstChild});
    }

    searchAttr=(e)=>{
        let searchFor;
        console.log(e.target.value);
        searchFor=e.target.value;
        
        let arr=this.state.attributesSearch.filter((item)=>{
             if((item.attrValue).includes(searchFor.toUpperCase())){//checking existence of search 
                 return item;
             }
              
        })
        console.log(arr)
        this.setState({
            attributes:arr
        })

    }

    checkBoxChanged=(e)=>{
        let checkval=e.target.value;
        
        this.checkedItems.includes(checkval)?
        this.checkedItems.pop(checkval):
        this.checkedItems.push(checkval);

        this.fetchApiData(this.state.cateUrlKey,this.state.searchTerm,{direction: "asc", field: ""},(this.checkedItems).toString());
    }
    
   
   
    render() {
        var categoryList=this.state.categoryList;
        var productsList=this.state.productsList;
        var attributes=this.state.attributes;
        return (
            <div>
                <Header/>
                <div className='anchor-nav d-none d-lg-block'>
                     <a href='' onClick={()=>this.navigateTo('')}>Home</a>
                     <RiArrowDropRightLine 
                                style={{fontSize:'2em'}}
                                
                                          />
                     <a href=''>{this.category}</a>
                     <hr/>
                 </div>
                 <div className='p-4' >
                     <div className='container-fluid'>
                         <div className='row'>
                             <div className='col-md-3 '>
                                <div className='card w-100 p-3' >
                                    <h5>CATEGORIES</h5>
                                    <div className='d-flex justify-content-around'
                                         onClick={this.showFirstChildHandler}>
                                    <p className="ml-1"
                                        style={{cursor:'pointer'}}>{this.state.categoryName}</p>
                                        {!this.state.showFirstChild && <IoMdArrowDropdown/>}
                                        {this.state.showFirstChild && <IoMdArrowDropup/>}
                                    </div>
                                    

                                    {   
                                        this.state.showFirstChild&&   
                                        categoryList.map((item,key)=>(
                                            item.parentId==this.state.categoryId?
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
                                    <div>
                                    <div>
                                       <h5>SEARCH</h5>
                                       <br/>
                                       <input type="text" className="form-control" placeholder='SEARCH' onChange={this.searchAttr}/>   
                                       <div style={{marginTop:'10px',
                                                    height:'200px',
                                                    overflowX:'scroll',
                                                    overflowY:'none'}}
                                                    className="w-100">
                                        {
                                             attributes.map((item,key)=>(
                                                 <div className='d-flex' 
                                                      key={key}>
                                                    <input type='checkbox'
                                                           style={{margin:'5px'}}
                                                           value={item.attrValueId}
                                                           defaultChecked={false}
                                                           onChangeCapture={this.checkBoxChanged}
                                                           />
                                                    <h6>{item.attrValue}</h6>
                                                 </div>    
                                             ))
                                        }
                                       </div>
                                    </div>
                                    <div>
                                        <br/>
                                        <h5>PRICE</h5>
                                        
                                    </div>

                                    </div>
                                </div>
                                <br/>
                             </div>
                             <div className='col-md-9 p-0 m-0'>
                                 <div className='d-flex justify-content-between'>
                                     <div className=''>
                                            <h4>{productsList.length} Products found</h4>
                                     </div>
                                     <div >
                                     <div className="form-group">
                                        <select className="form-control" onChange={this.sortItemChanged}>
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
                                                  <ProductCard key={key} 
                                                    value={JSON.stringify(item)}
                                                    getInitData={this.getInitialData}/>
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
