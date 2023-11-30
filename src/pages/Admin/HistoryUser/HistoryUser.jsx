import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import topsisService from "../../../services/topsisService";
// import Swal from "sweetalert2";
// import criteriaService from "../../../services/criteriaService";

export default class HistoryUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      originalListUser: [],
      listUser: [],
      isDetail: false,
      search: "",
    };
  }

  componentDidMount = () => {
    this.handleGetAllNews();
    localStorage.removeItem("guest_id");
  };

  handleGetAllNews = async () => {
    const response = await topsisService.getAllUserTopsis();

    if (response.success) {
      this.setState({
        listUser: response.data,
        originalListUser: response.data,
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

  handleToDetailPage = (id) => {
    localStorage.setItem("guest_id", id);
    this.setState({
      isDetail: true,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();

    const { search, originalListUser } = this.state;

    // Filter data berdasarkan input pencarian jika pencarian tidak kosong
    const filteredList = search
      ? originalListUser.filter(
          (data) =>
            data.name && data.name.toLowerCase().includes(search.toLowerCase())
        )
      : originalListUser;

    this.setState({
      listUser: filteredList,
    });
  };

  // handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Do you want to Delete this Data?",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Delete",
  //     denyButtonText: `Don't Delete`,
  //   }).then(async (result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       const response = await criteriaService.deleteDecision(id);
  //       if (response.success) {
  //         Swal.fire("Deleted!", "", "success");
  //       }
  //     } else if (result.isDenied) {
  //       Swal.fire("Data Not Delete", "", "info");
  //     }
  //   });
  // };

  render() {
    const { isSidebarActive, listUser, isDetail, search } = this.state;
    console.log(
      "🚀 ~ file: HistoryUser.jsx:59 ~ HistoryUser ~ render ~ listUser:",
      listUser
    );

    return (
      <div>
        {isDetail && <Navigate to="/admin-detail-history" />}

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
              <h2>History User</h2>

              <Form onSubmit={this.handleSearchSubmit} className="d-flex mb-4">
                <Form.Group controlId="searchForm">
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={this.handleSearchChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{marginLeft: "10px"}}>
                  Search
                </Button>
              </Form>

              <div style={{ marginRight: "30px" }}>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Anak</th>
                      <th>Nama Topsis</th>
                      <th>Topsis Score</th>
                      <th>Tanggal Akses</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listUser.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.nameTopsis}</td>
                        <td>{data.topsis_score}</td>
                        <td>{data.createdAt}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              onClick={() =>
                                this.handleToDetailPage(data.guest_id)
                              }
                              variant="warning"
                              title="detail"
                            >
                              <Icon.InfoCircle />
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
