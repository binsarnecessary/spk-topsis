import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand navbar-light navbar-bg"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="navbar-collapse collapse container">
          <ul className="navbar-nav navbar-align">
            <Link className="text-decoration-none" to="/">
              <h3>Metode SPK</h3>
            </Link>
            <Link className="text-decoration-none" to="/">
              <h6>Home</h6>
            </Link>
            <Link className="text-decoration-none" to="/kuesioner-spk">
              <h6>Tentukan Metode Passion</h6>
            </Link>
            <Link className="text-decoration-none" to="/profil-pakar">
              <h6>Profil Pakar</h6>
            </Link>
          </ul>

          <ul className="navbar-nav navbar-align">
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ marginRight: "60px" }}
            >
              <h6>Login Admin</h6>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
