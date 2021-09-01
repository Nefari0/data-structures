import './Header.css'

const Header = (props) => {
    return(
        <div className="header">
            {/* <h3>header</h3> */}
            <img src="https://firebasestorage.googleapis.com/v0/b/depot-7bb3e.appspot.com/o/logo.jpeg?alt=media&token=9d6b52c0-738e-4c1f-bf26-8323cacac73d" className="logo" alt="NVP"/>
        </div>
    )
}

export default Header