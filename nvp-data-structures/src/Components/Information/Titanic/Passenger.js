// import './Titanic.css'
import React, { useState } from 'react'

const Passenger = (props) => {

    const { survived,pclass,name,sex,siblings_spouses_aboard,parents_children_aboard,fare } = props
    const firstName = name.split(' ')[1]
    const lastName = name.split(' ')[2]
    var [fullname,setFullName] = useState(false)

    return(
        <div className="scrollitems" onClick={() => setFullName(!fullname)} >
            <p>{fullname === false ? `${firstName.split('')[0]}  ${lastName.split('')[0]}` : `${firstName} ${lastName}`}</p>
            <p>{pclass}</p>
            <p>{sex}</p>
            <p>{siblings_spouses_aboard}</p>
            <p>{parents_children_aboard}</p>
            <p>{fare}</p>
            <p>{survived > 0 ? 'survived' : 'perished'}</p>
        </div>
    )
}

export default Passenger