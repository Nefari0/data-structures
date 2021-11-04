import './Titanic.css'
import React, { useState,useEffect, Children } from 'react'

const Passenger = (props) => {

    const { survived,pclass,name,sex,siblings_spouses_aboard,parents_children_aboard,fare } = props

    return(
        <div>
            <a>{survived}</a>
            <a>{pclass}</a>
            <a>{name}</a>
            <a>{sex}</a>
            <a>{siblings_spouses_aboard}</a>
            <a>{parents_children_aboard}</a>
            <a>{fare}</a>
        </div>
    )
}

export default Passenger