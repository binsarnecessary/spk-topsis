import React from "react";
// import SideBar from "../../components/common/SideBar";
import Swal from "sweetalert2";
// import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "./Banner";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import News from "./News";
import CallUs from "./CallUs";
import newsService from "../../services/newsService";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

export default class LandingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      //isLoggedOut: false,
      sidebar: true,
      listMenu: [],
      listAllMenu: [],
      listNews: [],
    };
  }

  componentDidMount = () => {
    this.handleGetNews();
    this.handleGetUser()
  };

  handleGetNews = async () => {
    const response = await newsService.getAllNews();

    if (response.success) {
      this.setState({
        listNews: response.data,
      });
    }
  };

  handleGetUser = async () => {
    const response = await authService.getUser()

    if(response.success) {
      const user = Number(response.data.max) + 1
      localStorage.setItem('guest_id', user)
    }
  }

  handleLogout = () => {
    localStorage.setItem("role_id", "");
    localStorage.removeItem("role"); // menghapus yang ada di local storage (logout)
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("doctor_id");
    localStorage.removeItem("customer_id");
    Swal.fire({
      //allert
      title: "Success!",
      text: "You have successfully Log Out",
      icon: "success",
      confirmButtonText: "OK",
    });
    this.setState({
      isLoggedOut: true,
    });
  };

  showSidebar = () => {
    const { sidebar } = this.state;

    if (sidebar) {
      this.setState({
        sidebar: false,
      });
    } else {
      this.setState({
        sidebar: true,
      });
    }
  };

  //   handleGetMenuById = async () => {
  //     const id = localStorage.getItem('role_id')

  //     const response = await LandingPageServices.getMenuById(id)

  //     if (response.success) {
  //       this.setState({
  //         listMenu: response.data
  //       })
  //     }
  //   }

  //   handleGetAllMenu = async () => {
  //     const response = await LandingPageServices.getAllMenu()

  //     if (response.success) {
  //         this.setState({
  //             listAllMenu: response.data
  //         })
  //     }
  // }

  //   componentDidMount() {
  //     this.handleGetMenuById()
  //   }

  render() {
    const { listNews } = this.state;
    return (
      <>
        {/* {isLoggedOut && <Navigate to="/login" />} */}

        <div>
          <Navbar />
          {/* {role_id != 5 ? sidebar ? <SideBar 
          listMenu={listMenu}/> : <></> : <></>} */}
          <div className="main">
            <Banner />
            <div className="mt-5 mb-4" id="content">
              <Row>
                <Col lg={1}></Col>
                <Col>
                  <div style={{ textAlign: "justify" }}>
                    <Link to="/kuesioner-spk">
                    <Button variant="success" className="mb-3 btn-lg px-5">
                      Tentukan Passion Anak
                    </Button>
                    </Link>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem quisquam tempora rerum assumenda unde perferendis
                      eos alias blanditiis optio iure quis, aliquam sed
                      praesentium recusandae?
                    </p>
                  </div>
                </Col>
                <Col lg={1}></Col>
                <Col lg={4}>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-primary">Search</Button>
                  </Form>
                </Col>
                <Col lg={1}></Col>
              </Row>
            </div>

            <Container fluid style={{ backgroundColor: "#51f07c" }}>
              <div className="mt-3"></div>
            </Container>

            <News listNews={listNews} />
            <Container fluid style={{ backgroundColor: "#51f07c" }}>
              <div className="mt-3"></div>
            </Container>
            <CallUs />
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
