import React from 'react'
import {imageUrlBase} from '../config';
function SearchItemLoader(props) {
    var searchList=props.searchList
    var _display=props.searchLoadDisp;
    var searchBoxDisp=props.searchBoxDisp
    return (
        <div className="search-item-loader" style={{display:searchBoxDisp}}>
            <ul>
                {
                    <li style={{marginLeft:'10px',fontWeight:'600',display:_display}}>Loading....</li>
                }
                
                {   
                     searchList.map((item,key)=>(
                     <li key={key}>
                        <div className='d-flex' >
                            <img width={35} src={imageUrlBase+item.imageUrl} alt=''/>
                            <a className='search_item_anchor' href="">{item.ProductName}</a>
                        </div>
                     </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SearchItemLoader
