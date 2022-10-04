import React from "react";
import { Outlet } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import './Admin.scss';
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header"

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="sidebar-admin">
                <SideBar />
            </div>
            <div className="admin-main">
                <div className="admin-header">
                    <Header />
                </div>
                <div className="admin-content">

                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;