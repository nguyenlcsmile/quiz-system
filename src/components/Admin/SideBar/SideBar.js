import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './SideBar.scss';
import logoReact from '../../../logo.svg';
import { BiAlignMiddle } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowRoundForward } from 'react-icons/io';
import { SideBarItems } from "./SideBarItems";
import { RiDashboardLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';

const SideBar = () => {
    const [showSubmenu, setShowSubmenu] = useState(false);

    return (
        <div className="sidebar-wrapper active ps ps--active-y">
            <div className="sidebar-header">
                <div className="d-flex justify-content-between">
                    <div className="logo">
                        <NavLink to='/admins' className="d-flex">
                            <img src={logoReact} alt="LogoReact" />
                            <span className="logo-title"> Quiz System</span>
                        </NavLink>
                    </div>
                    <div className="toggle">
                        <NavLink to='/admins' className="sidebar-hide">
                            <BiAlignMiddle />
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="sidebar-menu">
                <ul className="menu">
                    <li className="sidebar-title">Menu</li>
                    {SideBarItems.map((item, index) => {
                        return (
                            <li className="sidebar-item active" key={index} onClick={() => { item.status && setShowSubmenu(!showSubmenu) }}>
                                <div className="sidebar-link bd-highlight">
                                    {item.icon}
                                    <div className="flex-grow-1 bd-highlight">
                                        <span>{item.title}</span>
                                    </div>

                                    <div className="" style={{ fontSize: "1.2rem", display: item.arrow }}>
                                        {showSubmenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </div>
                                </div>
                                {item.status &&
                                    <ul className="submenu" style={{ display: showSubmenu ? '' : 'none' }}>
                                        <li className="submenu-item">
                                            <NavLink to='/admins/manager-users'>
                                                <IoIosArrowRoundForward className="submenu-item-icon" />
                                                Users
                                            </NavLink>
                                        </li>
                                        <li className="submenu-item">
                                            <NavLink to='/admins'>
                                                <IoIosArrowRoundForward className="submenu-item-icon" />
                                                Quizs
                                            </NavLink>
                                        </li>
                                        <li className="submenu-item">
                                            <NavLink to='/admins'>
                                                <IoIosArrowRoundForward className="submenu-item-icon" />
                                                Questions
                                            </NavLink>
                                        </li>
                                    </ul>
                                }
                            </li>
                        )
                    })}

                    {/* <li className="sidebar-item" onClick={() => setShowSubmenu(!showSubmenu)}>
                        <div className="sidebar-link bd-highlight">
                            <MdManageAccounts className="icon-sidebar" />
                            <div className="flex-grow-1 bd-highlight">
                                <span>Manager</span>
                            </div>

                            <div className="d-flex" style={{ fontSize: "1.2rem" }}>
                                {showSubmenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </div>

                        <ul className="submenu" style={{ display: showSubmenu ? '' : 'none' }}>
                            <li className="submenu-item">
                                <NavLink to='/admins/manager-users'>
                                    <IoIosArrowRoundForward className="submenu-item-icon" />
                                    Users
                                </NavLink>
                            </li>
                            <li className="submenu-item">
                                <NavLink to='/admins'>
                                    <IoIosArrowRoundForward className="submenu-item-icon" />
                                    Quizs
                                </NavLink>
                            </li>
                            <li className="submenu-item">
                                <NavLink to='/admins'>
                                    <IoIosArrowRoundForward className="submenu-item-icon" />
                                    Questions
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default SideBar;