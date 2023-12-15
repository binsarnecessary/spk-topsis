import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import alternativeService from "../../services/alternativeService";
import topsisService from "../../services/topsisService";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";
import newsService from "../../services/newsService";

export default class ResultPassion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listAlternative: [],
      resultTopsis: {},
      passion: "",
      listMatrix: [],
      listNormalizedMatrix: [],
      listType: [],
      listNormalizedBobot: [],
      aPositif: [],
      aNegatif: [],
      distanceToAp: [],
      distanceToAn: [],
      finalResult: [], //with id and name topsis
      topsisScores: [],
      name: {},
      detailNews: {},
    };

    this.interval = null; // Inisialisasi variabel interval
  }

  componentDidMount = () => {
    this.handleGetResultTopsis();
    this.handlePrintTopsis();

    // Atur interval untuk merender halaman setiap 5 detik
    this.interval = setInterval(this.handleGetResultTopsis, 5000);
  };

  componentWillUnmount() {
    // Membersihkan interval saat komponen dibongkar
    clearInterval(this.interval);
  }

  handleGetNews = async () => {
    const { passion } = this.state;
    const response = await newsService.getNewsById(passion.id);

    if (response.success) {
      this.setState({
        detailNews: response.data,
      });
    }
  };

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
    this.setState(
      {
        passion: matchingAlternative ? matchingAlternative : false,
      },
      () => this.handleGetNews()
    );
  };

  handlePrintTopsis = async () => {
    const id = localStorage.getItem("guest_id");

    const response = await topsisService.printTopsis(id);

    if (response.success) {
      this.setState({
        listMatrix: response.data.matrix,
        listNormalizedMatrix: response.data.normalizedMatrix,
        listType: response.data.typeAttribut,
        listNormalizedBobot: response.data.normalizedBobot,
        aPositif: response.data.aPositif,
        aNegatif: response.data.aNegatif,
        distanceToAp: response.data.distanceToAp,
        distanceToAn: response.data.distanceToAn,
        finalResult: response.data.finalResult,
        topsisScores: response.data.topsisScores,
        name: response.data.name,
      });
    }
  };

  render() {
    const { resultTopsis, passion, finalResult, name, detailNews } = this.state;
    console.log("🚀 ~ file: ResultPassion.jsx:129 ~ name:", name);
    console.log("🚀 ~ file: ResultPassion.jsx:125 ~ finalResult:", finalResult);

    return (
      <div>
        <NavBar />
        <Container className="mt-5" ref={(el) => (this.componentRef = el)}>
          <h3>Hasil Analisis</h3>

          {passion ? (
            <>
              <div className="mt-5 mb-4 text-center">
                <h4>
                  Berdasarkan Hasil Perhitungan Menggunakan Metode Topsis Maka
                  Ditentukan Bahwa <b>{name}</b> memiliki jenis Passion{" "}
                  <Link to={"/news/" + passion.id}>
                    <b>{passion.name}</b>
                  </Link>{" "}
                  dengan nilai bobot <b>{resultTopsis.topsisScore},</b> telah
                  dinyatakan sebagai pilihan terbaik dari semua alternative
                </h4>
              </div>

              <div className="mt-5">
                <h3>{detailNews.headline}</h3>
                <Row>
                  <Col lg={3}></Col>
                  <Col>
                    <img
                      className="mt-3 mb-4"
                      alt=""
                      src={detailNews.thumbnail}
                      width="600px"
                      height="400px"
                    />
                  </Col>
                  <Col lg={2}></Col>
                </Row>
                <h4>{detailNews.isi_berita}</h4>
              </div>
            </>
          ) : (
            <h4>Loading . . . .</h4>
          )}
        </Container>
        <div className="container">
          <Row className="mt-5">
            <Col>
              <Link to="/">
                <Button>Reset Passion</Button>
              </Link>
            </Col>
            <Col lg={6}></Col>
            <Col>
              <ReactToPrint
                trigger={() => {
                  return <Button variant="success">Cetak Laporan</Button>;
                }}
                content={() => this.componentRef}
                documentTitle="Hasil Analisis"
              />
            </Col>
          </Row>
        </div>

        <Footer />
      </div>
    );
  }
}
