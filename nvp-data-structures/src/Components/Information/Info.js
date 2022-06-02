import React, { Component } from 'react'
// import axios from 'axios';
import axios from 'axios'
import './Info.css'
import data from './data'
// import InfoItem from './InfoItem'
// import BookData from './BookData'
// import CancerStat from './CancerStat'
import CancerDisplay from './CancerStats/CancerDisplay'
// import AddCancerStat from './AddCancerStat'
import Employee from './Employee'
import Loading from '../Loading/Loading'
import Titanic from './Titanic/Titanic'
import Passenger from './Passenger'
import { connect } from 'react-redux'
import { logoutUser } from './../../redux/userReducer'
// import Py from '../pytest/Py'

class Info extends Component {
    constructor(props){
        super();

        this.state = {
            isLoading:false,

            employeeSearch:"",
            nvpEmployees:[],
            indexing:0,
            isMobile:false,

            // employee data //
            employeeDataInput:false,

            // passenger data
            showPassengers:false,
            passengers:[],

            // - selecting view - //
            currentView:'',

            // - selecting menu - //
            currentMenu:'',
            
        }
        this.handleForm = this.handleForm.bind(this)
        this.addEmployeeData = this.addEmployeeData.bind(this)
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.refreshPassengers = this.refreshPassengers.bind(this)
    }

    componentDidMount(){
        axios.get('api/employees/all').then(res => {
            this.setState({nvpEmployees : res.data})
        })

        axios.get('api/passengers/all').then(res => {
            this.setState({passengers : res.data})
        })
    }

    // ---- State Management ---- //
    handleForm(prop,val) {
        this.setState({
            [prop]:val
        })
    }

    // ---- Titanic data functions ---- //
    refreshPassengers() {
        // this.startLoading()
        axios.get('api/passengers/all').then(res => {
            this.setState({passengers:res.data})
            // this.startLoading()
        })
    }
    // -------------------------------  //

    // ---- Employee data functions ---- //
    handleEmployeeSearch = (filter) => {
        this.setState({employeeSearch:filter})
    }
    addEmployeeData() {
        this.setState({employeeDataInput:!this.state.employeeDataInput})
    }
    refreshEmployees = async () => {
        // this.startLoading()
        this.resetEmployeeStats().then(
            axios.get('api/employees/all').then(res => {
                this.setState({nvpEmployees:res.data})
                // this.startLoading()
            })
        )}
    resetEmployeeStats = async () => {
        this.setState({
            nvpEmployees:[],
            employeeSearch:""
        })
    }

    render(){
        
        const { currentView,employeeDataInput,isLoading,currentMenu,showMachineLearning,data3View: employeeView,cancerSearch,dataItems,dataItems1,dataView,data1View,data2View: cancerView,cancerDataInput,cancerStats,isMobile,evenTable,nvpEmployees,employeeSearch,cols,showPassengers: passengersView,passengers } = this.state

        const filterEmployee = nvpEmployees.filter(element => element.name.toString().includes(employeeSearch))
        const mappedEmployees = filterEmployee.map(element => {
            return <Employee key={element.index} id={element.index} name={element.name} age={element.age} start_month={element.start_month} start_year={element.start_year} end_month={element.end_month} end_year={element.end_year} employment_duration={element.employment_duration} distance={element.distance} married={element.married} pay={element.pay} attendance={element.attendance} />
        })

        const mappedPassengers = passengers.map(element => {
            return <Passenger data={element} key={element.index} age={element.age} name={element.name} pclass={element.pclass} sex={element.sex} siblings_spouses_aboard={element.siblings_spouses_aboard} parents_children_aboard={element.parents_children_aboard} survived={element.survived} />
        })
        
        return(
            <div className="info-container">
                <section className="right-column">

                <div className="data-header">
                    <div><h3 className="info-h4" onClick={() => this.handleForm('currentMenu','db')} >Database</h3>
                        <div className={`database-dropdown ${currentMenu === 'db' ? true : 'database-dropdown-hide'}`}>

                            <h4 className={` ${currentView === 'cancerView' ? 'info-h3-selected' : 'info-h3'}`} onClick={() => this.handleForm('currentView','cancerView')}>cancer stats</h4>

                            <h4 className={`${currentView === 'passengersView' ? 'info-h3-selected' : 'info-h3' }`} onClick={() => this.handleForm('currentView','passengersView')}>passengers</h4>

                            <h4 className={`${currentView === 'employeeView' ? 'infor-h3-selected' : 'infor-h3'}`} onClick={() => this.handleForm('currentView','employeeView')}>employees</h4>

                        </div>
                    </div>
                    <div><h3 className="info-h3"  onClick={() => this.handleForm('currentMenu','ml')} >machine learning</h3>
                        {/* <div className={`database-dropdown ${!showMachineLearning ? true : 'database-dropdown-hide'}`}>
                            { (<h4 className="info-h3">regression</h4>) : (<h4 className="info-h4-selected" >regression</h4>)}
                            {(<h4 className="info-h3" >classification</h4>) : (<h4 className="info-h4-selected" >classification</h4>)}
                            {(<h4 className="info-h3" >clustering</h4>) : (<h4 className="info-h4-selected" >clustering</h4>)}
                            {(<h4 className="info-h3" >association rule learning</h4>) : (<h4 className="info-h4-selected" >association rule learning</h4>)}
                            {(<h4 className="info-h3" >reinforcement learning</h4>) : (<h4 className="info-h4-selected" >reinforcement learning</h4>)}
                            {(<h4 className="info-h3" >neural networks</h4>) : (<h4 className="info-h4-selected" >deep learning</h4>)}
                            {(<h4 className="info-h3" >natural language processing</h4>) : (<h4 className="info-h4-selected" >natural language processing</h4>)}
                            {(<h4 className="info-h3" >dimensionality reduction</h4>) : (<h4 className="info-h4-selected" >dimensionality reduction</h4>)}
                        </div> */}

                        <div className={`database-dropdown ${currentMenu === 'ml' ? true : 'database-dropdown-hide'}`}>
                        <h4>neural networks</h4>
                        </div>
                    </div>

                    <div><h3 onClick={() => this.handleForm('currentMenu','docs')} >documents</h3></div>

                </div>

                    <p className="p-logout-text" onClick={() => this.props.logoutUser()}>logout</p>
                    
                    {currentView === 'passengersView' ? (
                        <div>
                            <div className="search-bar" ><p className="p-search-line" >add info?</p><p className="p-search-line" onClick={this.refreshPassengers}>refresh</p><input onChange={e => this.handleCancerSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                            <div className="stats-container">
                                {isLoading ? <Loading/> : null}
                                <div className="data-spec"><a style={{marginLeft:'30px',paddingRight:'40px'}}>name</a><a style={{marginLeft:'50px'}}>class</a><a>gender</a><a>siblings_spouses_aboard</a><a>parents_children_aboard</a><a>results</a></div>
                                <span className="data-spec-list">{mappedPassengers}</span>
                            </div>
                        </div>
                    ) : null}

                    {currentView === 'cancerView' ? <CancerDisplay /> : null}

                    {/* {employeeView ? 
                    <div>
                        <div className="search-bar" ><p className="p-search-line"  onClick={this.addEmployeeData}>add info?</p><p className="p-search-line" onClick={this.refreshEmployees}>refresh</p><input onChange={e => this.handleEmployeeSearch(e.target.value)} type="text" placeholder="Search" className="search-input" /></div>
                        <div className={`cancer-stats-input ${employeeDataInput ? false : 'cancer-stats-input-hide'}`}>
                                <div className="input-element"><input placeholder="name" onChange={e => this.handleForm('id',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Age" onChange={e => this.handleForm('clump_thickness',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Start Month" onChange={e => this.handleForm('uniformity_of_cell_size',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Start Year" onChange={e => this.handleForm('uniformity_of_cell_shape',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="End Month" onChange={e => this.handleForm('marginal_adhesion',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Employment Duration" onChange={e => this.handleForm('single_epithelial_cell_size',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Distance" onChange={e => this.handleForm('bare_nuclei',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Pay Rate" onChange={e => this.handleForm('bland_chromatin',e.target.value)}/></div>
                                <div className="input-element"><input placeholder="Attendance" onChange={e => this.handleForm('normal_nuceoli',e.target.value)}/></div>
                                <button>submit</button>
                        </div>
                        <div className="data-spec"><a>Name</a><a>Age</a><a>Start Month</a><a>Start Year</a><a>End Month</a><a>End Year</a><a>Employment Duration</a><a>Distance</a><a>Married</a><a>Pay Rate</a><a>Attendance</a></div>
                        <div className="stats-container">
                            {isLoading ? <Loading/> : null}
                                <span className="data-spec-list">{mappedEmployees}</span>
                        </div>

                    </div> : null} */}

                </section>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {logoutUser})(Info)