// import './Titanic.css'
import React, { useState,useEffect, Children } from 'react'

const Passenger = (props) => {

    const { survived,pclass,name,sex,siblings_spouses_aboard,parents_children_aboard,fare } = props

    return(
        <div className="scrollitems" style={{overflowX:'scroll'}}>
            <a style={{fontSize:'xx-small'}}>{name}</a>
            <a>{pclass}</a>
            <a>{sex}</a>
            <a>{siblings_spouses_aboard}</a>
            <a>{parents_children_aboard}</a>
            <a>{fare}</a>
            <a>{survived}</a>
        </div>
    )
}

export default Passenger