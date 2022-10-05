import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ImageLogin from '../../../assets/images/nguyen.jpg';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { postLogin } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import { ImSpinner10 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../../redux/action/userAction';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleLogin = async () => {
        // validate
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        setIsLoading(true);

        let data = await postLogin(email, password);

        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    return (
        <div className='login-container d-flex flex-column'>
            <div className='login-header d-flex'>
                <span>Don't have an account yet ?</span>
                <button className='btn'
                    onClick={() => navigate('/register')}>
                    Sign up
                </button>
            </div>
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row">
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
                                                    <label className="form-label d-flex">
                                                        <MdEmail className='label-icon' />
                                                        Email
                                                    </label>
                                                    <input className="form-control form-control-lg"
                                                        type="email" name="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(event) => setEmail(event.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label d-flex">
                                                        <RiLockPasswordFill className='label-icon' />
                                                        Password
                                                    </label>
                                                    <input className="form-control form-control-lg"
                                                        type="password" name="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(event) => setPassword(event.target.value)} />
                                                    <small className='forgot-password'>
                                                        <a href="/">Forgot password?</a>
                                                    </small>
                                                </div>
                                                <div className="text-center mt-2">
                                                    <button className="btn btn-lg btn-primary"
                                                        onClick={() => handleLogin()}
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading === true && <ImSpinner10 className="loader-icon" />}
                                                        Sign in
                                                    </button>
                                                </div>
                                                <div className='back-home text-center'>
                                                    <span onClick={() => { navigate('/') }}>
                                                        &#60; 	&#60; Go to Home Page
                                                    </span>
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
        </div>
    )
}

export default Login;