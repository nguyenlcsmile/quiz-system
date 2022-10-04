import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './SideBar.scss';
import logoReact from '../../../logo.svg';
import { RiDashboardLine } from 'react-icons/ri';
import { MdManageAccounts, MdQuiz } from 'react-icons/md';
import { AiFillFolderOpen } from 'react-icons/ai';

const SideBar = () => {
    return (
        <div className="sidebar-wrapper active ps ps--active-y">
            <div className="sidebar-header">
                <div className="d-flex justify-content-between">
                    <div className="logo">
                        <NavLink to='/admins/dashboard' className="d-flex">
                            <img src={logoReact} alt="LogoReact" />
                            <span className="logo-title"> Quiz System</span>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="sidebar-menu">
                <ul className="menu">
                    <li className="sidebar-title"></li>
                    <NavLink to='/admins/dashboard'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <RiDashboardLine className="icon-sidebar" />
                                <span>Trang chủ</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manager-users'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <MdManageAccounts className="icon-sidebar" />
                                <span>Quản lý người dùng</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manager-quizs'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <AiFillFolderOpen className="icon-sidebar" />
                                <span>Quản lý bài thi</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manager-questions'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <MdQuiz className="icon-sidebar" />
                                <span>Quản lý câu hỏi</span>
                            </div>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;