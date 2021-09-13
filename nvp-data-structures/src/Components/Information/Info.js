import React, { Component } from 'react'
// import axios from 'axios';
import axios from 'axios'
import './Info.css'
import data from './data'
import InfoItem from './InfoItem'
import BookData from './BookData'
import CancerStat from './CancerStat'
import AddCancerStat from './AddCancerStat'

class Info extends Component {
    constructor(props){
        super();

        this.state = {
            dataItems:[],
            dataItems1:[],
            cancerStats:[],
            dataView:false,
            data1View:false,
            data2View:false,
            cancerDataInput:false
        }
        this.dataSelected = this.dataSelected.bind(this)
        this.data1Selected = this.data1Selected.bind(this)
        this.data2Selected = this.data2Selected.bind(this)
        this.resetView = this.resetView.bind(this)
        this.addCancerData = this.addCancerData.bind(this)
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

        this.setState({dataItems:data})
    }

    // -- database salection -- //
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

    addCancerData(params) {
        this.setState({
            cancerDataInput:!this.state.cancerDataInput
        })
    }

    resetView() {
        this.setState({
            dataView:false,
            data1View:false,
            data2View:false
        })
    }

    // build switch statement to replace redundant code lines
    // changeView(params) {
    //     this.resetView()
    //     switch (params) {
    //         case 'data':
    //             this.setState({data1View:!this.state.data1View})
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // -------------------------------------------- //

    render(){
        
        const { dataItems,dataItems1,dataView,data1View,data2View,cancerDataInput,cancerStats } = this.state

        const mappedData = dataItems1.map(element => {
            return <InfoItem key={element.index} ids={element.ids} results={element.results}/>
        })

        const mappedBookData = dataItems.map(element => {
            return <BookData key={element.id} author={element.author} />
        })

        const mappedCancerStats = cancerStats.map(element => {
            return <CancerStat key={element.index} eclass={element.class} id={element.id} />
        })
        
        return(
            <div className="info-container">
                <section className="left-column">
                    <h3 className="info-h4">Database</h3>
                    {!data1View ? (<h4 className="info-h3" onClick={this.data1Selected}>info 1</h4>) : (<h4 className="info-h4-selected" onClick={this.data1Selected}>info 1</h4>)}

                    {!dataView ? (<h4 className="info-h3" onClick={this.dataSelected}>info 2</h4>) : (<h4 className="info-h4-selected" onClick={this.dataSelected}>info 2</h4>)}

                    {!data2View ? (<h4 className="info-h3" onClick={this.data2Selected}>info 3</h4>) : (<h4 className="info-h4-selected" onClick={this.data2Selected}>info 3</h4>)}
                </section>
                <section className="right-column">
                    <p className="p-logout-text" onClick={this.props.logout}>logout</p>
                    {data2View ? (
                        <div>
                            <p className="p-add-stat-text" onClick={this.addCancerData}>add info?</p>
                            {cancerDataInput ?(<div className="cancer-stats-input">
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                                <div className="input-element"><input placeholder="text"/><p className="p-text-generic">text</p></div>
                            </div>)
                            : 
                            (<div></div>)}
                            <div className="info-list"><h4>id</h4><h4>results</h4></div>
                            {mappedCancerStats}
                        </div>
                    ) : (<div></div>)}

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