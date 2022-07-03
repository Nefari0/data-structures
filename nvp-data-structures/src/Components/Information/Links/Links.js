import './Links.css'
import '../Home/Home.css'
import '../../Table/Table.css'
import Link from './Link'
import LinkForm from './LinkForm'
import { useEffect,useState } from 'react'
import axios from 'axios'

const Links = (props) => {    

    const [links,setLinks] = useState([])
    const [create,setCreate] = useState(false)

    useEffect(() => {getLinks()},[])

    const getLinks = () => {
        axios.get('/api/links/get').then(res => {
            setLinks(res.data)
        })
    }
    const mappedLinks = links.map(el => {
        return(<Link key={el.link_id} url={el.url} link_name={el.link_name} />)
    })

    return(<div className='links'>

        <section className="search-bar" >


            {/* <a onClick={() => grabDocs(true)}>reload all</a> */}

            {/* <input value={search} placeholder="Search" onChange={(e) => searchForCat(e.target.value)} /> */}

            {/* <a onClick={() => searchForCat('')} >clear search?</a> */}
            <a onClick={() => setCreate(!create)} >new!</a>

            <a onClick={() => props.selectView('currentView','home')}>close doc</a>

        </section>
        <span></span>
        <section className='home-container'>
            {create ? <LinkForm setCreate={setCreate} /> : null}
            {mappedLinks}
        </section>

    </div>)
}
export default Links