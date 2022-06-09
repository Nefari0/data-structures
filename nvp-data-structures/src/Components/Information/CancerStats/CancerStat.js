import '../Info.css'

const CancerStat = (props) => {

    const {data_id,eclass,id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithlial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = props
    return(
        <div className="scrollitems">
            <p>{id}</p>
            <p>{clump_thickness}</p>
            <p>{uniformity_of_cell_size}</p>
            <p>{uniformity_of_cell_shape}</p>
            <p>{marginal_adhesion}</p>
            <p>{single_epithlial_cell_size}</p>
            <p>{bare_nuclei}</p>
            <p>{bland_chromatin}</p>
            <p>{normal_nuceoli}</p>
            <p>{mitoses}</p>
            <p>{eclass}</p>
        </div>
    )
}

export default CancerStat