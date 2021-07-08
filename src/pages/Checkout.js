import React, { Component } from 'react';
import Header from '../components/Header';
class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            deliveryModeShow:false,
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }
    
    onChangeValue(event) {
        let val=event.target.value;
        if(val==='delivery') this.setState({deliveryModeShow:false});
        if(val==='store-pickup') this.setState({deliveryModeShow:true});
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='card m-4 p-3' style={{maxWidth:'500px'}}>
                   <div className='d-flex justify-content-around'
                        onChange={this.onChangeValue}>
                        <div className='d-flex'>
                            <input type='radio' 
                                   style={{border:'0px',height:'1.5em',marginRight:'10px'}}
                                   value='delivery' 
                                   name="gender"
                                   defaultChecked={!this.state.deliveryModeShow}/>
                            <h6>Delivery</h6>
                        </div>
                        <div className='d-flex'>
                            <input type='radio' 
                                   style={{border:'0px',height:'1.5em',marginRight:'10px'}}
                                   value='store-pickup'
                                   name="gender"
                                   defaultChecked={this.state.deliveryModeShow}/>
                            <h6>Pickup From Store</h6>
                        </div>
                   </div>
                   
                   
                  { this.state.deliveryModeShow &&
                    <div>
                        <hr/>
                        Select Store
                        <select class="form-control" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <span className='text-danger'>* Shopping Cart items availability / price may vary based on the store Selected</span>
                    </div>
                  }
                </div>
                {
                    !this.state.deliveryModeShow&&
                    <h1>Select address</h1>
                }
          
            </div>
        );
    }
}

export default Checkout;
