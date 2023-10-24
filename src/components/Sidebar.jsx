import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">Medic</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Menu</li>

          <li className="sidebar-item">
            <Link href className="sidebar-link" to="/admin-history">
              <Icon.ClockHistory />
              <span className="align-middle">History Pemakaian User</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link href className="sidebar-link" to="/admin-news">
              <Icon.Newspaper />
              <span className="align-middle">Input Berita</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
