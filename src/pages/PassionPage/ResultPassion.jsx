import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import alternativeService from "../../services/alternativeService";
import topsisService from "../../services/topsisService";

export default class ResultPassion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listAlternative: [],
      resultTopsis: {},
      passion: "",
    };

    this.interval = null; // Inisialisasi variabel interval
  }

  componentDidMount = () => {
    this.handleGetResultTopsis();

    // Atur interval untuk merender halaman setiap 5 detik
    this.interval = setInterval(this.handleGetResultTopsis, 5000);
  };

  componentWillUnmount() {
    // Membersihkan interval saat komponen dibongkar
    clearInterval(this.interval);
  }

  handleGetAlternative = async () => {
    const response = await alternativeService.getAlternative();

    if (response.success) {
      this.setState({
        listAlternative: response.data,
      });
    }
  };

  handleGetResultTopsis = async () => {
    const id = localStorage.getItem("guest_id");

    const response = await topsisService.getResultTopsis(id);

    if (response.success) {
      this.setState(
        {
          resultTopsis: response.data,
        },
        () => {
          this.handleGetAlternative();
          this.handleGetPassion();
        }
      );
    }
  };

  handleGetPassion = () => {
    const { listAlternative, resultTopsis } = this.state;

    const resultId = resultTopsis.id;
    const resultIdStr = resultId.toString();

    // Periksa apakah resultTopsis.id cocok dengan salah satu alternatif di listAlternative
    const matchingAlternative = listAlternative.find(
      (alternative) => alternative.id === resultIdStr
    );
    this.setState({
      passion: matchingAlternative ? matchingAlternative.name : false
    });
  };

  render() {
    const { resultTopsis, passion } = this.state;

    return (
      <div>
        <NavBar />
        <Container className="mt-5">
          <h3>Hasil Analisis</h3>

          {passion ? (
            <div className="mt-5 text-center">
              <h4>
                Berdasarkan Perhitungan Menggunakan Metode Topsis Maka Anak Anda
                memiliki Passion {passion} dengan bobot perhitungan paling cocok{" "}
                {resultTopsis.topsisScore}
                {" "}
              </h4>
            </div>
          ) : (
            <h4>Loading . . . .</h4>
          )}

          <Row className="mt-5">
            <Col>
              <Button>Homepage</Button>
            </Col>
            <Col lg={6}></Col>
            <Col>
              <Button variant="success">Cetak Laporan Perhitungan</Button>
            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    );
  }
}
