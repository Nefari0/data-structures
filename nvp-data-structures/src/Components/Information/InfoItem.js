import './Info.css'

const InfoItem = (props) => {

    const { results, index, ids } = props

    return(
        <div className="info-list">
            {/* <p className="p-text">text</p> */}
            <p className="p-text">{ids}</p>
            <p className="p-text">{results}</p>
        </div>
    )
}

export default InfoItem