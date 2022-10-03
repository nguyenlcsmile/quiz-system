import React from "react";
import { Outlet } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import './Admin.scss';
import SideBar from "../SideBar/SideBar";

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="sidebar-admin">
                <SideBar />
            </div>
            <div className="admin-main">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;