import '../Info.css'

const CancerStat = (props) => {

    const {eclass,id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithlial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = props
    return(
        <tr>
            <td>{id}</td>
            <td>{clump_thickness}</td>
            <td>{uniformity_of_cell_size}</td>
            <td>{uniformity_of_cell_shape}</td>
            <td>{marginal_adhesion}</td>
            <td>{single_epithlial_cell_size}</td>
            <td>{bare_nuclei}</td>
            <td>{bland_chromatin}</td>
            <td>{normal_nuceoli}</td>
            <td>{mitoses}</td>
            <td>{eclass}</td>
        </tr>
    )
}

export default CancerStat