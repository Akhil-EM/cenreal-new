import React, { Component } from 'react'
import {imageUrlBase} from '../config'

export default class BrandCard extends Component {
    constructor(props){
        super(props)
     }
    render() {
        return (
            <div className="card" style={{padding:'15px'}}>
              <img className='image-align' style={{width:'100px',height:'100px'}} src={imageUrlBase+this.props.image} alt={this.props.altr}></img>
            </div>
        )
    }
}
