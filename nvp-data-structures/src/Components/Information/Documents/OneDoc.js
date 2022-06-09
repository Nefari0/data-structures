import './Documents.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OneDoc = (props) => {

    const { body,title,memo_id } = props
    var [ sending,setSending ] = useState(false)
    var [ state,setState ] = useState({
        body:body,
        title:title,
        memo_id:memo_id
    })

    const input = (prop,event) => {
        event.persist();
        setState((state) => ({
            ...state,
            [prop]: event.target.value,
        }));
    };
    
    const sendUpdate = () => {
        const { body,memo_id,title } = state
        setSending(true)
        axios.post('/api/memo/update', {body,memo_id,title}).then(res => {
            setSending(false)
        })
    }

    return(
    <form className="admin-memo-body">
        <header className='data-spec' >
            <strong onClick={() => props.selectMemo('null')}>close</strong>
            <strong onClick={() => setState('body',props.body)}>reset</strong>
            <strong onClick={() => sendUpdate()} >{sending === true ? 'saving...' : 'save'}</strong>
        </header>
        <textarea value={state.title} onChange={(e) => input('title',e)} ></textarea>
        <textarea value={state.body} onChange={(e) => input('body',e)} rows="10"  > </textarea>
    </form>)
}

export default OneDoc