import axios from 'axios'
import react from 'react'
import './Info.css'

const CancerStat = (props) => {

    const { eclass } = props

    return(
        <div className="info-list">
            <p className="p-text">text</p>
            <p className="p-text">{eclass}</p>
        </div>
    )
}

export default CancerStat