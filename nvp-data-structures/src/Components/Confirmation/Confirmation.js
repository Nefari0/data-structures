import './Confirmation.css'
// import '../Table/Table.css'

// --- PROPS INFO & USAGE --- //
// message === warning text (ie "are you sure?")
// deleteFunction - function passed from parent which carries out the delete query
// data - should cantain all info required for delete (ie database.table.table_id)
// closeDialog - whatever func from parent closes this dialog box
// closeDialogParam - if closeDialog requires a parameter (ei true / false)



const Confirmation = (props) => {

    const { message,deleteFunction,data,closeDialog,closeDialogParam } = props

    return(
        <div className='confirmation'>
            <header><p>{message}</p></header>

            <section>
                <a onClick={() => deleteFunction(data)} style={{backgroundColor:'red'}} >yes</a>
                <a onClick={() => closeDialog(closeDialogParam)} >no</a>
            </section>
        </div>
    )
}

export default Confirmation