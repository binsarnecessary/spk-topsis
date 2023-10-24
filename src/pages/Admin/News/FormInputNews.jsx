import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function FormInputNews(props) {
  const {
    isShow,
    close,
    handleChange,
    errors,
    handleSave,
    newsModel,
    mode,
    handleEdit,
    handleDelete,
    error,
  } = props;

  var title;
  var button;

  if (mode === "create") {
    title = <Modal.Title>Tambah Berita</Modal.Title>;
    button = (
      <Button variant="primary" onClick={handleSave}>
        Simpan
      </Button>
    );
  } else if (mode === "edit") {
    title = <Modal.Title>Edit Berita</Modal.Title>;
    button = (
      <Button variant="warning" onClick={handleEdit}>
        Simpan
      </Button>
    );
  } else {
    title = <Modal.Title>Hapus Berita</Modal.Title>;
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
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="headline"
                  value={newsModel.headline}
                  disabled
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="headline"
                  value={newsModel.headline}
                  placeholder="Masukkan Headline Berita"
                />
                <Form.Text className="text-danger">
                  {errors && errors.headline}
                  {error}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="thumbnail"
                  value={newsModel.thumbnail}
                  placeholder="Masukkan Thumbnail Berupa Link URL"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Isi Berita</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  name="main"
                  value={newsModel.isi_berita}
                  placeholder="Masukkan Isi Berita"
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
