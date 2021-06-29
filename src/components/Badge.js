// import React, { Component } from 'react'
import '../assets/css/badge.css';
import React from 'react'

export default function Badge(props) {
    return (
        <div className='wrapper'>
                 {props.children}
                 <p style={{backgroundColor:props.bgColor}}>{props.count}</p>
            </div>
    )
}
