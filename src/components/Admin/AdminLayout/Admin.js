import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import './Admin.scss';
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header"

const Admin = () => {
    const [showSideBarAdmin, setShowSideBarAdmin] = useState(false);

    return (
        <div className="admin-container">
            <div className="sidebar-admin" style={{ display: showSideBarAdmin ? 'none' : 'flex' }}>
                <SideBar />
            </div>
            <div className="admin-main">
                <div className="admin-header">
                    <Header
                        showSideBarAdmin={showSideBarAdmin}
                        setShowSideBarAdmin={setShowSideBarAdmin}
                    />
                </div>
                <div className="admin-content">

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin;