import { useState } from "react";
import './Line.css'

const Line = (props) => {

    const [ state,setState ] = useState({
        speedInFPM:0, // in feet per min
        profileLength:0, // in inches
        rows:0,
        columns:0,
        extrudes:0 // extrudes one or two ?
    })
    const [time,setTime] = useState(0)
    const [ error,setError ] = useState(null)
    
    const execute = () => {
        const { speedInFPM,profileLength,rows,columns,extrudes } = state

        var totalLength = (rows * columns) * (profileLength / 12) 
        var totalMins = ( totalLength / speedInFPM ) / extrudes // -- Total length of all pieces in feet

        if(extrudes === 1 || extrudes === 2) {
            setTime(getTime(totalMins)) // Total time per order
        } else {setError('How many profiles is extruder running?')}

        setState((state) => ({...state,extrudes:0}))
    }

    const getTime = (mins) => {
        const hours = mins / 60
        var remainingMins = (mins % 60)
        var returnTime = Math.floor(hours) + ':' + (remainingMins < 10 ? '0' + Math.floor(remainingMins) : Math.floor(remainingMins))
        return returnTime
      }

    const input = (prop,event) => {
        event.persist();
        setState((state) => ({
            ...state,
            [prop]: parseFloat(event.target.value),
        }));
    };

    return(
        <form className="line-form">
            {error != null ?
            <div style={{position:'absolute',backgroundColor:'grey',height:'80px'}} onClick={() => setError(null)}>
                {error}
            </div> : null}
            <strong>Time</strong><strong style={{marginLeft:'60px'}} >{time}</strong>

            <input placeholder="speed in FPM" onChange={(e) => input('speedInFPM',e)} />

            <input placeholder="Length in Inches" type="numer" onChange={(e) => input('profileLength',e)} />

            <input placeholder="Rows" type="number" onChange={(e) => input('rows',e)} />

            <input placeholder="Columns" type="number" onChange={(e) => input('columns',e)} />

            <input placeholder="Pieces per extruder" type="number" onChange={(e) => input('extrudes',e)} />

            <button className="btn line-btn" style={{top:'108px'}} onClick={() => execute()} >
                <strong>Run</strong>
            </button>

            <button className="btn line-btn" onClick={() => props.selectView('currentView','home')} >
                <strong>exit</strong>
            </button>
        </form>
    )
}

export default Line