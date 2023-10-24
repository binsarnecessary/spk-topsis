import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { Button  } from "react-bootstrap";
import Swal from "sweetalert2";

const NavbarAdmin = (props) => {
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      title: "Success!",
      text: "You have successfully Log Out",
      icon: "success",
      confirmButtonText: "OK",
    });
    setIsLogout(true);
  };

  const { handleShowSidebar } = props;

  return (
    <>
      {isLogout && <Navigate to="/login" />}
      <nav
        className="navbar navbar-expand navbar-light navbar-bg"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Icon.List
          onClick={handleShowSidebar}
          style={{ marginLeft: "20px" }}
          size={35}
        />

        <div className="navbar-collapse collapse container">
          <ul className="navbar-nav navbar-align">
            <Link className="text-decoration-none" to="/admin">
              <h3>Metode SPK</h3>
            </Link>
          </ul>
          {role ? (
            <div>
              <ul className="navbar-nav navbar-align">
                <Link className="text-decoration-none">
                  <Button variant="none">{name}</Button>
                </Link>

                <Link className="text-decoration-none">
                  <Button variant="none" onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              </ul>
            </div>
          ) : (
            <>
              <ul className="navbar-nav navbar-align">
                <Link
                  to="/login"
                  className="text-decoration-none"
                  style={{ marginRight: "60px" }}
                >
                  <h6>Login Admin</h6>
                </Link>
              </ul>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
