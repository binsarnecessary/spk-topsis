import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";
import NavBar from "../../components/Navbar";
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import ModalInputCriteria from "./ModalInputCriteria";

export default class PassionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  handleOpenModal = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <div className="mb-4">
          <NavBar />
        </div>

        <div style={{ marginLeft: "30px" }}>
          <Button variant="success">Masukkan Criteria Anak Anda</Button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kriteria</th>
              <th>Bobot</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Halo</td>
              <td>3</td>
              <td>Ini Ket</td>
              <td>
                <Button variant="warning" style={{ marginRight: "10px" }}>
                  <Icon.Pen />
                </Button>
                <Button variant="danger">
                  <Icon.Trash />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className="d-flex justify-content-end"
          style={{ marginRight: "50px" }}
        >
          <Button>Tentukan Passion</Button>
        </div>
        <div>
          <Footer />
        </div>

        <div id="for open modal">
          <ModalInputCriteria show={show} />
        </div>
      </div>
    );
  }
}
