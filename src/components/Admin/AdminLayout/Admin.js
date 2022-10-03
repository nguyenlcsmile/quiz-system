import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import 'boxicons/css/boxicons.min.css';
import './Admin.scss';

const Admin = () => {
    return (
        <div className="admin-container" style={{
            padding: '50px 0px 0px 370px'
        }}>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default Admin;