import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import alternativeService from "../../../services/alternativeService";
import FormInputAlternative from "./FormInputAlternative";

export default class AlternativePage extends Component {
  alternativeModel = {
    code: "",
    name: "",
    description: "",
    image: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listAlternative: [],
      alternativeModel: this.alternativeModel,
      isShow: false,
      errors: {},
      mode: "",
    };
  }

  componentDidMount = () => {
    this.handleGetAllAlternative();
  };

  handleOpenModal = () => {
    this.setState({
      isShow: true,
      mode: "create",
    });
  };

  handleCloseModal = () => {
    this.setState({
      isShow: false,
      alternativeModel: this.alternativeModel,
    });
  };

  handleOpenModalEdit = async (id) => {
    this.handleGetAllAlternative();
    const response = await alternativeService.getAlternativeById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "edit",
        alternativeModel: response.data,
      });
    }
  };

  handleOpenModalDelete = async (id) => {
    const response = await alternativeService.getAlternativeById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "delete",
        alternativeModel: response.data,
      });
    }
  };

  handleValidation = () => {
    const { alternativeModel } = this.state;
    var isValidForm = true;
    var errors = {};

    if (alternativeModel.code === "") {
      isValidForm = false;
      errors.code = "Code is required";
    } else if (alternativeModel.name === "") {
      isValidForm = false;
      errors.name = "Name is Required";
    }

    this.setState({
      errors: errors,
    });

    return isValidForm;
  };

  handleSave = async () => {
    const { alternativeModel } = this.state;

    if (this.handleValidation()) {
      const response = await alternativeService.addAlternative(
        alternativeModel
      );
      if (response.success) {
        this.handleGetAllAlternative();
        this.setState({
          isShow: false,
          alternativeModel: this.alternativeModel,
        });
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        this.setState({
          errors: response.data,
        });
      }
    }
  };

  handleEdit = async () => {
    const { alternativeModel } = this.state;

    if (this.handleValidation()) {
      const response = await alternativeService.updateAlternative(
        alternativeModel
      );
      if (response.success) {
        this.handleGetAllAlternative()
        this.setState({
          isShow: false,
          alternativeModel: this.alternativeModel,
        });
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  };

  handleDelete = async () => {
    const { alternativeModel } = this.state;

    const response = await alternativeService.deleteAlternative(
      alternativeModel.id
    );
    if (response.success) {
      this.handleGetAllAlternative()
      this.setState({
        isShow: false,
        alternativeModel: this.alternativeModel,
      });
      Swal.fire({
        title: "Success!",
        text: response.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      alternativeModel: {
        ...this.state.alternativeModel,
        [name]: value,
      },
    });
  };

  handleGetAllAlternative = async () => {
    const response = await alternativeService.getAlternative();

    if (response.success) {
      this.setState({
        listAlternative: response.data,
      });
    }
  };

  handleShowSidebar = () => {
    const { isSidebarActive } = this.state;

    if (isSidebarActive) {
      this.setState({
        isSidebarActive: false,
      });
    } else {
      this.setState({
        isSidebarActive: true,
      });
    }
  };

  render() {
    const {
      isSidebarActive,
      listAlternative,
      isShow,
      mode,
      alternativeModel,
      errors,
    } = this.state;
      console.log("🚀 ~ file: AlternativePage.jsx:211 ~ AlternativePage ~ render ~ alternativeModel:", alternativeModel)

    return (
      <div>
        <div className="wrapper">
          {isSidebarActive ? <SideBar /> : <></>}
          <div className="main">
            <NavbarAdmin handleShowSidebar={this.handleShowSidebar} />
            <div
              style={{ marginBottom: "400px", marginLeft: "30px" }}
              className="mt-4"
            >
              <div className="mt-3" style={{ marginLeft: "20px" }}>
                <Link className="text-decoration-none" to="/admin">
                  <Icon.ArrowLeft size={25} /> Back
                </Link>
              </div>

              <div
                style={{ marginBottom: "400px", marginLeft: "30px" }}
                className="mt-4"
              >
                <h2>Alternative Page</h2>

                <div
                  className="d-flex justify-content-end mb-3"
                  style={{ marginRight: "30px" }}
                >
                  <Button onClick={this.handleOpenModal}>
                    Tambah Alternative
                  </Button>
                </div>
                <div style={{ marginRight: "30px" }}>
                  <table className="table">
                    <thead className="text-center">
                      <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {listAlternative.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.code}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td>
                            <div className="d-flex">
                              <Button
                                onClick={() =>
                                  this.handleOpenModalEdit(data.id)
                                }
                                variant="warning"
                              >
                                <Icon.Pen />
                              </Button>
                              <Button
                                onClick={() =>
                                  this.handleOpenModalDelete(data.id)
                                }
                                variant="danger"
                                style={{ marginLeft: "5px" }}
                              >
                                <Icon.Trash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        <FormInputAlternative
          isShow={isShow}
          alternativeModel={alternativeModel}
          mode={mode}
          close={this.handleCloseModal}
          listAlternative={listAlternative}
          errors={errors}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
