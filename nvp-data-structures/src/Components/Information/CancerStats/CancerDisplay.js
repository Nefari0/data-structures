import CancerStat from "../CancerStat"
import Loading from "../../Loading/Loading"
import { useState,useEffect } from "react"
import axios from "axios"
import { handle } from "express/lib/application"

const CancerDisplay = (props) => {

    // axios.get('api/cancer/all').then(res => {
        // this.setState({cancerStats : res.data})
    // })

    const [state,setState] = useState({
        id:0,
        clump_thickness:0,
        uniformity_of_cell_size:0,
        uniformity_of_cell_shape:0,
        marginal_adhesion:0,
        single_epithelial_cell_size:0,
        bare_nuclei:0,
        bland_chromatin:0,
        normal_nuceoli:0,
        mitoses:0,
    })

    const returnZeros = () => {
        setState({
            id:0,
            clump_thickness:0,
            uniformity_of_cell_size:0,
            uniformity_of_cell_shape:0,
            marginal_adhesion:0,
            single_epithelial_cell_size:0,
            bare_nuclei:0,
            bland_chromatin:0,
            normal_nuceoli:0,
            mitoses:0,
        })
    }

    const [cancerStats,setCancerStats] = useState([])
    const [cancerSearch,setCancerSearch] = useState('')
    const [formOpen,setFormOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        grabStats()
    },[])

    const handleInputChange = (prop,event) => {
        event.persist();
        setState((state) => ({
            ...state,
            [prop]: event.target.value,
        }));
    };

    const grabStats = async () => {
        await setIsLoading(true)
        await axios.get('api/cancer/all').then(res => {
            setCancerStats(res.data)
        })
        await setIsLoading(false)
    }

    const addToCancerPending = async () => {
        await setIsLoading(true)
        await axios.post('/api/cancer/add',state)
        await grabStats()
        await returnZeros()
        await setIsLoading(false)
    }

    // const mappedCancerStatsS = cancerStats.map(element => {            
    //     return <CancerStat key={element.id} data_id={element.id} eclass={element.class} id={element.id} clump_thickness={element.clump_thickness} uniformity_of_cell_size={element.uniformity_of_cell_size} uniformity_of_cell_shape={element.uniformity_of_cell_shape}  marginal_adhesion={element.marginal_adhesion} single_epithelial_cell_size={element.single_epithelial_cell_size} bare_nuclei={element.bare_nuclei} bland_chromatin={element.bland_chromatin} normal_nuceoli={element.normal_nuceoli} mitoses={element.mitoses} />
    // })

    // ---- THESE BLOCKS FOR SEARCHING ----- ///
    const filterCancer = cancerStats.filter(element => element.id.toString().includes(cancerSearch))
    // console.log('here is cancer stats',filterCancer)
    const mappedCancerStatsS = filterCancer.map(element => {            
        return <CancerStat key={element.id} data_id={element.id} eclass={element.class} id={element.id} clump_thickness={element.clump_thickness} uniformity_of_cell_size={element.uniformity_of_cell_size} uniformity_of_cell_shape={element.uniformity_of_cell_shape}  marginal_adhesion={element.marginal_adhesion} single_epithelial_cell_size={element.single_epithelial_cell_size} bare_nuclei={element.bare_nuclei} bland_chromatin={element.bland_chromatin} normal_nuceoli={element.normal_nuceoli} mitoses={element.mitoses} />
    })
    // ------------------------------------- //

    return(
        <div>
            <section className="search-bar" >
                <p className="p-search-line" onClick={() => setFormOpen(!formOpen)}>add info?</p>
                <p className="p-search-line" onClick={() => grabStats()}>refresh</p>
                <input onChange={e => setCancerSearch(e.target.value)} type="text" placeholder="Search" className="search-input" />
            </section>
            <form className={`stats-input ${formOpen ? false : 'stats-input-hide'}`}>
                <input placeholder="id" onChange={e => handleInputChange('id',e)}/>
                <input placeholder="Clump Thickness" onChange={e => handleInputChange('clump_thickness',e)}/>
                <input placeholder="Uniformity of cell size" onChange={e => handleInputChange('uniformity_of_cell_size',e)}/>
                <input placeholder="Uniformity of cell shape" onChange={e => handleInputChange('uniformity_of_cell_shape',e)}/>
                <input placeholder="Marginal adhesion" onChange={e => handleInputChange('marginal_adhesion',e)}/>
                <input placeholder="Sinlge opithelial cell size" onChange={e => handleInputChange('single_epithelial_cell_size',e)}/>
                <input placeholder="Bare nuclei" onChange={e => handleInputChange('bare_nuclei',e)}/>
                <input placeholder="Bland nuceoli" onChange={e => handleInputChange('bland_chromatin',e)}/>
                <input placeholder="Normal nuceoli" onChange={e => handleInputChange('normal_nuceoli',e)}/>
                <input placeholder="Mitoses" onChange={e => handleInputChange('mitoses',e)}/>
                <button onClick={() => addToCancerPending()}>submit</button>
            </form>
            <section className="stats-container">
                {isLoading ? <Loading/> : null}
                <header className="data-spec"><strong>id</strong><strong>clump Thickness</strong><strong>unif. cell size</strong><strong>unif. cell shape</strong><strong>marg. adhesion</strong><strong>single epi. cell size</strong><strong>bare nuclei</strong><strong>bland chrom.</strong><strong>norm. nuceoli</strong><strong>mitoses</strong><strong>results</strong></header>

                <span className="data-spec-list">{mappedCancerStatsS}</span>
            </section>
        </div>
    )
}

export default CancerDisplay