import axios from 'axios'
import react from 'react'
import './Info.css'
import './Column.css'

const CancerStat = (props) => {

    const { eclass,id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithlial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = props

    return(
        <div className="scrollitems">
            <a>{id}</a>
            <a >{clump_thickness}</a>
            <a>{uniformity_of_cell_size}</a>
            <a>{uniformity_of_cell_shape}</a>
            <a>{marginal_adhesion}</a>
            <a>{single_epithlial_cell_size}</a>
            <a>{bare_nuclei}</a>
            <a>{bland_chromatin}</a>
            <a>{normal_nuceoli}</a>
            <a>{mitoses}</a>
            <a>{eclass}</a>
        </div>
    )
}

export default CancerStat