import React, { Component } from 'react'
import Header from '../components/Header';
import {RiArrowDropRightLine} from 'react-icons/ri';
import ProductsApi from '../api/ProductsApi';

export default class Products extends Component {
    category
    constructor(props) {
        super(props)
        this.category=this.props.match.params.category;

        this.state = {
            categoryList:[]
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

        
        ProductsApi.searchFilterPOST(1,{category:this.category},'',
                                     100,{direction: "asc", field: ""},)
                   .then((response)=>{
                       console.log(response)
                   }).catch((error)=>{
                       console.log(error);
                   });
        ProductsApi.searchPOST(1,{category:this.category},'',
                      100,{direction: "asc", field: ""},)
                .then((response)=>{
                  console.log(response)
                }).catch((error)=>{
                   console.log(error);
                });
    }

    navigateTo(_navigateTo){
       
            this.props.history.push(`/${_navigateTo}`);         
          
    }



    
    render() {
        console.log(this.state.categoryList)
        return (
            <div>
                <Header/>
                <div className='anchor-nav d-none d-lg-block'>
                     <a href='#' onClick={()=>this.navigateTo('')}>Home</a>
                     <RiArrowDropRightLine style={{fontSize:'2em'}}/>
                     <a href=''>{this.category}</a>
                     <hr/>
                 </div>
                 <div className='p-4'>

                 </div>
            </div>
        )
    }
}
