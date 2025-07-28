import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiSolidContact } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { BsMicrosoftTeams } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <MdDashboard className="icon" /> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/clientRequests"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <MdRequestQuote className="icon" />
            Client Requests
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/clientAnnoucements"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <HiSpeakerphone className="icon" />
            Client Annoucements
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/packages"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <AiFillDollarCircle className="icon" />
            Packages
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/contactUs"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <BiSolidContact className="icon" />
            Contact Us
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/ourClients"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <IoMdContacts className="icon" />
            Our Clients
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/actionTeam"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <BsMicrosoftTeams className="icon" />
            Action Team
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/admins"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <RiAdminFill className="icon" />
            Admins
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/dashboard/payments"
            className={({ isActive }) => (isActive ? "sactive-link" : "")}
          >
            <MdPayment className="icon" />
            Payments
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
