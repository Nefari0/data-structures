import './Documents.css'
import { useState } from 'react'
import axios from 'axios'
// import Notice from './../Notice/Notice'

const OneDoc = (props) => {

    const { body,title,memo_id } = props
    var [ text,setText ] = useState(body)
    var [ sending,setSending ] = useState(false)
    const notDefault = true
    
    // const sendUpdate = () => {
    //     setSending(true)
    //     axios.post('/api/memo/update', {text,memo_id}).then(res => {
    //         setSending(false)
    //     })
    // }

    return(<div className="text-container" >
        <input value={title} style={{width:'95%',marginBottom:'5px'}}></input>
        <textarea name="text" rows="23" cols="50" wrap="soft" placeholder='text' onChange={(e) => setText(e.target.value)} value={text} className="admin-memo-body" > </textarea>
        {/* <button onClick={() => sendUpdate()} >submit</button> */}
        <div className="is-saving" >{sending === true ? <p style={{color:'#fff',fontWeight:'600'}} >sending...</p> : <p style={{color:'#fff',fontWeight:'600'}} >save</p>}</div>
        {/* <div className='notice-placement' ><Notice notDefault={notDefault} item={'saving text'} /></div> */}
    </div>)
}

export default OneDoc