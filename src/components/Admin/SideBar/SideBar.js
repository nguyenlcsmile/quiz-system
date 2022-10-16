import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './SideBar.scss';
import logoReact from '../../../logo.svg';
import { RiDashboardLine } from 'react-icons/ri';
import { MdManageAccounts, MdQuiz } from 'react-icons/md';
import { AiFillFolderOpen } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { GiArchiveRegister } from 'react-icons/gi';
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
    const navigate = useNavigate();

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
                    <li className="sidebar-title">Menu</li>
                    <NavLink to='/admins/dashboard'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <RiDashboardLine className="icon-sidebar" />
                                <span>Dashboard</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manage-users'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <MdManageAccounts className="icon-sidebar" />
                                <span>
                                    Manager Users
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manage-quizzes'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <AiFillFolderOpen className="icon-sidebar" />
                                <span>
                                    Manager Quizzes
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/admins/manage-questions'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <MdQuiz className="icon-sidebar" />
                                <span>
                                    Manager Questions
                                </span>
                            </div>
                        </li>
                    </NavLink>

                    <li className="sidebar-title">Auth</li>
                    <NavLink to='/login'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <FiLogIn className="icon-sidebar" />
                                <span>
                                    Đăng nhập
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/register'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <GiArchiveRegister className="icon-sidebar" />
                                <span>Đăng ký</span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li className="sidebar-item">
                            <div className="sidebar-link">
                                <FiLogOut className="icon-sidebar" />
                                <span>Đăng xuất</span>
                            </div>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;