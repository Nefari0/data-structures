import Reac, { Component } from 'react'
import Passenger from './Passenger'
import axios from 'axios';

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

        const mappedPassengers = passengers.map(element => {
            return <Passenger />
        })

        return(
            <div>

            </div>
        )
    }
}