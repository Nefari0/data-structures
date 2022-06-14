// import './Titanic.css'
import React, { useState } from 'react'

const PassengerRow = (props) => {

    const { survived,pclass,name,sex,siblings_spouses_aboard,parents_children_aboard,fare } = props
    const firstName = name.split(' ')[1]
    const lastName = name.split(' ')[2]
    var [fullname,setFullName] = useState(false)

    return(
        // <div className="scrollitems" onClick={() => setFullName(!fullname)} >
        <tr onClick={() => setFullName(!fullname)} >
            <td>{fullname === false ? `${firstName.split('')[0]}  ${lastName.split('')[0]}` : `${firstName} ${lastName}`}</td>
            <td>{pclass}</td>
            <td>{sex}</td>
            <td>{siblings_spouses_aboard}</td>
            <td>{parents_children_aboard}</td>
            <td>{fare}</td>
            <td>{survived > 0 ? 'survived' : 'perished'}</td>
        </tr>
    )
}

export default PassengerRow