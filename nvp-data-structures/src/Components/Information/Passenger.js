// import './Titanic.css'
import React, { useState,useEffect, Children } from 'react'

const Passenger = (props) => {

    const { survived,pclass,name,sex,siblings_spouses_aboard,parents_children_aboard,fare } = props

    return(
        <div className="scrollitems">
            <a style={{overflow:'auto',width:'200px'}}>{name}</a>
            <a>{pclass}</a>
            <a>{sex}</a>
            <a>{siblings_spouses_aboard}</a>
            <a style={{marginLeft:'100px'}}>{parents_children_aboard}</a>
            <a>{fare}</a>
            <a>{survived > 0 ? 'survived' : 'parished'}</a>
        </div>
    )
}

export default Passenger