import OneDoc from "./OneDoc"
import Loading from "../../Loading/Loading"
import { useState,useEffect } from "react"
import axios from "axios"

const Documents = (props) => {

    const [state,setState] = useState({})
    const [docs,setDocs] = useState([])
    const [formOpen,setFormOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        grabDocs()
    },[])

    // const handleInputChange = (prop,event) => {
    //     event.persist();
    //     setState((state) => ({
    //         ...state,
    //         [prop]: event.target.value,
    //     }));
    // };

    const grabDocs = async () => {
        await setIsLoading(true)
        await axios.get('/api/memos/get').then(res => {
            setDocs(res.data)
            setIsLoading(false)
        }).catch(err => console.log('error',err))
    }

    const mappedDocs = docs.map(el => {
        return <OneDoc key={el.memo_id} body={el.body} memo_id={el.memo_id} />
    })

    return(
        <div className="display-matrix">
            <section className="search-bar" >
                {/* <a onClick={() => setFormOpen(!formOpen)}>add info?</a> */}
                <a onClick={() => grabDocs()}>refresh</a>
                {/* <input  type="text" placeholder="Search" className="search-input" /> */}
                <a onClick={() => props.handleForm('currentView','')}>close</a>
            </section>

            <section className="stats-container">
                {isLoading ? <Loading/> : mappedDocs}
                {/* {mappedDocs} */}
            </section>
        </div>
    )
}

export default Documents