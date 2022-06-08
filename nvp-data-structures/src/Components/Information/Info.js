import React, { Component } from 'react'
import axios from 'axios'
import './Info.css'
import CancerDisplay from './CancerStats/CancerDisplay'
import Employee from './Employee'
import TitanicDisplay from './Titanic/TitanicDisplay'
import Documents from './Documents/Documents'
import { connect } from 'react-redux'
import { logoutUser, browserLogin } from './../../redux/userReducer'
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom'
import Auth from '../Auth/Auth'


class Info extends Component {
    constructor(props){
        super();

        this.state = {
            dUserNotes:[],
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
    }

    theWindow(prop,val){
        localStorage.setItem(prop,val)
    }

    componentDidMount() {
        const { auth } = this.props.user.user 
        const browser_id = localStorage['browser_id']
        const savedEmail = localStorage['email']
        if(auth != true){this.props.browserLogin(savedEmail,browser_id)}

        const uniqueId = () => {
            const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            return s4() + s4() + '-' + s4();
          };
        if(browser_id === undefined){this.theWindow('browser_id',uniqueId())}
    }

    componentDidUpdate() {
        const { isLoggedIn } = this.props.user
        if(isLoggedIn === false){this.props.history.push('/')}
    }

    handleLogout() {
        const uniqueId = () => {
            const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            return s4() + s4() + '-' + s4();
          };
        this.theWindow('browser_id',uniqueId())
        this.theWindow('email',undefined)
        this.props.logoutUser()
    }

    // ---- State Management ---- //
    handleForm(prop,val) {
        this.setState({
            [prop]:val
        })
    }

    // --- selecting views --- //
    selectView(prop,val) {
        this.handleForm(prop,val)
        this.setState({currentMenu:''})
    }

    // --- selecting menus --- //
    openMenu(prop,val) {
        if(val === this.state[prop]) { // closes menu if already open
            return this.setState({currentMenu:''})
        } else {
            return this.handleForm(prop,val)
        }


    }

    // ---- Employee data functions ---- //
    handleEmployeeSearch = (filter) => {
        this.setState({employeeSearch:filter})
    }
    addEmployeeData() {
        this.setState({employeeDataInput:!this.state.employeeDataInput})
    }
    refreshEmployees = async () => {
        this.resetEmployeeStats().then(
            axios.get('api/employees/all').then(res => {
                this.setState({nvpEmployees:res.data})
            })
        )}
    resetEmployeeStats = async () => {
        this.setState({
            nvpEmployees:[],
            employeeSearch:""
        })
    }
    // ---------------------------------- //

    render(){
        
        const { currentView,employeeDataInput,isLoading,currentMenu,showMachineLearning,data3View: employeeView,cancerSearch,dataItems,dataItems1,dataView,data1View,data2View: cancerView,cancerDataInput,cancerStats,isMobile,evenTable,nvpEmployees,employeeSearch,cols,showPassengers: passengersView,passengers } = this.state
        const filterEmployee = nvpEmployees.filter(element => element.name.toString().includes(employeeSearch))
        const mappedEmployees = filterEmployee.map(element => {
            return <Employee key={element.index} id={element.index} name={element.name} age={element.age} start_month={element.start_month} start_year={element.start_year} end_month={element.end_month} end_year={element.end_year} employment_duration={element.employment_duration} distance={element.distance} married={element.married} pay={element.pay} attendance={element.attendance} />
        })
        
        return(
            <div className="info-container">
                <div className="data-header">
                    <div><h3 className="info-h4" onClick={() => this.openMenu('currentMenu','db')} >Database</h3>
                        <div className={`database-dropdown ${currentMenu === 'db' ? true : 'database-dropdown-hide'}`}>

                            <h4 className={` ${currentView === 'cancerView' ? 'info-h3-selected' : 'info-h3'}`} onClick={() => this.selectView('currentView','cancerView')}>cancer stats</h4>
                            <h4 className={`${currentView === 'passengersView' ? 'info-h3-selected' : 'info-h3' }`} onClick={() => this.selectView('currentView','passengersView')}>passengers</h4>
                            <h4 className={`${currentView === 'employeeView' ? 'infor-h3-selected' : 'infor-h3'}`} onClick={() => this.selectView('currentView','employeeView')}>employees</h4>

                        </div>
                    </div>
                    <div><h3 className="info-h3"  onClick={() => this.openMenu('currentMenu','ml')} >machine learning</h3>
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

                    <div><h3 onClick={() => this.selectView('currentView','docsView')} >documents</h3></div>

                </div>

                    <a style={{marginLeft:'75%'}} onClick={() => this.handleLogout()}>logout</a>

                    {currentView === 'cancerView' ? <CancerDisplay handleForm={this.handleForm} /> : null}

                    {currentView === 'passengersView' ? <TitanicDisplay handleForm={this.handleForm} /> : null}

                    {currentView === 'docsView' ? <Documents handleForm={this.handleForm} theWindow={this.theWindow} /> : null}
                    {/* <TitanicDisplay /> */}

                    {/* MOVING THIS CODE TO EXTERNAL */}
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
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {logoutUser,browserLogin})(Info)