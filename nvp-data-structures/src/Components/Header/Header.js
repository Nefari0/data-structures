import './Header.css'
import image from '../logo.png'

const Header = (props) => {
    return(
        <div className="header">
            <img src={image} className="logo" alt="CD"/>
        </div>
    )
}

export default Header