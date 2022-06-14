import './ProtoDisplay.css'
// import Table from "../../Table/Table"
import Line from '../ProductionLine/Line'

const ProtoDislplay = (props) => {

    const table_name = 'titanic_data'
    const endpoint = 'api/passengers/all'

    return(
        <div className='proto-container' >
            <Line selectView={props.selectView} />
            {/* <Table endpoint={endpoint} table_name={table_name} /> */}
        </div>
    )
}

export default ProtoDislplay