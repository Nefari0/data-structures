
const Row = (props) => {

    const { info } = props

    var mappedInfo = Object.values(info).map((el,index) => {
        var item = JSON.stringify(el).substring(0,10)
        return <td key={index} >{item}</td>
    })

    return(
        <tr>
            {mappedInfo}
        </tr>
    )
}

export default Row