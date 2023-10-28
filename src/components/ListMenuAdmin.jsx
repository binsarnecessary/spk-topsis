import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const ListMenuAdmin = () => {
  // console.log(listMenu.name);
  return (
    <>
      <div className="container">
        <Row>
          <Col sm={3}>
            <a href="/admin-history" style={{ textDecoration: "none" }}>
              <Card
                style={{ marginTop: "40px", textDecoration: "none" }}
                className="cards"
              >
                <Card.Header
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Col>
                      <Icon.ClockHistory size={40} />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h5
                      className="mb-0"
                      style={{
                        color: "#183153",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      History Topsis
                    </h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>

          <Col sm={3}>
            <a href="/admin-news" style={{ textDecoration: "none" }}>
              <Card
                style={{ marginTop: "40px", textDecoration: "none" }}
                className="cards"
              >
                <Card.Header
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Col>
                      <Icon.Newspaper size={40} />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h5
                      className="mb-0"
                      style={{
                        color: "#183153",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      Input Berita
                    </h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>

          <Col sm={3}>
            <a href="/admin-criteria" style={{ textDecoration: "none" }}>
              <Card
                style={{ marginTop: "40px", textDecoration: "none" }}
                className="cards"
              >
                <Card.Header
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Col>
                      <Icon.FileEarmark size={40} />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h5
                      className="mb-0"
                      style={{
                        color: "#183153",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      Kriteria
                    </h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>

          <Col sm={3}>
            <a href="/admin-alternative" style={{ textDecoration: "none" }}>
              <Card
                style={{ marginTop: "40px", textDecoration: "none" }}
                className="cards"
              >
                <Card.Header
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Col>
                      <Icon.Shuffle size={40} />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h5
                      className="mb-0"
                      style={{
                        color: "#183153",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      Alternatif
                    </h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
};
