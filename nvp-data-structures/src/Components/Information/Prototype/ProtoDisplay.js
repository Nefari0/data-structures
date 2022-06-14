import './ProtoDisplay.css'
import Table from "../../Table/Table"

const ProtoDislplay = (props) => {

    const table_name = 'titanic_data'
    const endpoint = 'api/passengers/all'

    return(
        <div className='proto-container' >
            <Table endpoint={endpoint} table_name={table_name} />
        </div>
    )
}

export default ProtoDislplay