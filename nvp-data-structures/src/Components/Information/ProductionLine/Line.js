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
            [prop]: parseInt(event.target.value),
        }));
    };

    return(
        <form style={{maxWidth:'400px'}} >
            {error != null ?
            <div style={{position:'absolute',backgroundColor:'grey',height:'80px'}} onClick={() => setError(null)}>
                {error}
            </div> : null}
            <strong>Time</strong><strong style={{marginLeft:'60px'}} >{time}</strong>

            <input placeholder="speed in FPS" type="number" onChange={(e) => input('speedInFPM',e)} />

            <input placeholder="Length in Inches" onChange={(e) => input('profileLength',e)} />

            <input placeholder="Rows" onChange={(e) => input('rows',e)} />

            <input placeholder="Columns" onChange={(e) => input('columns',e)} />

            <input placeholder="Pieces per extruder" onChange={(e) => input('extrudes',e)} />

            <button className="btn" style={{bottom:'5px',left:'60%'}} onClick={() => execute()} >
                <strong>Run</strong>
            </button>

            <button className="btn" style={{bottom:'5px',left:'20%'}} onClick={() => props.selectView('currentView','')} >
                <strong>exit</strong>
            </button>
        </form>
    )
}

export default Line