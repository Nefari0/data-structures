import axios from 'axios'
import react from 'react'
import './Info.css'
import './Column.css'
import React, { useState, useEffect } from 'react';

const CancerStat = (props) => {

    const { data_id,eclass,id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithlial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = props

    // --- this changes background color according to even odd values -- //

    // if (data_id % 2 === 0){
    //     isEven = true
    //   } else {
    //     isEven = false
    //   }

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