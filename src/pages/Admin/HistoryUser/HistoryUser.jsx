import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import newsService from "../../../services/newsService";

export default class HistoryUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listBerita: [],
    };
  }

  componentDidMount = () => {
    this.handleGetAllNews();
  };

  handleGetAllNews = async () => {
    const response = await newsService.getAllNews();

    if (response.success) {
      this.setState({
        listBerita: response.data,
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
    const { isSidebarActive, listBerita } = this.state;

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
              <h2>History User</h2>

              <div style={{ marginRight: "30px" }}>
                <table className="table">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Judul</th>
                      <th>Isi Berita</th>
                      <th>Thumbnail</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listBerita.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.headline}</td>
                        <td>{data.isi_berita}</td>
                        <td>
                          <img
                            src={data.thumbnail}
                            height="60"
                            width="60"
                            alt=""
                          />
                        </td>
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
