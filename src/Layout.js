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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManagerQuiz from "./components/Admin/Content/Manager/Quizs/ManagerQuiz";

const NotFound = () => {
    return (
        <div className="container alert alert-danger mt-5 fs-1">
            404. Not found of current data with URL
        </div>
    )
}
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                    <Route path="contact" element={<User />} />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={<Admin />} >
                    {/* <Route index element={<Admin />} /> */}
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='manager-users' element={<ManagerUser />} />
                    <Route path='manager-quizs' element={<ManagerQuiz />} />
                    <Route path='manager-questions' element={<ManagerUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </>
    )
}

export default Layout;