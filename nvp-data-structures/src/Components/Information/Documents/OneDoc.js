import './Documents.css'
import { useState } from 'react'

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
    <div className='admin-memo'>
        <table>
            <thead>  
                <tr>
                    <th onClick={() => props.grabDocs(true)}>close</th>

                    {!props.memo_id ? null :<th onClick={() => props.deleteDoc(state)}>delete</th>}

                    <th onClick={() => handleDB(state)} >{props.isLoading ? 'saving...' : 'save'}</th>
                </tr>
            </thead>
        </table>
        
        <section style={{height:'20px'}}>
            <input value={state.title} onChange={(e) => input('title',e)} ></input>
            <input value={state.category} onChange={(e) => input('category',e)} ></input>
        </section>

        <section>
            <textarea value={state.body} onChange={(e) => input('body',e)} rows=""  > </textarea>
        </section>
        
    </div>
    )
}

export default OneDoc