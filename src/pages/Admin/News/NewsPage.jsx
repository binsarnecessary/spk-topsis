import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import newsService from "../../../services/newsService";
import FormInputNews from "./FormInputNews";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class NewsPage extends Component {
  newsModel = {
    headline: "",
    thumbnail: "",
    main: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      listBerita: [],
      newsModel: this.newsModel,
      isShow: false,
      mode: "",
      errors: {},
    };
  }

  componentDidMount = () => {
    this.handleGetAllNews();
  };

  handleOpenModal = () => {
    this.setState({
      isShow: true,
      mode: "create",
    });
  };

  handleOpenModalEdit = async (id) => {
    const response = await newsService.getNewsById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "edit",
        newsModel: response.data,
      });
    }
  };

  handleOpenModalDelete = async (id) => {
    const response = await newsService.getNewsById(id);

    if (response.success) {
      this.setState({
        isShow: true,
        mode: "delete",
        newsModel: response.data,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      isShow: false,
      newsModel: this.newsModel,
    });
  };

  handleValidation = () => {
    const { newsModel } = this.state;
    var isValidForm = true;
    var errors = {};

    if (newsModel.headline === "") {
      isValidForm = false;
      errors.name = "Headline is required";
    }

    this.setState({
      errors: errors,
    });

    return isValidForm;
  };

  handleSave = async () => {
    const { newsModel } = this.state;

    if (this.handleValidation()) {
      const response = await newsService.addDataNews(newsModel);
      if (response.success) {
        this.handleGetAllNews();
        this.setState({
          isShow: false,
          newsModel: this.newsModel,
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
    const { newsModel } = this.state;

    if (this.handleValidation()) {
      const response = await newsService.editDataNews(newsModel);
      if (response.success) {
        this.handleGetAllNews();
        this.setState({
          isShow: false,
          newsModel: this.newsModel,
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
    const { newsModel } = this.state;

    const response = await newsService.deleteDataNews(newsModel.id);
    if (response.success) {
      this.handleGetAllNews();
      this.setState({
        isShow: false,
        newsModel: this.newsModel,
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
      newsModel: {
        ...this.state.newsModel,
        [name]: value,
      },
    });
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
    const { isSidebarActive, listBerita, isShow, mode, newsModel, errors } =
      this.state;

    console.log(newsModel);

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
              <h2>News Page</h2>

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

        <FormInputNews
          isShow={isShow}
          newsModel={newsModel}
          mode={mode}
          close={this.handleCloseModal}
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
