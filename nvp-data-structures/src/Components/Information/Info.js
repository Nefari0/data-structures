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
import Loading from '../Loading/Loading'
import Titanic from './Titanic/Titanic'
import Passenger from './Passenger'

class Info extends Component {
    constructor(props){
        super();

        this.state = {
            isLoading:false,
            showMachineLearning:true,
            showDatabaselist:false,
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
            // employee data //
            employeeDataInput:false,

            // passenger data
            showPassengers:false,
            passengers:[],

            // cancer data //
            cancer_result:[],
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
            // ------------- //

            
        }
        this.dataSelected = this.dataSelected.bind(this)
        this.data1Selected = this.data1Selected.bind(this)
        this.data2Selected = this.data2Selected.bind(this)
        this.data3Selected = this.data3Selected.bind(this)
        this.resetView = this.resetView.bind(this)
        this.addCancerData = this.addCancerData.bind(this)
        this.addToCancerPending = this.addToCancerPending.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.refreshCancer = this.refreshCancer.bind(this)
        this.resetCancerStats = this.resetCancerStats.bind(this)
        this.handleShowDatabase = this.handleShowDatabase.bind(this)
        this.handleShowMachineLearning = this.handleShowMachineLearning.bind(this)
        this.startLoading = this.startLoading.bind(this)
        this.addEmployeeData = this.addEmployeeData.bind(this)
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.getOneResult = this.getOneResult.bind(this)
        this.clearCancerDataForm = this.clearCancerDataForm.bind(this)
        this.titanicDataSelected = this.titanicDataSelected.bind(this)
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
        // this.startLoading()
        axios.get('/api/testdata/all').then(res => {

            this.setState({ dataItems1 : res.data})
        })

        axios.get('api/cancer/all').then(res => {
            this.setState({cancerStats : res.data})
        })

        axios.get('api/employees/all').then(res => {
            this.setState({nvpEmployees : res.data})
        })

        axios.get('api/passengers/all').then(res => {
            this.setState({passengers : res.data})
        })
        
        // this.startLoading()

        this.setState({dataItems:data})
    }

    // ---- adding info to data base using this form function ---- //
    handleForm(prop,val) {
        this.setState({
            [prop]:val
        })
    }
    // ---------------------------------------------------------- //

    // ---- loading data image functions --- //
    startLoading = () => {
        this.setState({isLoading:!this.state.isLoading})
    }
    // ------------------------------------- //

    // ---- show database options ---- //
    handleShowDatabase(params) {
        this.setState({showDatabaselist:!this.state.showDatabaselist})
    }
    // ------------------------------- //

    //  ---- show machine learning options ---- //
    handleShowMachineLearning(params) {
        this.setState({showMachineLearning:!this.state.showMachineLearning})
    }
    // ---------------------------------------- //

    // ---- Titanic data functions ---- //

    // -------------------------------  //

    // ---- Employee data functions ---- //
    handleEmployeeSearch = (filter) => {
        this.setState({employeeSearch:filter})
    }
    addEmployeeData() {
        this.setState({employeeDataInput:!this.state.employeeDataInput})
    }
    refreshEmployees = async () => {
        this.startLoading()
        this.resetEmployeeStats().then(
            axios.get('api/employees/all').then(res => {
                this.setState({nvpEmployees:res.data})
                this.startLoading()
            })
        )}
    resetEmployeeStats = async () => {
        this.setState({
            nvpEmployees:[],
            employeeSearch:""
        })
    }
    // ---------------------------------- //


    // ---- cancer data functions ---- //
    handleCancerSearch = (filter) => {
        this.setState({cancerSearch:filter})
    }

    getOneResult = async () => {
        await axios.get('/api/cancer/result').then(res => this.setState({cancer_result : res.data}))
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
        // axios.post('/api/cancer/transceive',{id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithelial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses})
            // this.getOneResult()
            this.addCancerData()
            this.clearCancerDataForm()
            // this.setState({
            //     id:0,
            //     clump_thickness:0,
            //     uniformity_of_cell_size:0,
            //     uniformity_of_cell_shape:0,
            //     marginal_adhesion:0,
            //     single_epithelial_cell_size:0,
            //     bare_nuclei:0,
            //     bland_chromatin:0,
            //     normal_nuceoli:0,
            //     mitoses:0
            // })
    }
    addCancerData(params) {
        this.setState({
            cancerDataInput:!this.state.cancerDataInput 
        })
    }
    refreshCancer = async () => {
        this.startLoading()

        this.resetCancerStats().then(
            axios.get('api/cancer/all').then(res => {
            this.setState({cancerStats : res.data})
            this.startLoading()
        })
    )}
    resetCancerStats = async () => {
        this.setState({
            cancerStats:[],
            cancerSearch:""
        })
    }
    clearCancerDataForm() {
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
    data3Selected(params) {
        this.resetView()
        this.setState({
            data3View:!this.state.data3View
        })
    }
    titanicDataSelected(params) {
        this.resetView()
        this.setState({
            showPassengers:!this.state.showPassengers
        })
    }
    resetView() {
        this.setState({
            dataView:false,
            data1View:false,
            data2View:false,
            data3View:false,
            showDatabaselist:false,
            showPassengers:false,
            showMachineLearning:true    
        })
    }
    // -------------------------------------------- //

    render(){
        
        const { employeeDataInput,isLoading,showDatabaselist,showMachineLearning,data3View,cancerSearch,dataItems,dataItems1,dataView,data1View,data2View,cancerDataInput,cancerStats,isMobile,evenTable,nvpEmployees,employeeSearch,cols,showPassengers,passengers } = this.state

        const mappedData = dataItems1.map(element => {
            return <InfoItem key={element.index} ids={element.ids} results={element.results} />
        })

        const mappedBookData = dataItems.map(element => {
            return <BookData key={element.id} author={element.author} />
        })

        // -- seach for and display a particular cancer data by element.id -- //
        const filterCancer = cancerStats.filter(element => element.id.toString().includes(cancerSearch))
        const mappedCancerStatsS = filterCancer.map(element => {            
            return <CancerStat key={element.data_id} data_id={element.data_id} eclass={element.class} id={element.id} clump_thickness={element.clump_thickness} uniformity_of_cell_size={element.uniformity_of_cell_size} uniformity_of_cell_shape={element.uniformity_of_cell_shape}  marginal_adhesion={element.marginal_adhesion} single_epithelial_cell_size={element.single_epithelial_cell_size} bare_nuclei={element.bare_nuclei} bland_chromatin={element.bland_chromatin} normal_nuceoli={element.normal_nuceoli} mitoses={element.mitoses} cols={cols} />
        })
        // ------------------------------------------------------------------- //

        const filterEmployee = nvpEmployees.filter(element => element.name.toString().includes(employeeSearch))
        const mappedEmployees = filterEmployee.map(element => {
            return <Employee key={element.index} id={element.index} name={element.name} age={element.age} start_month={element.start_month} start_year={element.start_year} end_month={element.end_month} end_year={element.end_year} employment_duration={element.employment_duration} distance={element.distance} married={element.married} pay={element.pay} attendance={element.attendance} />
        })

        const mappedPassengers = passengers.map(element => {
            return <Passenger data={element} key={element.index} age={element.age} name={element.name} pclass={element.pclass} sex={element.sex} siblings_spouses_aboard={element.siblings_spouses_aboard} parents_children_aboard={element.parents_children_aboard} survived={element.survived} />
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
                    <div><h3 className="info-h4" onClick={this.handleShowDatabase} >Database</h3>
                        <div className={`database-dropdown ${showDatabaselist ? true : 'database-dropdown-hide'}`}>
                            {!data2View ? (<h4 className="info-h3" onClick={this.data2Selected}>cancer stats</h4>) : (<h4 className="info-h4-selected" onClick={this.data2Selected}>cancer stats</h4>)}
                            {!showPassengers ? (<h4 className="info-h3" onClick={this.titanicDataSelected}>passengers</h4>) : (<h4 className="info-h4-selected" onClick={this.titanicDataSelected}>passengers</h4>)}
                            {!data3View ? (<h4 className="info-h3" onClick={this.data3Selected}>employees</h4>) : (<h4 className="info-h4-selected" onClick={this.data3Selected}>employees</h4>)}
                            {!data1View ? (<h4 className="info-h3" onClick={this.data1Selected}>sample data</h4>) : (<h4 className="info-h4-selected" onClick={this.data1Selected}>sample data</h4>)}
                            {!dataView ? (<h4 className="info-h3" onClick={this.dataSelected}>authors</h4>) : (<h4 className="info-h4-selected" onClick={this.dataSelected}>authors</h4>)}
                        </div>
                    </div>
                    <div><h3 className="info-h4" onClick={this.handleShowMachineLearning} >machine learning</h3>
                        <div className={`database-dropdown ${!showMachineLearning ? true : 'database-dropdown-hide'}`}>
                            {!data2View ? (<h4 className="info-h3">regression</h4>) : (<h4 className="info-h4-selected" >regression</h4>)}
                            {!data3View ? (<h4 className="info-h3" >classification</h4>) : (<h4 className="info-h4-selected" >classification</h4>)}
                            {!data1View ? (<h4 className="info-h3" >clustering</h4>) : (<h4 className="info-h4-selected" >clustering</h4>)}
                            {!dataView ? (<h4 className="info-h3" >association rule learning</h4>) : (<h4 className="info-h4-selected" >association rule learning</h4>)}
                            {!dataView ? (<h4 className="info-h3" >reinforcement learning</h4>) : (<h4 className="info-h4-selected" >reinforcement learning</h4>)}
                            {!dataView ? (<h4 className="info-h3" >natural language processing</h4>) : (<h4 className="info-h4-selected" >natural language processing</h4>)}
                            {!dataView ? (<h4 className="info-h3" >dimensionality reduction</h4>) : (<h4 className="info-h4-selected" >dimensionality reduction</h4>)}
                            {!dataView ? (<h4 className="info-h3" >neural networks</h4>) : (<h4 className="info-h4-selected" >deep learning</h4>)}
                        </div>
                    </div>

                    <div><h3 className="info-h4" onClick={this.handleShowMachineLearning} >message board</h3></div>

                </div>

                    <p className="p-logout-text" onClick={this.props.logout}>logout</p>

                    {showPassengers ? (
                        <div>
                            <div className="stats-container">
                                {isLoading ? <Loading/> : null}
                                <div className="data-spec"><a>name</a><a>class</a><a>gender</a><a>siblings_spouses_aboard</a><a>parents_children_aboard</a><a>results</a></div>
                                <span className="data-spec-list">{mappedPassengers}</span>
                            </div>
                        </div>
                    ) : null}

                    {data2View ? (
                        <div>
                            <div className="search-bar" ><p className="p-search-line" onClick={this.addCancerData}>add info?</p><p className="p-search-line" onClick={this.refreshCancer}>refresh</p><input onChange={e => this.handleCancerSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                            <div className={`cancer-stats-input ${cancerDataInput ? false : 'cancer-stats-input-hide'}`}>
                                <div className="input-element"><input placeholder="id" onChange={e => this.handleForm('id',e.target.value)}/><p className="p-text-generic">id</p><p className="p-add-stat-text" onClick={this.addCancerData}>add info?</p></div>
                                <div className="input-element"><input placeholder="Clump Thickness" onChange={e => this.handleForm('clump_thickness',e.target.value)}/><p className="p-text-generic">Clump Thickness</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell size" onChange={e => this.handleForm('uniformity_of_cell_size',e.target.value)}/><p className="p-text-generic">Uniformity of cell size</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell shape" onChange={e => this.handleForm('uniformity_of_cell_shape',e.target.value)}/><p className="p-text-generic">Uniformity of cell shape</p></div>
                                <div className="input-element"><input placeholder="Marginal adhesion" onChange={e => this.handleForm('marginal_adhesion',e.target.value)}/><p className="p-text-generic">Marginal adhesion</p></div>
                                <div className="input-element"><input placeholder="Sinlge opithelial cell size" onChange={e => this.handleForm('single_epithelial_cell_size',e.target.value)}/><p className="p-text-generic">Sinlge opithelial cell size</p></div>
                                <div className="input-element"><input placeholder="Bare nuclei" onChange={e => this.handleForm('bare_nuclei',e.target.value)}/><p className="p-text-generic">Bare nuclei</p></div>
                                <div className="input-element"><input placeholder="Bland nuceoli" onChange={e => this.handleForm('bland_chromatin',e.target.value)}/><p className="p-text-generic">Bland nuceoli</p></div>
                                <div className="input-element"><input placeholder="Normal nuceoli" onChange={e => this.handleForm('normal_nuceoli',e.target.value)}/><p className="p-text-generic">Normal nuceoli</p></div>
                                <div className="input-element"><input placeholder="Mitoses" onChange={e => this.handleForm('mitoses',e.target.value)}/><p className="p-text-generic">Mitoses</p></div>
                                <button onClick={this.addToCancerPending}>submit</button>
                            </div>
                            {/* <div className="info-list"><h4>id</h4><a>clump Thickness</a><h6>uniformity of cell size</h6><h6>uniformity of cell shape</h6><h6>marginal adhesion</h6><h6>single epithelial cell size</h6><h6>id</h6><h6>id</h6><h6>id</h6><h6>id</h6><h4>results</h4></div> */}
                            <div className="stats-container">
                                {isLoading ? <Loading/> : null}
                                <div className="data-spec"><a>id</a><a>clump Thickness</a><a>unif. cell size</a><a>unif. cell shape</a><a>marg. adhesion</a><a>single epi. cell size</a><a>bare nuclei</a><a>bland chrom.</a><a>norm. nuceoli</a><a>mitoses</a><a>results</a></div>
                                <span className="data-spec-list">{mappedCancerStatsS}</span>
                            </div>
                        </div>
                    ) : (<div></div>)}

                    {data3View ? (<div>
                        <div className="search-bar" ><p className="p-search-line"  onClick={this.addEmployeeData}>add info?</p><p className="p-search-line" onClick={this.refreshEmployees}>refresh</p><input onChange={e => this.handleEmployeeSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                        <div className={`cancer-stats-input ${employeeDataInput ? false : 'cancer-stats-input-hide'}`}>
                                <div className="input-element"><input placeholder="id" onChange={e => this.handleForm('id',e.target.value)}/><p className="p-text-generic">id</p><p className="p-add-stat-text" onClick={this.addCancerData}>add info?</p></div>
                                <div className="input-element"><input placeholder="Clump Thickness" onChange={e => this.handleForm('clump_thickness',e.target.value)}/><p className="p-text-generic">Clump Thickness</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell size" onChange={e => this.handleForm('uniformity_of_cell_size',e.target.value)}/><p className="p-text-generic">Uniformity of cell size</p></div>
                                <div className="input-element"><input placeholder="Uniformity of cell shape" onChange={e => this.handleForm('uniformity_of_cell_shape',e.target.value)}/><p className="p-text-generic">Uniformity of cell shape</p></div>
                                <div className="input-element"><input placeholder="Marginal adhesion" onChange={e => this.handleForm('marginal_adhesion',e.target.value)}/><p className="p-text-generic">Marginal adhesion</p></div>
                                <div className="input-element"><input placeholder="Sinlge opithelial cell size" onChange={e => this.handleForm('single_epithelial_cell_size',e.target.value)}/><p className="p-text-generic">Sinlge opithelial cell size</p></div>
                                <div className="input-element"><input placeholder="Bare nuclei" onChange={e => this.handleForm('bare_nuclei',e.target.value)}/><p className="p-text-generic">Bare nuclei</p></div>
                                <div className="input-element"><input placeholder="Bland nuceoli" onChange={e => this.handleForm('bland_chromatin',e.target.value)}/><p className="p-text-generic">Bland nuceoli</p></div>
                                <div className="input-element"><input placeholder="Normal nuceoli" onChange={e => this.handleForm('normal_nuceoli',e.target.value)}/><p className="p-text-generic">Normal nuceoli</p></div>
                                <div className="input-element"><input placeholder="Mitoses" onChange={e => this.handleForm('mitoses',e.target.value)}/><p className="p-text-generic">Mitoses</p></div>
                                <button>submit</button>
                            </div>
                        <div className="data-spec"><a>Name</a><a>Age</a><a>Start Month</a><a>Start Year</a><a>End Month</a><a>End Year</a><a>Employment Duration</a><a>Distance</a><a>Married</a><a>Pay Rate</a><a>Attendance</a></div>
                        {/* {mappedEmployees} */}
                        <div className="stats-container">
                            {isLoading ? <Loading/> : null}
                                {/* <div className="data-spec"><a>id</a><a>clump Thickness</a><a>unif. cell size</a><a>unif. cell shape</a><a>marg. adhesion</a><a>single epi. cell size</a><a>bare nuclei</a><a>bland chrom.</a><a>norm. nuceoli</a><a>mitoses</a><a>results</a></div> */}
                                <span className="data-spec-list">{mappedEmployees}</span>
                        </div>

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