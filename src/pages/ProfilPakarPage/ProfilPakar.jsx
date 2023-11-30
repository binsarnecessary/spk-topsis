import React, { Component } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Container, Image, Row } from "react-bootstrap";
import Pakar1 from "../../assets/img/pakar1.jpg";
import Pakar2 from "../../assets/img/pakar2.jpg";

export default class ProfilPakar extends Component {
  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div className="mt-4">
          <Container>
            <h3 className="mb-4">Profil Pakar</h3>
            <div className="mb-5">
              <Row>
                <Col lg={1}></Col>
                <Col lg={2}>
                  <Image src={Pakar1} width="200" height="220" />
                </Col>
                <Col>
                  <div>
                    <h2 style={{ color: "#171f69" }}>
                      Nita Riski Yuliati,A.Md
                    </h2>
                    <i>Wonogiri, 13 Juli 1994</i>
                    <p>
                      STIE MAHESA Manokwari <br />
                    </p>
                    <ul style={{ marginTop: "-10px" }}>
                      <li>Guru di SD IT Insan Mulia Manokwari</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row>
                <Col lg={1}></Col>
                <Col lg={2}>
                  <Image src={Pakar2} width="200" height="220" />
                </Col>
                <Col>
                  <div>
                    <h2 style={{ color: "#171f69" }}>Siti Nurhayati, S.Pd</h2>
                    <i>Jayapura, 21 Mei 1979</i>
                    <p>
                      UT Universitas Terbuka
                      <br />
                    </p>
                    <ul style={{ marginTop: "-10px" }}>
                      <li>Mengajar dari THN 2004 hingga sekarang</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }
}
