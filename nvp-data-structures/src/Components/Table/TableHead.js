import { useState } from "react"
const TableHead = (props) => {

    const { column_name } = props
    const [selected,setSelected] = useState(false)

    return(
        // -- truncates string if above given length - return results -- //
        <th onClick={() => setSelected(!selected)} >
            {!selected ? (column_name.split('').length > 10 ? `${column_name.substring(0,9) + '...'}` : column_name) : column_name}
        </th> 
    )
}

export default TableHead