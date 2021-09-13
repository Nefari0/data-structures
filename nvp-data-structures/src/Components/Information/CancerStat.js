import axios from 'axios'
import react from 'react'
import './Info.css'

const CancerStat = (props) => {

    const { eclass,id } = props

    return(
        <div className="info-list">
            <p className="p-text">{id}</p>
            <p className="p-text">{eclass}</p>
        </div>
    )
}

export default CancerStat