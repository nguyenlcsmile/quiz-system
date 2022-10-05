import React, { useState } from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { postLogout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showHide, setShowHide] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);

        if (res && res.EC === 0) {
            //reset redux data 
            dispatch(doLogout());
            toast.success(res.EM);
        }
    }

    return (
        <div className="hearder-container">
            <section className="navbar-bg">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <NavLink className="navbar-brand" to="/">
                            Quiz System
                        </NavLink>
                        <button className="navbar-toggler"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setShowHide(!showHide)}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${showHide ? "show" : ""}`}>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to='/' className="nav-link" aria-current="page">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/users' className="nav-link">
                                        User
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/admins/dashboard' className="nav-link">
                                        Admin
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/contact' className="nav-link">
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                            {isAuthenticated ?
                                <form className="d-flex">
                                    <div>
                                        <div className="btn btn-style btn-setting"
                                            onClick={() => setShowSetting(!showSetting)}>
                                            <span>Setting{" "}</span>
                                            {showSetting ?
                                                <AiOutlineArrowUp className="arrow-icons" />
                                                :
                                                <AiOutlineArrowDown className="arrow-icons" />
                                            }
                                        </div>

                                        <div className={`dropdown-menu dropdown-menu-end ${showSetting ? 'show' : ''}`}>
                                            <div className="items d-flex">
                                                <FaUserCircle className="icons" />
                                                <span>Profile</span>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <div className="items">
                                                <FiLogOut className="icons" />
                                                <span onClick={() => handleLogout()}>Log out</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                :
                                <form className="d-flex">
                                    <NavLink to='/login'>
                                        <button className="btn btn-style">
                                            Sign in{" "}
                                        </button>
                                    </NavLink>
                                    <NavLink to='/register'>
                                        <button className="btn btn-style btn-style-border">
                                            Sign up{" "}
                                        </button>
                                    </NavLink>

                                </form>
                            }
                        </div>
                    </div>
                </nav>
            </section>
        </div >
    )
}

export default Header;