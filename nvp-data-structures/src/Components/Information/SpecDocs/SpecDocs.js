import axios from "axios"
import { useState,useEffect } from "react"
import cryptKeys from "../../../cryptKeys"
import OneDoc from "../Documents/OneDoc"

const SpecDocs = (prop) => {

    const [ docs,setDocs ] = useState([])

    useEffect(() => {
        get()
    },[])

    const get = async () => {
        await axios.get('/api/memos/spec/get').then(res => {
            setDocs(res.data)
        })
    }

    const mappedInfo = docs.map(el => {

        const decryption = cryptKeys.decrypt(el.body)
        return(
            <OneDoc body={el.decryption} memo_id={el.memo_id} title={el.title} category={el.category} />
        )
    })

    return(
        <div>
            {mappedInfo}
        </div>
    )
}

export default SpecDocs