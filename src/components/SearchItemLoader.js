import React, { Component } from 'react';
import {imageUrlBase} from '../config';
class SearchItemLoader extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        
    var searchList=this.props.searchList
    var _display=this.props.searchLoadDisp;
    var searchBoxDisp=this.props.searchBoxDisp;
        return (
            <div className="search-item-loader" style={{display:searchBoxDisp,
                                                                    top:this.props.topHeight}}>
                            <ul>
                                {
                                    <li style={{marginLeft:'10px',fontWeight:'600',display:_display}}>Loading....</li>
                                }
                                {   
                                     searchList.map((item,key)=>(
                                     <li key={key}>
                                        <div className='d-flex' onClick={()=>this.props.changeTerm(item.ProductName)} style={{cursor:'pointer'}}>
                                            <img width={35} src={imageUrlBase+item.imageUrl} alt=''/>
                                            <p className='search_item_anchor' >{item.ProductName}</p>
                                        </div>
                                     </li>
                                    ))
                                }
                            </ul>
                        </div>
        );
    }
}

export default SearchItemLoader;

