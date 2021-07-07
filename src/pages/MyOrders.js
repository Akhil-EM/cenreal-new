import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileNavigation from '../components/ProfileNavigation';
import MyOrdersApi from '../api/MyOrdersApi';

class MyOrders extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ordersList:[]
        }
    }

    componentWillMount(){
        this.getInitialData();
    }
        
    getInitialData(){
        MyOrdersApi.orderListGET()
                   .then((response)=>{
                    
                       this.setState({ordersList:response.data.Data});
                   }).catch((error)=>{
                       console.log(error)
                   });  
    }
    
    render() {
        console.log(this.state.ordersList)
        return (
            <div>
             <Header/>
             <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfileNavigation setColorFor={1}/>
                        </div>
                        <div className="col-md-9">
                           {
                              this.state.ordersList.length<=0?'No orders found..!':''
                           }
                           {
                               this.state.ordersList.map((item,key)=>(
                                  <div className='card p-3 mb-4' key={key}>
                                    <div className='d-flex justify-content-between'>
                                       <div>
                                        <h4>Order Status</h4>
                                        
                                        <h6  className={`${item.status==='Order Accepted'?'text-success':''}
                                                         ${item.status==='Order Cancelled'?'text-danger':''}
                                                         ${item.status==='Order Processing'?'text-primary':''}`}>
                                               {item.status}
                                        </h6>
                                       </div>
                                       <div>
                                        <h6 className='mt-2'>Order Total ({item.itemList.length} item)</h6>
                                        <h6>Rs. {item.orderAmount}</h6>
                                       </div>
                                    </div> 
                                  </div>
                                  
                               ))
                           }
                            

                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}

export default MyOrders;
