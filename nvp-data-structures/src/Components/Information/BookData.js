import react from 'react'
import './Info.css'

const BookData = (props) => {

    const {author} = props

    return(
        <div>
            <p className="p-text">{author}</p>
        </div>
    )
}

export default BookData