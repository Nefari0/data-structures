import Loading from "../../Loading/Loading"
import { useState,useEffect } from "react"
import axios from "axios"
import Passenger from "./Passenger"


const TitanicDisplay = (props) => {

    const [state,setState] = useState({})

    const returnZeros = () => { // sets / resets form values
        setState({
            age:0,
            survived:0,
            fare:0,
            sex:0,
            siblings_spouses_aboard:0,
            parents_children_aboard:0,
            pclass:0,
            index:0
        })
    }

    const [titanicPassengers, setTitanicPassengers] = useState([])
    const [passengerSearch,setPassengerSearch] = useState('')
    const [formOpen,setFormOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        grabStats()
        returnZeros()
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
        await axios.get('api/passengers/all').then(res => {
            setTitanicPassengers(res.data)
        })
        await setIsLoading(false)
    }

    const addToCancerPending = async () => {
        await setIsLoading(true)
        await axios.post('/api/pessenger/add',state)
        await grabStats()
        await returnZeros()
        await setIsLoading(false)
    }

    const filterPassenger = titanicPassengers.filter(element => element.name.toString().includes(passengerSearch))
    const mappedPassengers = filterPassenger.map(element => {            
        return <Passenger key={element.index} index={element.index} pclass={element.pclass} siblings_spouses_aboard={element.siblings_spouses_aboard} parents_children_aboard={element.parents_children_aboard} age={element.age} survived={element.survived} sex={element.sex} fare={element.fare} name={element.name} />
    })

    return(
        <div className="display-matrix">
            <section className="search-bar" >
                <a onClick={() => setFormOpen(!formOpen)}>add info?</a>
                <a onClick={() => grabStats()}>refresh</a>
                <input onChange={e => setPassengerSearch(e.target.value)} type="text" placeholder="Search" className="search-input" />
                <p className="p-search-line" onClick={() => props.handleForm('currentView','')}>close</p>
            </section>
            <form className={`${formOpen ? false : 'hide'}`}>
                <input placeholder="name" onChange={e => handleInputChange('name',e)}/>
                <input placeholder="class" onChange={e => handleInputChange('class',e)}/>
                <input placeholder="gender" onChange={e => handleInputChange('gender',e)}/>
                <input placeholder="age" onChange={e => handleInputChange('age',e)}/>
                <input placeholder="siblings / spouses on board" onChange={e => handleInputChange('siblings_spouses_aboard',e)}/>
                <input placeholder="parents / children on board" onChange={e => handleInputChange('parents_children_aboard',e)}/>
                <input placeholder="result" onChange={e => handleInputChange('results',e)}/>
                <button onClick={() => addToCancerPending()}>submit</button>
            </form>
            <section className="stats-container">
                {isLoading ? <Loading/> : null}
                <header className="data-spec"><strong style={{marginLeft:'30px',paddingRight:'40px'}}>name</strong><strong style={{marginLeft:'50px'}}>class</strong><strong>gender</strong><strong>siblings_spouses_aboard</strong><strong>parents_children_aboard</strong><strong>Fare</strong><strong>results</strong></header>

                <div className="data-spec-list">{mappedPassengers}</div>
            </section>
        </div>
    )
}

export default TitanicDisplay