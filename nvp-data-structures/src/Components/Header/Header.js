import './Header.css'
import image from '../logo.png'

const Header = (props) => {
    return(
        <header className="header">
            <img src={image} className="logo" alt="CD"/>
        </header>
    )
}

export default Header