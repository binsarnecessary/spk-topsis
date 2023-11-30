import React from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";

export default function FormInputCriteria(props) {
  const {
    isShow,
    close,
    listAlternative,
    handleChange,
    errors,
    handleSave,
    criteriaModel,
    mode,
    handleEdit,
    handleDelete,
    error,
  } = props;

  var title;
  var button;

  if (mode === "create") {
    title = <Modal.Title>Tambah Criteria</Modal.Title>;
    button = (
      <Button variant="primary" onClick={handleSave}>
        Simpan
      </Button>
    );
  } else if (mode === "edit") {
    title = <Modal.Title>Edit Criteria</Modal.Title>;
    button = (
      <Button variant="warning" onClick={handleEdit}>
        Simpan
      </Button>
    );
  } else {
    title = <Modal.Title>Hapus Criteria</Modal.Title>;
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
                <Form.Label>Name Criteria</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={criteriaModel.name}
                  disabled
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={criteriaModel.name}
                  placeholder="Masukkan Name Criteria"
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
                  value={criteriaModel.description}
                  placeholder="Masukkan Description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <FormLabel>Alternative</FormLabel>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="alternative_id"
                  value={criteriaModel.alternative_id}
                >
                  <option>Select Alternative</option>
                  {listAlternative.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.alternative_id}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Attribut</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="attribut"
                  value={criteriaModel.attribut}
                  placeholder="Ketik cost / benefit"
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
