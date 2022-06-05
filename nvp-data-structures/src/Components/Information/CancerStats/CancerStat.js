import '../Info.css'
// import './Column.css'
import React, { useState, useEffect } from 'react';

const CancerStat = (props) => {

    const {data_id,eclass,id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithlial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = props
    
    // --- this changes background color according to even odd values -- //
    // let data_num = data_id % 2 === 0
    // console.log('data',data_num)
    return(
        
        
        <div className="scrollitems">
        {/* <div className={`scrollitems ${data_num ? true : 'scrollitems-dark'}`}> */}
        {/* <div> */}
            {/* {data_num === true ? (<a>true</a>) : (<a>false  </a>)} */}
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