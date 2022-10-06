import React from "react";
import './HomePage.scss';
import videoHomePage from '../../assets/videos/videoHomePage.mp4';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="video-page">
                <video autoPlay muted loop>
                    <source src={videoHomePage} type="video/mp4" />
                </video>
            </div>
            <header>
                <section className="container main-hero-container">
                    {/* <div className="row"> */}
                    <div className="col-12 col-lg-6 header-left-side d-flex
                            justify-content-center flex-column align-items-start">
                        <h1 className="display-2">There's a better way to ask</h1>
                        <p className="main-hero-para">
                            You don't want to make a boring form.
                            And your audience won't answer one.
                            Create a typeform instead—and make everyone happy.
                        </p>
                        {/* <div className="input-group mt-3"> */}
                        {isAuthenticated ?
                            <div className="input-group-text"
                                onClick={() => { navigate('/users') }}>
                                Doing quiz now
                            </div>
                            :
                            <div className="input-group-text"
                                onClick={() => { navigate('/login') }}>
                                Get's started. It's free
                            </div>
                        }

                    </div>
                    {/* </div> */}
                </section>
            </header>
        </div >
    )
}

export default HomePage;