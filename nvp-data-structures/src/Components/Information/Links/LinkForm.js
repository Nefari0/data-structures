import { useState } from "react"
import axios from "axios"

const LinkForm = (props) => {

    const {link_name,url,link_id,description,setCreate} = props

    const [state,setState] = useState({
        link_name:link_name,
        link_id:link_id,
        description:description,
        url:url
    })

    const handleInput = (prop,event) => {
        setState((state) => ({
            ...state,
            [prop]:event.target.value
        }))
    }

    const sendInfo = () => {
        const { link_id,link_name,description,url } = state
        axios.post('/api/links/new',{link_id,link_name,description,url})
    }

    return(
        <form className='form'>
            <input placeholder='url' value={description} onChange={(e) => handleInput('url',e)} />
            <input placeholder='link name' onChange={(e) => handleInput('link_name',e)} />
            <input placeholder='description' onChange={(e) => handleInput('description',e)} />
            <button onClick={() => sendInfo()} >Send</button>
            <button onClick={() => setCreate(false)} >Cancel</button>
        </form>
    )
}

export default LinkForm