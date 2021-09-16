import './Info.css'

const Employee = (props) => {

    const { id,index,name,age,start_month,start_year,end_month,end_year,employment_duration,distance,married,pay,attendance } = props

    let data_num = id % 2 === 0

    return(
        <div className={`scrollitems ${data_num ? true : 'scrollitems-dark'}`}>
        {/* {data_num === true ? (<a>true</a>) : (<a>false  </a>)} */}
        <a >{name}</a>
        <a>{age}</a>
        <a>{start_month}</a>
        <a>{start_year}</a>
        <a>{end_month}</a>
        <a>{end_year}</a>
        <a>{employment_duration}</a>
        <a>{distance}</a>
        <a>{married}</a>
        <a>{pay}</a>
        <a>{attendance}</a>
    </div>
    )
}

export default Employee