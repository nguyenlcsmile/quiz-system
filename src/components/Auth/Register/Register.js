import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ImageLogin from '../../../assets/images/nguyen.jpg';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserAlt, FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { postRegister } from '../../../services/apiServices';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        console.log(isValidEmail);

        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }

        let data = await postRegister(email, username, password);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className='register-container d-flex flex-column'>
            <div className='register-header d-flex'>
                <span>Already have an account ?</span>
                <button className='btn'
                    onClick={() => navigate('/login')}>
                    Sign in
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
                                        Sign up to your account to continue
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
                                                <div className="mb-3 pass-group">
                                                    <label className="form-label d-flex">
                                                        <RiLockPasswordFill className='label-icon' />
                                                        Password
                                                    </label>

                                                    {!showPassword ?
                                                        <span className='eye-icon'
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            <FaRegEyeSlash />
                                                        </span>
                                                        :
                                                        <span className='eye-icon'
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            <FaRegEye />
                                                        </span>
                                                    }

                                                    <input className="form-control form-control-lg"
                                                        type={!showPassword ? "password" : "text"} name="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(event) => setPassword(event.target.value)} />

                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label d-flex">
                                                        <FaUserAlt className='label-icon' />
                                                        Username
                                                    </label>
                                                    <input className="form-control form-control-lg"
                                                        type="text" name="password"
                                                        placeholder="Enter your username"
                                                        value={username}
                                                        onChange={(event) => setUsername(event.target.value)} />
                                                </div>

                                                <div className="text-center mt-2">
                                                    <span className="btn btn-lg btn-primary"
                                                        onClick={() => handleRegister()}>
                                                        Sign up
                                                    </span>
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

export default Register;