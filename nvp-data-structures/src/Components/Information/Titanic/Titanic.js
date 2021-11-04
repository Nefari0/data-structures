import Reac, { Component } from 'react'
import Passenger from '../Passenger'
import axios from 'axios';
// import './Titanic.css'

class Titanic extends Component {
    constructor(){
        super();

        this.state = {
            passengers:[]
        }
    }

    componentDidMount(){
        axios.get('api/passengers/all').then(res => {
            this.setState({passengers:res.data})
        })
    }

    render(){

        const { passengers } = this.state

        const mappedPassengers = passengers.map(element => {
            return <Passenger data={element} key={element.index} age={element.age} name={element.name} pclass={element.pclass} sex={element.sex} siblings_spouses_aboard={element.siblings_spouses_aboard} parents_children_aboard={element.parents_children_aboard} survived={element.survived} />
        })

        return(
            <div>
                {/* <div className="data-spec"><a>id</a><a>clump Thickness</a><a>unif. cell size</a><a>unif. cell shape</a><a>marg. adhesion</a><a>single epi. cell size</a><a>bare nuclei</a><a>bland chrom.</a><a>norm. nuceoli</a><a>mitoses</a><a>results</a></div> */}
                {/* <div className="data-spec-list">{mappedPassengers}</div>  */}
            </div>
        )
    }
}

export default Titanic