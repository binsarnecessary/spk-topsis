import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function News(props) {
  const { listNews } = props;
  return (
    <div className="mb-5">
      <Container>
        <h3 className="fw-bold mt-4">Berita</h3>
        <Row>
          {listNews.map((data, index) => (
            <Col sm={3} key={index}>
              <Link className="text-decoration-none" to={"/news/" + data.id}>
                <Card
                  style={{ marginTop: "40px", textDecoration: "none" }}
                  className="cards"
                >
                  <Image className="card-img-top" src={data.thumbnail} />

                  <Card.Body>
                    <Card.Header>
                      <h5
                        class="mb-0"
                        style={{
                          color: "#183153",
                          textAlign: "center",
                          textDecoration: "none",
                        }}
                      >
                        {data.headline}
                      </h5>
                    </Card.Header>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
