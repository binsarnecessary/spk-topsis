import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import criteriaService from "../../../services/criteriaService";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import alternativeService from "../../../services/alternativeService";
import FormInputCriteria from "./FormInputCriteria";

export default class CriteriaPage extends Component {
  criteriaModel = {
    name: "",
    description: "",
    alternative_id: "",
    attribut: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listCriteria: [],
      listAlternative: [],
      criteriaModel: this.criteriaModel,
      isShow: false,
      mode: "",
      errors: {},
    };
  }

  componentDidMount = () => {
    this.handleGetAllCriteria();
  };

  handleOpenModal = () => {
    this.handleGetAllAlternative();
    this.setState({
      isShow: true,
      mode: "create",
    });
  };

  handleCloseModal = () => {
    this.setState({
      isShow: false,
      criteriaModel: this.criteriaModel,
    });
  };

  handleOpenModalEdit = async (id) => {
    this.handleGetAllAlternative();
    const response = await criteriaService.getAllCriteriaById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "edit",
        criteriaModel: response.data,
      });
    }
  };

  handleOpenModalDelete = async (id) => {
    const response = await criteriaService.getAllCriteriaById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "delete",
        criteriaModel: response.data,
      });
    }
  };

  handleValidation = () => {
    const { criteriaModel } = this.state;
    var isValidForm = true;
    var errors = {};

    if (criteriaModel.name === "") {
      isValidForm = false;
      errors.name = "Name is required";
    } else if (criteriaModel.alternative_id === "") {
      isValidForm = false;
      errors.alternative_id = "Choose Alternative";
    }

    this.setState({
      errors: errors,
    });

    return isValidForm;
  };

  handleSave = async () => {
    const { criteriaModel } = this.state;

    if (this.handleValidation()) {
      const response = await criteriaService.addCriteria(criteriaModel);
      if (response.success) {
        this.handleGetAllCriteria();
        this.setState({
          isShow: false,
          criteriaModel: this.criteriaModel,
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
    const { criteriaModel } = this.state;

    if (this.handleValidation()) {
      const response = await criteriaService.updateCriteria(criteriaModel);
      if (response.success) {
        this.handleGetAllCriteria();
        this.setState({
          isShow: false,
          criteriaModel: this.criteriaModel,
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
    const { criteriaModel } = this.state;

    const response = await criteriaService.deleteCriteria(criteriaModel.id);
    if (response.success) {
      this.handleGetAllCriteria();
      this.setState({
        isShow: false,
        criteriaModel: this.criteriaModel,
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
      criteriaModel: {
        ...this.state.criteriaModel,
        [name]: value,
      },
    });
  };

  handleGetAllAlternative = async () => {
    const response = await alternativeService.getAlternative(
      alternativeService
    );

    if (response.success) {
      this.setState({
        listAlternative: response.data,
      });
    }
  };

  handleGetAllCriteria = async () => {
    const response = await criteriaService.getAllCriteria();

    if (response.success) {
      this.setState({
        listCriteria: response.data,
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
      listCriteria,
      listAlternative,
      isShow,
      mode,
      criteriaModel,
      errors,
    } = this.state;
    console.log(
      "🚀 ~ file: CriteriaPage.jsx:156 ~ CriteriaPage ~ render ~ criteriaModel:",
      criteriaModel
    );
    return (
      <div>
        <div className="wrapper">
          {isSidebarActive ? <SideBar /> : <></>}
          <div className="main">
            <NavbarAdmin handleShowSidebar={this.handleShowSidebar} />
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              <Link className="text-decoration-none" to="/admin">
                <Icon.ArrowLeft size={25} /> Back
              </Link>
            </div>
            <div
              style={{ marginBottom: "400px", marginLeft: "30px" }}
              className="mt-4"
            >
              <h2>Kriteria Page</h2>

              <div
                className="d-flex justify-content-end mb-3"
                style={{ marginRight: "30px" }}
              >
                <Button onClick={this.handleOpenModal}>Tambah Kriteria</Button>
              </div>
              <div style={{ marginRight: "30px" }}>
                <table className="table">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Alternative Id</th>
                      <th>Attribut</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listCriteria.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>{data.alternative_id}</td>
                        <td>{data.attribut}</td>
                        <td>
                          <div className="d-flex">
                            <Button
                              onClick={() => this.handleOpenModalEdit(data.id)}
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
            <Footer />
          </div>
        </div>

        <FormInputCriteria
          isShow={isShow}
          criteriaModel={criteriaModel}
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
