import React, { Component } from "react";
import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import NavBar from "../../components/Navbar";
import Swal from "sweetalert2";
import authService from "../../services/authService";

export class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      auth: {
        email: "",
        password: "",
      },
      isLoggedIn: false,
      errors: {},
      showPassword: false,
    };
  }

  componentDidMount() {
    localStorage.removeItem("email");
  }

  handleGetEmailPass = (event) => {
    const { name, value } = event.target;

    this.setState({
      auth: {
        ...this.state.auth,
        [name]: value,
      },
    });
  };

  handleShowPassword = () => {
    const { showPassword } = this.state;

    if (showPassword) {
      this.setState({
        showPassword: false,
      });
    } else {
      this.setState({
        showPassword: true,
      });
    }
  };

  handleLogin = async () => {
    const { auth } = this.state;

    if (this.handleValidationLogin()) {
      const response = await authService.loginAuth(auth);

      if (response.success) {
        this.setState({
          isLoggedIn: true,
        });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);

        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        this.setState({
          auth: {
            email: "",
            password: "",
          },
        });
      }
    }
  };

  handleValidationLogin = () => {
    const { auth } = this.state;

    var isValidForm = true;
    var errors = {};

    if (auth.email === "") {
      isValidForm = false;
      errors.email = "Email Is Required";
    }
    if (auth.password === "") {
      isValidForm = false;
      errors.password = "Password Is Required";
    }

    this.setState({
      errors: errors,
    });
    return isValidForm;
  };

  render() {
    const { isLoggedIn, errors, auth, showPassword } = this.state;
    console.log(
      "🚀 ~ file: LoginPage.jsx:83 ~ LoginPage ~ render ~ auth:",
      auth
    );
    return (
      <>
        <NavBar />

        {isLoggedIn && <Navigate to="/admin" />}

        <main className="d-flex w-100" style={{ backgroundColor: "#d5e9ac" }}>
          <div className="container d-flex flex-column">
            <div className="row vh-100">
              <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                <div className="d-table-cell align-middle">
                  <div className="text-center mt-4">
                    <h1 className="h2 fw-bold">Halaman Admin</h1>
                    <p className="lead fw-bold">
                      Login Hanya Bisa dilakukan Oleh admin
                    </p>
                  </div>

                  <div className="card" style={{ backgroundColor: "#f5f5f5" }}>
                    <div className="card-body">
                      <div className="m-sm-3">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label className="d-flex">
                              Email<p className="text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter your email"
                              onChange={this.handleGetEmailPass}
                              value={auth.email}
                              required
                              autoFocus
                            />
                            <Form.Text className="text-danger">
                              {errors.email}
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label className="d-flex">
                              Password<p className="text-danger">*</p>
                            </Form.Label>
                            <div className="input-group">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Masukkan Password"
                                onChange={this.handleGetEmailPass}
                                value={auth.password}
                                required
                              />
                              <Button
                                className="input-group-append"
                                onClick={this.handleShowPassword}
                              >
                                {showPassword ? (
                                  <Icon.EyeSlashFill />
                                ) : (
                                  <Icon.EyeFill />
                                )}
                              </Button>
                            </div>
                            <Form.Text className="text-danger">
                              {errors.password}
                            </Form.Text>
                          </Form.Group>
                          <div className="d-grid gap-2 mt-3">
                            <Button
                              onClick={this.handleLogin}
                              className="btn btn-lg btn-primary"
                            >
                              Login
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
