import './Table.css'
import { useEffect,useState } from 'react'
import TableHead from './TableHead'
import Row from './Row'
import axios from 'axios'


const Table = (props) => {

    const { table_name,endpoint } = props

    
    const [rows,setRows] = useState([])
    const [tHead,setTHead] = useState([])
    
    useEffect(() => {

        axios.get(endpoint).then(res => {
            setRows(res.data)
        })
        getTableNames()
    },[])

    const getTableNames = async () => {
        axios.post(`/api/column/names`,{table_name}).then(res => {
            setTHead(res.data)
        })
    }
    
    const mappedTbHead = tHead.map((el,index) => {
        return <TableHead key={index} column_name={el.column_name} />
    })
    const mappedTbRows = rows.map((el,index) => {
        return  <Row key={index} info={el} />
    })

    return(
        <table>
            <thead>
                <tr>
                {mappedTbHead}
                </tr>
            </thead>

            <tbody>
                {mappedTbRows}
            </tbody>
        </table>
    )
}

export default Table