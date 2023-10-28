import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function Banner() {
  return (
    <div
      style={{
        backgroundColor: "#98d6a2",
        paddingBottom: "120px",
        paddingTop: "20px",
      }}
    >
      <Container fluid>
        <div>
          <Row>
            <Col lg={1}></Col>
            <Col>
              <div className="fw-bold mt-5" style={{ textAlign: "justify" }}>
                <p>Metode Mendidik Anak Sesuai Perspektif Passion</p>
                <h1>Aplikasi Sistem Pakar</h1>
                <p>
                  Dengan Sistem ini, Anda akan menemukan cara yang inovatif dan
                  akurat untuk menentukan passion anak Anda. Sistem SPK TOPSIS
                  kami telah dirancang khusus untuk membantu Anda dalam
                  perjalanan ini. Dengan bantuan kami, Anda dapat menjelajahi
                  minat, bakat, dan potensi unik anak Anda sehingga mereka dapat
                  meraih potensi terbaik dalam hidup mereka. Mulailah
                  petualangan menemukan passion anak Anda bersama kami dan
                  lihatlah bagaimana kami dapat membantu menciptakan masa depan
                  yang cerah untuk mereka.
                </p>
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col>
              <Image
                className="img-fluid rounded-circle mb-2 mt-4"
                src="https://greatnusa.com/wp-content/uploads/2023/03/Passion-adalah.png"
              />
            </Col>
            <Col lg={1}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
