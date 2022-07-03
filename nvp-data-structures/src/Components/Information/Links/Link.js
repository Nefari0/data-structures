import './Links.css'

const Link = (props) => {

    const {link_id,link_name,url,description} = props

    return(
        <a className='link' href={`${url}`} target="_blank" rel="noopener noreferrer">
            {link_name}
        </a>
    )
}

export default Link