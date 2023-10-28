import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import criteriaService from "../../../services/criteriaService";
import { Button } from "react-bootstrap";

export default class CriteriaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listCriteria: [],
    };
  }

  componentDidMount = () => {
    this.handleGetAllCriteria();
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
    const { isSidebarActive, listCriteria } = this.state;

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
                <Button onClick={this.handleOpenModal}>Tambah Berita</Button>
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
      </div>
    );
  }
}
