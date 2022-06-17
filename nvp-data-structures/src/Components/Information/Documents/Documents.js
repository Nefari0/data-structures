import OneDoc from "./OneDoc"
import '../../Table/Table.css'
import Loading from "../../Loading/Loading"
import { useState,useEffect } from "react"
import axios from "axios"

const Documents = (props) => {

    const [docs,setDocs] = useState([]) // -- All docs in DB
    const [isLoading,setIsLoading] = useState(false)
    const [create,setCreate] = useState(false) // -- Create new document
    const [selected,setSelected] = useState(null) // -- For displaying currently selected document
    const currentDoc = localStorage['currentDoc'] // -- For auto loading currently selected document
    const currentCategory = localStorage['currentCategory']
    const [search,setSearch] = useState('')
    const width = '50%'

    useEffect(() => {
        grabDocs()
        if(localStorage['currentDoc'] === undefined){
            localStorage.setItem('currentDoc','null')
        }
        selectMemo(currentDoc)

        if(localStorage['currentCategory'] === undefined){
            localStorage.setItem('currentCategory','')
        }
        setSearch(currentCategory)

    },[])

    // -- Search docs by category -- //
    const searchForCat = (val) => {
        var alpha = val.toLowerCase()
        setSearch(alpha)
        props.theWindow('currentCategory',alpha)
    }

// ------------ DB managment ------------------ //
    // -- Create new document -- //
    const newDoc = (state) => {
        setIsLoading(true)
        axios.post('/api/memos/new',state).then(res => {
            selectMemo(res.data.memo_id)
            setCreate(false)
            setIsLoading(false)
            grabDocs()
        })
    }
    // -- Update document -- //
    const sendUpdate = (state) => {
        setIsLoading(true)
        axios.put('/api/memos/update', state).then(() => setIsLoading(false))
    }
    // -- Get all docs - Reset current doc if param === true -- //
    const grabDocs = async (clearCurrent) => {
        if(clearCurrent){
            selectMemo('null')
            setCreate(false)
        }
        await setIsLoading(true)
        await axios.get('/api/memos/get').then(res => {
            setDocs(res.data)
            setIsLoading(false)
        }).catch(err => console.log('error',err))
    }
    // -- Delete document -- //
    const deleteDoc = (state) => {
        setIsLoading(true)
        axios.delete(`/api/memos/delete/${state.memo_id}`).then(() => {
            grabDocs(true)
            setIsLoading(false)
        })
    }
// --------------------------------------------------- //

    // -- Select doc to open -- //
    const selectMemo = (id) => {
        localStorage.setItem('currentDoc',id)
        setSelected(id)
    }

    // -- Find & Display Currently Selected Doc -- //
    const currentItem = docs.filter(docEl => docEl.memo_id === parseInt(selected)) 
    const mappedItem = currentItem.map(el => {
        return <OneDoc key={el.memo_id} body={el.body} memo_id={el.memo_id} title={el.title} category={el.category} grabDocs={grabDocs} DB={sendUpdate} isLoading={isLoading} deleteDoc={deleteDoc} />
    })

    // -- Search for doc by category (default value is empty string) -- //
    const searchedDocs = docs.filter(el => { return el.category.toLowerCase().includes(search) })
    // -- Displays all docs in search list -- //
    const mappedDocList = searchedDocs.map(el => {
        return (
        <tr key={el.memo_id} memo_id={el.memo_id} category={el.category} onClick={() => selectMemo(el.memo_id)} style={{padding:'',width:'100%',backgroundColor:''}} >
            <td style={{width:width}} >{el.title}</td>
            <td style={{width:width}} >{el.category}</td>
        </tr>)
    })

    return(
        <div className="display-matrix">
            {isLoading ? <Loading/> : null}
            <section className="search-bar" >


                <a onClick={() => grabDocs(true)}>reload all</a>

                <input value={search} placeholder="Search" onChange={(e) => searchForCat(e.target.value)} />

                <a onClick={() => searchForCat('')} >clear search?</a>

                <a onClick={() => props.handleForm('currentView','')}>close doc</a>

            </section>
    
            <section>
                
                {!create ? (selected === 'null' ? 
                <table>
                    <thead>
                        <tr>
                            <th style={{width:width,backgroundColor:''}} >Title</th>
                            <th style={{width:width,backgroundColor:''}} >category</th>
                            <th style={{width:'30px',backgroundColor:''}} onClick={() => setCreate(true)} ><i>new?</i></th>
                        </tr>
                    </thead>
                <tbody>{mappedDocList}</tbody>
                </table>
                
                 : mappedItem) : <OneDoc body={'text'} memo_id={null} title={'title'} category={'category'} selectMemo={selectMemo} DB={newDoc} grabDocs={grabDocs} isLoading={isLoading} />}

            </section>
        </div>
    )
}

export default Documents