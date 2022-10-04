import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import User from './components/User/User';
import Admin from './components/Admin/AdminLayout/Admin';
import ManagerUser from './components/Admin/Content/Manager/ManagerUsers';
import Dashboard from './components/Admin/Content/Dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
