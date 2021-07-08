import React, { Component } from 'react';
import {imageUrlBase} from '../config';
import {withRouter} from 'react-router-dom';
class MyOrdersItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             viewFullItem:false
        }
    }

    itemViewHandler=()=>{
        this.setState({viewFullItem:true})
    }
    
    render() {
        return (
            <div className='card p-3 mb-4'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4>Order Status</h4>
                            <h6  className={`${this.props.status==='Order Accepted'?'text-success':''}
                                             ${this.props.status==='Order Cancelled'?'text-danger':''}
                                             ${this.props.status==='Order Processing'?'text-primary':''}`}>
                                               {this.props.status}</h6>
                    </div>
                    <div>
                        <h6 className='mt-2'>Order Total ({this.props.itemList.length} item)</h6>
                            <h6>Rs. {this.props.orderAmount}</h6>
                            </div>
                            <br/>
                            <br/>
                    </div> 
                    <div className='container-fluid p-0'>
                        <div className='row justify-content-around'>
                            <div className='col-sm'>
                                {
                                    this.props.itemList.map((item2,key2)=>(
                                        <div className='mb-1 p-2'>
                                            {
                                                key2+1>2?<div/>:
                                                    <div className=' d-flex'
                                                         key={key2}
                                                         style={{borderBottom:'.5px solid rgba(51, 51, 51, 0.247)'}}>
                                                        <img src={imageUrlBase+item2.imageUrl} 
                                                             alt={item2.imageUrl.slice(-5,5)} 
                                                             width={60}/>
                                                        <h6>{item2.prName}</h6>
                                                    </div>
                                            }
                                            {   
                                                this.state.viewFullItem&&
                                                key2+1>2?
                                                <div className=' d-flex'
                                                     key={key2}
                                                     style={{borderBottom:'.5px solid rgba(51, 51, 51, 0.247)'}}>
                                                    <img src={imageUrlBase+item2.imageUrl} 
                                                         alt={item2.imageUrl} 
                                                         width={60}/>
                                                    <h6>{item2.prName}</h6>
                                                </div>:<div/>

                                            }
                                        </div>
                                        
                                                       
                                    ))    
                                }
                                {   
                                    !this.state.viewFullItem&&
                                    this.props.ProductCount>2?
                                    <p style={{cursor:'pointer'}} onClick={this.itemViewHandler}>{
                                        this.props.ProductCount-2===1?`View ${this.props.ProductCount-2} more item`:
                                        `View ${this.props.ProductCount-2} more items` 
                                    }</p>:
                                    ''
                                }
                            </div>
                            <div className='col-sm mt-2'>
                                <button className='btn btn-primary mb-3'
                                        style={{minWidth:'150px'}}
                                        onClick={()=>this.props.ShowDetails(this.props.orderId)}>View Details</button><br/>
                                <button className='btn btn-outline-warning'
                                        style={{minWidth:'150px'}}
                                        onClick={()=>this.props.history.push('/contact-form')}>Need Help</button>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(MyOrdersItem);
