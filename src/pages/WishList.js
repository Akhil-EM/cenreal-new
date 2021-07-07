import React, { Component,Fragment} from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import WishListApi from '../api/WishListApi';
import ProductCard from '../components/ProductCard';
class WishList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             wishList:[]
        }

       this.getInitialData=this.getInitialData.bind(this);
    }
    
    componentWillMount(){
        this.getInitialData();
    }

    getInitialData(){
       WishListApi.wishListGET()
                  .then((response)=>{
                      this.setState({wishList:response.data.Data});
                      
                  }).catch((error)=>{
                      console.log(error);
                  })
    }
    
    render() {
        return (
            <div>
             <Header/>
             <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfileNavigation setColorFor={2}/>
                        </div>
                        <div className="col-md-9">
                           <div className='container-fluid'>
                           <div className='row'>
                           {
                               this.state.wishList.length <=0?'no wish listed products.':
                               this.state.wishList.map((item,key)=>(
                                   <Fragment key={key}>
                                    <div className='col-md'>
                                      <ProductCard key={key} 
                                               value={JSON.stringify(item)}
                                               parentFunction={this.getInitialData}
                                               from={'whish'}/>
                                      <br/>
                                    </div>
                                    {
                                        (key+1)% 3==0?<div className='row'></div>:<Fragment></Fragment>
                                    }
                                   </Fragment>
                                       
                               ))          
                               
                            }
                            {
                                (this.state.wishList.length)%3==1?
                                <Fragment>
                                    <div className='col-sm'></div>
                                    <div className='col-sm'></div>
                                </Fragment>:<Fragment></Fragment>
                               

                            }
                            {
                                (this.state.wishList.length)%3==2?
                                <Fragment>
                                    <div className='col-sm'></div>
                           
                                </Fragment>:<Fragment></Fragment>
                               

                            }
                            </div>
                           </div>
                          
                        </div>  
                    </div>
                </div>
         </div>
        );
    }
}

export default WishList;
