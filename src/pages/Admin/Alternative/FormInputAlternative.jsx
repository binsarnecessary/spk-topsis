import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function FormInputAlternative(props) {
  const {
    isShow,
    close,
    handleChange,
    errors,
    handleSave,
    alternativeModel,
    mode,
    handleEdit,
    handleDelete,
    error,
  } = props;

  var title;
  var button;

  if (mode === "create") {
    title = <Modal.Title>Tambah Alternative</Modal.Title>;
    button = (
      <Button variant="primary" onClick={handleSave}>
        Simpan
      </Button>
    );
  } else if (mode === "edit") {
    title = <Modal.Title>Edit Alternative</Modal.Title>;
    button = (
      <Button variant="warning" onClick={handleEdit}>
        Simpan
      </Button>
    );
  } else {
    title = <Modal.Title>Hapus Alternative</Modal.Title>;
    button = (
      <Button variant="danger" onClick={handleDelete}>
        Hapus
      </Button>
    );
  }

  return (
    <Modal show={isShow} onHide={close}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <Form>
          {mode === "delete" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name Alternative</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={alternativeModel.name}
                  disabled
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="code"
                  value={alternativeModel.code}
                  placeholder="Masukkan Code"
                />
                <Form.Text className="text-danger">
                  {errors && errors.code}
                  {error}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={alternativeModel.name}
                  placeholder="Masukkan Name"
                />
                <Form.Text className="text-danger">
                  {errors && errors.name}
                  {error}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="description"
                  value={alternativeModel.description}
                  placeholder="Masukkan Description"
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        {button}
      </Modal.Footer>
    </Modal>
  );
}
