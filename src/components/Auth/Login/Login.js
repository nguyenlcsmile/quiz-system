import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ImageLogin from '../../../assets/images/nguyen.jpg';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert('me')
    }

    return (
        <>
            <main className="d-flex w-100 h-100 login-container">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1>Welcome back, Mr.Smile Quiz System</h1>
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img src={ImageLogin} alt="Charles Hall" className="img-fluid rounded-circle" width="120" height="120" />
                                            </div>
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input className="form-control form-control-lg"
                                                        type="email" name="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(event) => setEmail(event.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input className="form-control form-control-lg"
                                                        type="password" name="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(event) => setPassword(event.target.value)} />
                                                    <small>
                                                        <a href="/">Forgot password?</a>
                                                    </small>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <NavLink to="/" className="btn btn-lg btn-primary"
                                                        onClick={() => handleLogin()}>
                                                        Sign in
                                                    </NavLink>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;