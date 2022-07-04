import axios from "axios"
import { useState,useEffect } from "react"
import cryptKeys from "../../../cryptKeys"
import OneDoc from "../Documents/OneDoc"
import Loading from "../../Loading/Loading"

const SpecDocs = (props) => {

    const [ docs,setDocs ] = useState([])
    const [ isLoading,setIsLoading ] = useState(false)

    useEffect(() => {
        get()
    },[])

    const get = async () => {
        await axios.get('/api/memos/spec/get').then(res => {
            setDocs(res.data)
        })
    }

    const sendUpdate = async (state) => {
        setIsLoading(true)
        const { memo_id,category,title,num_mark } = state
        var encryption = await cryptKeys.encrypt(state.body)
        const body = encryption
        console.log(typeof(body))
        await axios.put('/api/memos/spec/put', {body,memo_id,category,title,num_mark}).then(() => setIsLoading(false))
        return
    }

    const deleteDoc = () => { // -- This just closes the document -- //
        return(props.selectView('currentView','home'))
    }

    const mappedInfo = docs.map(el => {

        return(
            <OneDoc key={el.memo_id} body={cryptKeys.decrypt(el.body)} memo_id={el.memo_id} title={el.title} category={el.category} isLoading={isLoading} grabDocs={deleteDoc} DB={sendUpdate} selectMemo={deleteDoc} />
        )
    })

    return(
        <div>
            {isLoading ? <Loading /> : mappedInfo}
        </div>
    )
}

export default SpecDocs