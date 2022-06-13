import './Documents.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OneDoc = (props) => {

    const { body,title,memo_id,category } = props
    var [ state,setState ] = useState({
        body:body,
        title:title,
        memo_id:memo_id,
        category:category
    })

    const input = (prop,event) => {
        event.persist();
        setState((state) => ({
            ...state,
            [prop]: event.target.value,
        }));
    };

    const handleDB = (state) => {
        props.DB(state)
    }

    return(
    <form className="admin-memo-body" style={{opacity:'.8'}} >
        <header className='data-spec' >
            <strong onClick={() => props.selectMemo('null')}>close</strong>
            {!props.memo_id ? null :<strong onClick={() => props.deleteDoc(state)}>delete</strong>}
            <strong onClick={() => handleDB(state)} >{props.isLoading ? 'saving...' : 'save'}</strong>
        </header>
        <textarea value={state.title} onChange={(e) => input('title',e)} ></textarea>
        <textarea value={state.body} onChange={(e) => input('body',e)} rows="10"  > </textarea>
        <textarea value={state.category} onChange={(e) => input('category',e)} ></textarea>
    </form>)
}

export default OneDoc