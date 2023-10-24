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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta minus qui, rem nihil, perferendis fugit quod molestias
                  autem, hic velit placeat in voluptatum ipsum quia quas omnis.
                  Consequuntur nulla veniam iste nobis, aspernatur dolores
                  perferendis soluta deleniti tenetur excepturi labore
                  voluptates? Voluptates ratione similique, iure vel nobis
                  molestias placeat magnam Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Culpa, explicabo.
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
