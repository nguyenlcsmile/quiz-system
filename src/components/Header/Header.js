import React, { useState } from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";

const Header = () => {
    const [showHide, setShowHide] = useState(false);
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
                            <form className="d-flex">
                                <button className="btn btn-style" type="submit">
                                    Sign in{" "}
                                </button>
                                <button className="btn btn-style btn-style-border" type="submit">
                                    Sign up{" "}
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    )
}

export default Header;