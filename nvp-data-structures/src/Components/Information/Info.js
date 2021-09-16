import React, { Component } from 'react'
// import axios from 'axios';
import axios from 'axios'
import './Info.css'
import data from './data'
import InfoItem from './InfoItem'
import BookData from './BookData'
import CancerStat from './CancerStat'
import AddCancerStat from './AddCancerStat'
import Employee from './Employee'

class Info extends Component {
    constructor(props){
        super();

        this.state = {
            employeeSearch:"",
            nvpEmployees:[],
            indexing:0,
            isMobile:false,
            dataItems:[],
            dataItems1:[],
            cancerStats:[],
            dataView:false,
            data1View:false,
            data2View:false,
            data3View:false,
            cancerDataInput:false,
            cancerSearch:"",
            id:0,
            clump_thickness:0,
            uniformity_of_cell_size:0,
            uniformity_of_cell_shape:0,
            marginal_adhesion:0,
            single_epithelial_cell_size:0,
            bare_nuclei:0,
            bland_chromatin:0,
            normal_nuceoli:0,
            mitoses:0
            
        }
        this.dataSelected = this.dataSelected.bind(this)
        this.data1Selected = this.data1Selected.bind(this)
        this.data2Selected = this.data2Selected.bind(this)
        this.resetView = this.resetView.bind(this)
        this.addCancerData = this.addCancerData.bind(this)
        this.addToCancerPending = this.addToCancerPending.bind(this)
        this.handleCancerForm = this.handleCancerForm.bind(this)
        this.refreshCancer = this.refreshCancer.bind(this)
        this.resetCancerStats = this.resetCancerStats.bind(this)
        // this.filterCancer = this.filterCancer.bind(this)
        // this.filterEmployee = this.filterEmployee.bind(this)

        // this.changeView = this.changeView.bind(this)
    }

    // componentDidMount(){
    //     axios.get('/api/testdata/all').then(res => {
    //         console.log('this should be test data', res.status)
    //         this.setState({dataTesting:res.data})
    //     })
    //     // this.setState({dataItems:data})
    // }

    componentDidMount(){
        axios.get('/api/testdata/all').then(res => {

            this.setState({ dataItems1 : res.data})
        })

        axios.get('api/cancer/all').then(res => {
            this.setState({cancerStats : res.data})
        })

        axios.get('api/employees/all').then(res => {
            this.setState({nvpEmployees : res.data})
        })

        this.setState({dataItems:data})
    }

    // ---- Employee data functions ---- //
    handleEmployeeSearch = (filter) => {
        this.setState({employeeSearch:filter})
    }


    // ---- cancer data functions ---- //
    handleCancerSearch = (filter) => {
        this.setState({cancerSearch:filter})
    }
    handleCancerForm(prop,val) {
        this.setState({
            [prop]:val
        })
    }
    addToCancerPending() {
        const {
            id,
            clump_thickness,
            uniformity_of_cell_size,
            uniformity_of_cell_shape,
            marginal_adhesion,
            single_epithelial_cell_size,
            bare_nuclei,
            bland_chromatin,
            normal_nuceoli,
            mitoses
        } = this.state
        axios.post('/api/cancer/add',{id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithelial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses})
            this.addCancerData()
            this.setState({
                id:0,
                clump_thickness:0,
                uniformity_of_cell_size:0,
                uniformity_of_cell_shape:0,
                marginal_adhesion:0,
                single_epithelial_cell_size:0,
                bare_nuclei:0,
                bland_chromatin:0,
                normal_nuceoli:0,
                mitoses:0
            })
    }
    addCancerData(params) {
        this.setState({
            cancerDataInput:!this.state.cancerDataInput
        })
    }
    refreshCancer = async () => {
        console.log('refresh list')
        this.resetCancerStats().then(
        axios.get('api/cancer/all').then(res => {
            this.setState({cancerStats : res.data})
        })
        )}
    resetCancerStats = async () => {
        this.setState({
            cancerStats:[],
            cancerSearch:""  
        })
    }
    // -- ^ cancer information above ^ -- //
    // ---------------------------------------------//

    // ---- database salection ---- //
    dataSelected(params) {
        this.resetView()
        this.setState({
            dataView:!this.state.dataView
        })
    }
    data1Selected(params) {
        this.resetView()
        this.setState({
            data1View:!this.state.data1View
        })
    }
    data2Selected(params) {
        this.resetView()
        this.setState({
            data2View:!this.state.data2View
        })
    }
    resetView() {
        this.setState({
            dataView:false,
            data1View:false,
            data2View:false
        })
    }
    // -------------------------------------------- //

    render(){
        
        const { data3View,cancerSearch,dataItems,dataItems1,dataView,data1View,data2View,cancerDataInput,cancerStats,isMobile,evenTable,nvpEmployees,employeeSearch } = this.state

        const mappedData = dataItems1.map(element => {
            return <InfoItem key={element.index} ids={element.ids} results={element.results} />
        })

        const mappedBookData = dataItems.map(element => {
            return <BookData key={element.id} author={element.author} />
        })

        // -- seach for and display a particular cancer data by element.id -- //
        const filterCancer = cancerStats.filter(element => element.id.toString().includes(cancerSearch))
        const mappedCancerStatsS = filterCancer.map(element => {            
            return <CancerStat key={element.data_id} data_id={element.data_id} eclass={element.class} id={element.id} clump_thickness={element.clump_thickness} uniformity_of_cell_size={element.uniformity_of_cell_size} uniformity_of_cell_shape={element.uniformity_of_cell_shape}  marginal_adhesion={element.marginal_adhesion} single_epithelial_cell_size={element.single_epithelial_cell_size} bare_nuclei={element.bare_nuclei} bland_chromatin={element.bland_chromatin} normal_nuceoli={element.normal_nuceoli} mitoses={element.mitoses} />
        })
        // ------------------------------------------------------------------- //

        const filterEmployee = nvpEmployees.filter(element => element.name.toString().includes(employeeSearch))
        const mappedEmployees = filterEmployee.map(element => {
            return <Employee key={element.index} id={element.index} name={element.name} age={element.age} start_month={element.start_month} start_year={element.start_year} end_month={element.end_month} end_year={element.end_year} employment_duration={element.employment_duration} distance={element.distance} married={element.married} pay={element.pay} attendance={element.attendance} />
        })
        
        return(
            <div className="info-container">
                {/* <section className="header-menu">
                    <h3 className="info-h4">Database</h3>
                    {!data1View ? (<h4 className="info-h3" onClick={this.data1Selected}>sample data</h4>) : (<h4 className="info-h4-selected" onClick={this.data1Selected}>samples data</h4>)}

                    {!dataView ? (<h4 className="info-h3" onClick={this.dataSelected}>authors</h4>) : (<h4 className="info-h4-selected" onClick={this.dataSelected}>authors</h4>)}

                    {!data2View ? (<h4 className="info-h3" onClick={this.data2Selected}>cancer stats</h4>) : (<h4 className="info-h4-selected" onClick={this.data2Selected}>cancer stats</h4>)}
                </section> */}
                <section className="right-column">
                <div className="data-header">
                <h3 className="info-h4">Database</h3>
                    {!data1View ? (<h4 className="info-h3" onClick={this.data1Selected}>sample data</h4>) : (<h4 className="info-h4-selected" onClick={this.data1Selected}>sample data</h4>)}

                    {!dataView ? (<h4 className="info-h3" onClick={this.dataSelected}>authors</h4>) : (<h4 className="info-h4-selected" onClick={this.dataSelected}>authors</h4>)}

                    {!data2View ? (<h4 className="info-h3" onClick={this.data2Selected}>cancer stats</h4>) : (<h4 className="info-h4-selected" onClick={this.data2Selected}>cancer stats</h4>)}
                </div>
                    <p className="p-logout-text" onClick={this.props.logout}>logout</p>
                    {data2View ? (
                        <div>
                            <div className="cancer-search-bar" ><p className="p-search-line" onClick={this.addCancerData}>add info?</p><p className="p-search-line" onClick={this.refreshCancer}>refresh</p><input onChange={e => this.handleCancerSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                            <div className={`cancer-stats-input ${cancerDataInput ? false : 'cancer-stats-input-hide'}`}>
                                <div className="input-element"><input placeholder="id" onChange={e => this.handleCancerForm('id',e.target.value)}/><p className="p-text-generic">id</p><p className="p-add-stat-text" onClick={this.addCancerData}>add info?</p></div>
                                <div className="input-element"><input placeholder="Clump Thickness" onChange={e => this.handleCancerForm('clump_thickness',e.target.value)}/><p className="p-text-generic">Clump Thickness</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell size" onChange={e => this.handleCancerForm('uniformity_of_cell_size',e.target.value)}/><p className="p-text-generic">Uniformity of cell size</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell shape" onChange={e => this.handleCancerForm('uniformity_of_cell_shape',e.target.value)}/><p className="p-text-generic">Uniformity of cell shape</p></div>
                                <div className="input-element"><input placeholder="Marginal adhesion" onChange={e => this.handleCancerForm('marginal_adhesion',e.target.value)}/><p className="p-text-generic">Marginal adhesion</p></div>
                                <div className="input-element"><input placeholder="Sinlge opithelial cell size" onChange={e => this.handleCancerForm('single_epithelial_cell_size',e.target.value)}/><p className="p-text-generic">Sinlge opithelial cell size</p></div>
                                <div className="input-element"><input placeholder="Bare nuclei" onChange={e => this.handleCancerForm('bare_nuclei',e.target.value)}/><p className="p-text-generic">Bare nuclei</p></div>
                                <div className="input-element"><input placeholder="Bland nuceoli" onChange={e => this.handleCancerForm('bland_chromatin',e.target.value)}/><p className="p-text-generic">Bland nuceoli</p></div>
                                <div className="input-element"><input placeholder="Normal nuceoli" onChange={e => this.handleCancerForm('normal_nuceoli',e.target.value)}/><p className="p-text-generic">Normal nuceoli</p></div>
                                <div className="input-element"><input placeholder="Mitoses" onChange={e => this.handleCancerForm('mitoses',e.target.value)}/><p className="p-text-generic">Mitoses</p></div>
                                <button onClick={this.addToCancerPending}>submit</button>
                            </div>
                            {/* <div className="info-list"><h4>id</h4><a>clump Thickness</a><h6>uniformity of cell size</h6><h6>uniformity of cell shape</h6><h6>marginal adhesion</h6><h6>single epithelial cell size</h6><h6>id</h6><h6>id</h6><h6>id</h6><h6>id</h6><h4>results</h4></div> */}
                            <div className="data-spec"><a>id</a><a>clump Thickness</a><a>unif. cell size</a><a>unif. cell shape</a><a>marg. adhesion</a><a>single epi. cell size</a><a>bare nuclei</a><a>bland chrom.</a><a>norm. nuceoli</a><a>mitoses</a><a>results</a></div>
                            {mappedCancerStatsS}
                        </div>
                    ) : (<div></div>)}

                    {data3View ? (<div>
                        <div className="data-spec"><a>Name</a><a>Age</a><a>Start Month</a><a>Start Year</a><a>End Month</a><a>End Year</a><a>Employment Duration</a><a>Distance</a><a>Married</a><a>Pay Rate</a><a>Attendance</a></div>
                        <div className="cancer-search-bar" ><p className="p-search-line" >add info?</p><p className="p-search-line" >refresh</p><input onChange={e => this.handleEmployeeSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                        {mappedEmployees}

                    </div>) : (<div></div>)}

                    {data1View ? (
                        <div>
                            <h2 className="info-h2">predictions</h2>
                            <div className="info-list"><h4>id</h4><h4>results</h4></div>
                            {mappedData}
                            {/* <p className="p-text" onClick={this.addCancerData}>add info?</p> */}
                            {/* {cancerDataInput ?(<div className="cancer-stats-input">
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                                <input placeholder="text"/>
                            </div>)
                            : 
                            (<div></div>)} */}
                        </div>
                    ) : (<div></div>)}

                    {dataView ? (
                        <div>
                            <h2 className="info-h2">names</h2>
                            <div className="info-list"></div>
                            {mappedBookData}
                        </div>
                    ) : (<div></div>)}
                    
                </section>
            </div>
        )
    }
}

export default Info