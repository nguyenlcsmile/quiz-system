import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import User from './components/User/User';
import Admin from './components/Admin/AdminLayout/Admin';
import ManagerUser from './components/Admin/Content/Manager/Users/ManagerUser';
import Dashboard from './components/Admin/Content/Dashboard/Dashboard';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import App from './App';
import './App.scss';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                    <Route path="contact" element={<User />} />
                </Route>

                <Route path="/admins" element={<Admin />} >
                    {/* <Route index element={<Admin />} /> */}
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='manager-users' element={<ManagerUser />} />
                    <Route path='manager-quizs' element={<ManagerUser />} />
                    <Route path='manager-questions' element={<ManagerUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}

export default Layout;