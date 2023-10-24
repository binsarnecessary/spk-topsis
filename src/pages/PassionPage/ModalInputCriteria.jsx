import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalInputCriteria(props) {
  const { show, close } = props;
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Cari Dokter</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Text className="text-muted">
            Masukkan Kriteria Anak Anda
          </Form.Text>
          <h5> </h5>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Kriteria</Form.Label>
            <Form.Select
              //   onChange={handleSelectedLokasi}
              aria-label="Default select example"
              name="nama_lokasi" //lokasimodel
              //   value={listLokasi.nama_lokasi}
            >
              <option>Pilih </option>
              <option>Haloo</option>
              <option>HALOO</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Bobot</Form.Label>
            <Form.Select>
              <option>--Pilih--</option>
              <option>HALOOO</option>
              <option>hALOOOOO</option>
              <option>HALOOO</option>
            </Form.Select>
            <Form.Text className="text-danger"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Keterangan</Form.Label>
            <Form.Select aria-label="Default select example" name="name">
              <option>Pilih</option>
              <option>Halloo</option>
              <option>Halloo</option>
              <option>Halloo</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Kosongkan
        </Button>

        <Button variant="primary">Simpan</Button>
      </Modal.Footer>
    </Modal>
  );
}
