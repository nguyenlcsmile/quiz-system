import './Header.scss';
import { BiAlignMiddle } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const { showSideBarAdmin, setShowSideBarAdmin } = props;

    return (
        <>
            <nav className="navbar navbar-expand navbar-light">
                <a className="sidebar-toggle js-sidebar-toggle"
                    onClick={() => setShowSideBarAdmin(!showSideBarAdmin)}>
                    <BiAlignMiddle className="hamburger align-self-center" />
                </a>
                <div className='navbar-collapse'>

                </div>
            </nav >
        </>
    )
}

export default Header;