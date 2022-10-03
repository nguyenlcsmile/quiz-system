import React, { useState } from "react";
import './Header.css';
import videoHomePage from '../../assets/videos/videoHomePage.mp4';

const Header = () => {
    const [showHide, setShowHide] = useState(false);
    return (
        <div className="hearder-container">
            <div className="video-page">
                <video autoPlay muted loop>
                    <source src={videoHomePage} type="video/mp4" />
                </video>
            </div>

            <section className="navbar-bg">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            Quiz System
                        </a>
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
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Admin</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
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