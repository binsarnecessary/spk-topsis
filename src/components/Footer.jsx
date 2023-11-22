import React from "react";
import { Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container
        fluid
        style={{
          marginTop: "50px",
          backgroundColor: "#3c3b37",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingRight: "100px",
          paddingLeft: "100px",
        }}
        className="text-white"
      >
        <Row>
          <div className="col-12 col-lg-3 mb-4 text-center">
            <img
              src="https://insanmuliamanokwari.sch.id/wp-content/uploads/2021/07/logo-SDIT-Insan-Mulia-Manokwari.png"
              alt="logo footer"
              className="logo img-fluid"
            />
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <h6 className="fw-bold">Kontak</h6>
            <div className="row d-flex align-items-center">
              <div className="col-1">
                <Icon.Envelope></Icon.Envelope>
              </div>
              <div className="col-11">
                <Link
                  to="mailto:juliah@gmail.com"
                  className="text-white text-decoration-none"
                >
                  <small>lhiyajulia7@gmail.com</small>
                </Link>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-1">
                <Icon.Instagram></Icon.Instagram>
              </div>
              <div className="col-11">
                <Link
                  to="https://www.instagram.com/lhiyajuliaa_/"
                  className="text-white text-decoration-none"
                  target="_blank"
                >
                  <small>@lhiyajuliaa_</small>
                </Link>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-1">
                <Icon.Facebook></Icon.Facebook>
              </div>
              <div className="col-11">
                <Link
                  to="https://www.facebook.com"
                  className="text-white text-decoration-none"
                  target="_blank"
                >
                  <small>LhiyaJulia</small>
                </Link>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-1">
                <Icon.Whatsapp></Icon.Whatsapp>
              </div>
              <div className="col-11">
                <Link
                  href="https://wa.me/6282238079745"
                  className="text-white text-decoration-none"
                  target="_blank"
                >
                  <small>+62 822-3807-9745</small>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <Icon.House></Icon.House>
              </div>
              <div className="col-11">
                <span>
                  <small>Jl. Reremi Puncak RRI</small>
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 mb-4">
            <h6 className="fw-bold">Info</h6>
            <ul style={{ listStyleType: "none", padding: "0 0" }}>
              <li>
                <Link to="#!" className="text-white text-decoration-none">
                  <small>Profil Produk</small>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  className="text-white text-decoration-none"
                >
                  <small>Buku Manual</small>
                </Link>
              </li>
              <li>
                <Link to="#!" className="text-white text-decoration-none">
                  <small>Lisensi</small>
                </Link>
              </li>
              <li>
                <Link to="#!" className="text-white text-decoration-none">
                  <small>HAKI</small>
                </Link>
              </li>
              <li>
                <Link to="#!" className="text-white text-decoration-none">
                  <small>Penghargaan</small>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-3 mb-4">
            <h6 className="fw-bold">Supported By</h6>
            <Link target="_blank">
              <img
                alt="digistar"
                className="another-logo mb-3"
                src="https://uploads-ssl.webflow.com/61e56178f3e363337a6577cc/62195291ebd6fdce599a13f0_Logo%20UNIPA%20Warna-01.webp"
                width="150"
              />{" "}
            </Link>{" "}
          </div>
        </Row>
        <p className="d-flex justify-content-center">
          Copyright &copy; 2023. Metode SPK
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
