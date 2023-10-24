import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function CallUs(props) {
  const unique = 1;

  return (
    <div className="mt-4">
      <div>
        <Row>
          <Col lg={1}></Col>
          <Col>
            <div>
              <h4 className="fw-bold">Hubungi Kami</h4>
              <p>
                Berikan masukan dan saran Anda melalui kontak form dibawah ini
              </p>
            </div>
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan Nama" />
                  <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Masukkan Email" />
                  <Form.Text></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Pesan</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Masukkan Pesan Anda"
                  />
                  <Form.Text></Form.Text>
                </Form.Group>
                <Button>Kirim Pesan</Button>
              </Form>
            </div>
          </Col>
          {/* <Col></Col> */}
          <Col>
            <div>
              <iframe
                className="embed-responsive-item mt-2 ,l-3"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d373.58168575585086!2d134.07120025424112!3d-0.8557237542256119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d540aec8b20b32b%3A0x928cc37d62e4941d!2sLPP%20RRI%20Manokwari!5e0!3m2!1sid!2sid!4v1697563386893!5m2!1sid!2sid"
                frameborder="0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
                height="300px"
                width="600px"
                key={unique}
                title="Maps"
              ></iframe>
            </div>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </div>
    </div>
  );
}
