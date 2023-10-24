import React, { Component } from "react";
import NavBar from "../../components/Navbar";
import { Button, Container, Form } from "react-bootstrap";
import Footer from "../../components/Footer";
import criteriaService from "../../services/criteriaService";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

export default class KuesionerPage extends Component {
  listDecision = [];

  constructor(props) {
    super(props);

    this.state = {
      listCriteria: [],
      listPoint: [],
      listDecision: this.listDecision,
      isPassion: false,
      errors: "",
    };
  }

  componentDidMount = () => {
    this.handleGetAllCriteria();
    this.handleGetPoint();
  };

  handleGetAllCriteria = async () => {
    const response = await criteriaService.getAllCriteria();

    if (response.success) {
      this.setState({
        listCriteria: response.data,
      });
    }
  };

  handleGetPoint = async () => {
    const response = await criteriaService.getAllPoint();

    if (response.success) {
      this.setState({
        listPoint: response.data,
      });
    }
  };

  handleSelectData = (criteriaId, event) => {
    const { value } = event.target;

    // Mengecek apakah data dengan criteria_id yang sama sudah ada dalam listDecision
    const existingDataIndex = this.state.listDecision.findIndex(
      (data) => data.criteria_id === criteriaId
    );

    if (existingDataIndex !== -1) {
      // Jika data sudah ada, maka perbarui data yang sudah ada
      const updatedData = [...this.state.listDecision];
      updatedData[existingDataIndex] = {
        point: value,
        criteria_id: criteriaId,
        guest_id: localStorage.getItem("guest_id"),
      };

      this.setState({
        listDecision: updatedData,
      });
    } else {
      // Jika data belum ada, tambahkan data baru
      const updatedData = {
        point: value,
        criteria_id: criteriaId,
        guest_id: localStorage.getItem("guest_id"),
      };

      this.setState({
        listDecision: [...this.state.listDecision, updatedData],
      });
    }
  };

  handleValidation = () => {
    const { listDecision } = this.state;
    var validForm = true;

    if (listDecision.length < 30) {
      validForm = false;
      this.setState({
        errors: "This Field is required",
      });
    }

    return validForm;
  };

  handleSendKuesioner = async () => {
    const { listDecision } = this.state;

    if (this.handleValidation()) {
      const data = {
        listDecision: listDecision,
      };
      const response = await criteriaService.sendKuesioner(data);

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        this.setState({
          isPassion: true,
        });
      }
    }
  };

  render() {
    const { listCriteria, listPoint, listDecision, isPassion, errors } =
      this.state;
    console.log(
      "🚀 ~ file: KuesionerPage.jsx:59 ~ KuesionerPage ~ render ~ listDecision:",
      listDecision
    );

    return (
      <div>
        {isPassion && <Navigate to="/passion" />}
        <div>
          <NavBar />
        </div>

        <div className="mt-5">
          <Container>
            <h3>
              Pilih Sesuai dengan perilaku yang di tunjukkan oleh anak anda
            </h3>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Perilaku Anak</th>
                    <th>Keyakinan Atas Perilaku</th>
                  </tr>
                </thead>
                <tbody>
                  {listCriteria.map((data, index) => (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>
                        {" "}
                        <Form.Group className="mb-3">
                          <Form.Select
                            aria-label="Default select example"
                            name="point"
                            onChange={(event) =>
                              this.handleSelectData(data.id, event)
                            }
                          >
                            <option value="">-- Pilih --</option>
                            {listPoint.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Text className="text-danger">{errors}</Form.Text>
                        </Form.Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex align-items-end justify-content-end">
                <Button onClick={this.handleSendKuesioner}>
                  Tentukan Passion Anak
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }
}
