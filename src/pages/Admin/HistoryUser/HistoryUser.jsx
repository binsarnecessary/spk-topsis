import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import topsisService from "../../../services/topsisService";

export default class HistoryUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listUser: [],
      isDetail: false,
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

  render() {
    const { isSidebarActive, listUser, isDetail } = this.state;

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

              <div style={{ marginRight: "30px" }}>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Guest Id</th>
                      <th>Nama Topsis</th>
                      <th>Topsis Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listUser.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.guest_id}</td>
                        <td>{data.nameTopsis}</td>
                        <td>{data.topsis_score}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              onClick={() => this.handleToDetailPage(data.guest_id)}
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
