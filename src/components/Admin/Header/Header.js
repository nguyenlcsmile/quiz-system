import './Header.scss';
import { BiAlignMiddle } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-light">
                <a className="sidebar-toggle js-sidebar-toggle">
                    <BiAlignMiddle className="hamburger align-self-center" />
                </a>
                <div className='navbar-collapse'>
                    <Dropdown className='navbar-nav'>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className='fs-3'>
                            Setting
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to='/admins'>Profile</NavLink>
                            <Dropdown.Divider />
                            <NavLink className="dropdown-item" to='/admins'>Log out</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav >
        </>
    )
}

export default Header;