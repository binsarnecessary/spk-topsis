import React, { Component } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Col, Container, Image, Row } from "react-bootstrap";
import JuliaPic from "../../assets/img/juliah.jpg"
import AdrianaPic from "../../assets/img/adriana.jpg"


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
                  <Image
                    src={JuliaPic}
                    width="200"
                    height="220"
                  />
                </Col>
                <Col>
                  <div>
                    <h2 style={{ color: "#171f69" }}>Juliah Anggreani</h2>
                    <i>Manokwari, 10 Juli 2001</i>
                    <p>
                      S1 Teknik Informatika UNIPA 2019 <br />
                      Riwayat Mengajar :{" "}
                    </p>
                    <ul style={{ marginTop: "-10px" }}>
                      <li>SD N</li>
                      <li>SMP N 3 Manokwari</li>
                      <li>SMA N 1 Manokwari</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Row>
                <Col lg={1}></Col>
                <Col lg={2}>
                  <Image
                    src={AdrianaPic}
                    width="200"
                    height="220"
                  />
                </Col>
                <Col>
                  <div>
                    <h2 style={{ color: "#171f69" }}>Adriana Neonufa, S. Psi</h2>
                    <i>Manokwari, 07 April 2001</i>
                    <p>
                      S1 Pendidikan Psikologi UM 2019 <br />
                    </p>
                    <ul style={{ marginTop: "-10px" }}>
                      <li>-</li>
                      <li>-</li>
                      <li>-</li>
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
