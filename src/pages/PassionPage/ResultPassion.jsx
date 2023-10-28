import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import alternativeService from "../../services/alternativeService";
import topsisService from "../../services/topsisService";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";

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
      passion: matchingAlternative ? matchingAlternative : false,
    });
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
      });
    }
  };

  render() {
    const {
      resultTopsis,
      passion,
      listMatrix,
      listNormalizedMatrix,
      listAlternative,
      listType,
      listNormalizedBobot,
      aPositif,
      aNegatif,
      distanceToAp,
      distanceToAn,
      finalResult,
      topsisScores,
    } = this.state;
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
                  Berdasarkan Perhitungan Menggunakan Metode Topsis Maka Anak
                  Anda memiliki Passion{" "}
                  <Link to={"/news/" + passion.id}>
                    <b>{passion.name}</b>
                  </Link>{" "}
                  dengan bobot perhitungan paling cocok{" "}
                  <b>{resultTopsis.topsisScore}</b>{" "}
                </h4>
              </div>
              <div className="mt-3 mb-5 text-center">
                <h5>{passion.description}</h5>
              </div>
              <h3 className="mb-3 mt-4">Perhitungan Topsis</h3>
              <div id="Nilai Keputusan Alternative setiap kriteria">
                <h5
                  style={{ marginTop: "20px", marginLeft: "30px" }}
                  className="fw-bold"
                >
                  Nilai keputusan alternative setiap kriteria
                </h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th rowSpan={2}>Alternative</th>
                      <th colSpan={5}>Criteria</th>
                    </tr>
                    <tr>
                      <th>C1</th>
                      <th>C2</th>
                      <th>C3</th>
                      <th>C4</th>
                      <th>C5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Isi data alternative dan kriteria disini */}
                    {listMatrix.map((rowMap, index) => (
                      <tr key={index}>
                        <td>Alternative {index + 1}</td>
                        {rowMap.map((cell, index) => (
                          <td key={index}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div id="Matrix Ternormalisasi">
                <h5
                  style={{ marginTop: "50px", marginLeft: "30px" }}
                  className="fw-bold"
                >
                  Matrix Ternormalisasi
                </h5>
                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>Rumus Matrix Ternormalisasi</p>
                  <p>
                    X<sub>ij</sub> / &radic;(&sum;<sub>i=1</sub>
                    <sup>n</sup> (X<sub>ij</sub>
                    <sup>2</sup>))
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      X<sub>ij</sub> adalah nilai Alternative i pada Criteria j.
                    </li>
                    <li>n adalah jumlah Alternative.</li>
                  </ul>
                </div>

                <table className="table text-center">
                  <thead>
                    <tr>
                      <th rowSpan={2}>Alternative</th>
                      <th colSpan={5}>Criteria</th>
                    </tr>
                    <tr>
                      {listType.map((data, index) => (
                        <th>
                          C{index + 1} <br />({data})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Isi data alternative dan kriteria disini */}
                    {listNormalizedMatrix.map((rowMap, index) => (
                      <tr key={index}>
                        <td>{listAlternative[index].name}</td>
                        {rowMap.map((cell, index) => (
                          <td key={index}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div id="bobot" style={{ marginTop: "50px" }}>
                <h4 className="fw-bold">
                  Bobot Preferensi Pakar : (5, 3, 4, 2, 2)
                </h4>
              </div>

              <div id="Matrix Ternormalisasi Terbobot">
                <h5
                  style={{ marginTop: "50px", marginLeft: "30px" }}
                  className="fw-bold"
                >
                  Matrix Ternormalisasi Terbobot
                </h5>
                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>Rumus Matrix Ternormalisasi Terbobot</p>
                  <p>
                    (X<sub>ij</sub> / &radic;(&sum;<sub>i=1</sub>
                    <sup>n</sup> (X<sub>ij</sub>
                    <sup>2</sup>))) * W<sub>j</sub>
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      X<sub>ij</sub> adalah nilai Alternative i pada Criteria j.
                    </li>
                    <li>n adalah jumlah Alternative.</li>
                    <li>
                      W<sub>j</sub> adalah bobot (weight) untuk Criteria j.
                    </li>
                  </ul>
                </div>
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th rowSpan={2}>Alternative</th>
                      <th colSpan={5}>Criteria</th>
                    </tr>
                    <tr>
                      {listType.map((data, index) => (
                        <th>
                          C{index + 1} <br />({data})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Isi data alternative dan kriteria disini */}
                    {listNormalizedBobot.map((rowMap, index) => (
                      <tr key={index}>
                        <td>{listAlternative[index].name}</td>
                        {rowMap.map((cell, index) => (
                          <td key={index}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "50px" }} id="Solusi Ideal Positif">
                <h5 style={{ marginLeft: "30px" }} className="fw-bold">
                  Solusi Ideal Positif
                </h5>

                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>Rumus Solusi Ideal Positif</p>
                  <p>Solusi Ideal Positif : (A+)</p>
                  <p>
                    Benefit Criteria: Max (Y<sub>j</sub>) for j = 1 to m
                  </p>
                  <p>
                    Cost Criteria: Min (Y<sub>j</sub>) for j = 1 to m
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      Y<sub>j</sub> adalah nilai hasil terbobot untuk Criteria
                      j.
                    </li>
                    <li>m adalah jumlah kriteria.</li>
                  </ul>
                </div>

                {listType.map((rowMap, indexAwal) => (
                  <div className="d-flex justify-content-center">
                    <p key={indexAwal} style={{ margin: "0 10px" }}>
                      {" "}
                      Y{indexAwal + 1} =
                      {rowMap === "cost" ? " Min {" : " Max {"}
                    </p>
                    {listNormalizedBobot.map((cell, indexAkhir) => (
                      <p key={indexAkhir} style={{ margin: "0 10px" }}>
                        ({listNormalizedBobot[indexAkhir][indexAwal]})
                      </p>
                    ))}
                    <p>{"}"}</p>
                  </div>
                ))}

                <div className="d-flex justify-content-center">
                  <h4 className="fw-bold">A+ =</h4>

                  {aPositif.map((rowMap, index) => (
                    <h4 style={{ margin: "0 10px" }} key={index}>
                      {rowMap}
                    </h4>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "50px" }} id="Solusi Ideal Negatif">
                <h5 style={{ marginLeft: "30px" }} className="fw-bold">
                  Solusi Ideal Negatif
                </h5>

                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>Rumus Solusi Ideal Negatif</p>
                  <p>Solusi Ideal Positif : (A-)</p>
                  <p>
                    Benefit Criteria: Min (Y<sub>j</sub>) for j = 1 to m
                  </p>
                  <p>
                    Cost Criteria: Max (Y<sub>j</sub>) for j = 1 to m
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      Y<sub>j</sub> adalah nilai hasil terbobot untuk Criteria
                      j.
                    </li>
                    <li>m adalah jumlah kriteria.</li>
                  </ul>
                </div>

                {listType.map((rowMap, indexAwal) => (
                  <div className="d-flex justify-content-center">
                    <p key={indexAwal} style={{ margin: "0 10px" }}>
                      {" "}
                      Y{indexAwal + 1} =
                      {rowMap === "cost" ? " Max {" : " Min {"}
                    </p>
                    {listNormalizedBobot.map((cell, indexAkhir) => (
                      <p key={indexAkhir} style={{ margin: "0 10px" }}>
                        ({listNormalizedBobot[indexAkhir][indexAwal]})
                      </p>
                    ))}
                    <p>{"}"}</p>
                  </div>
                ))}

                <div className="d-flex justify-content-center">
                  <h4 className="fw-bold">A- =</h4>

                  {aNegatif.map((rowMap, index) => (
                    <h4 style={{ margin: "0 10px" }} key={index}>
                      {rowMap}
                    </h4>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "50px" }} id="Jarak ideal positif">
                <h5 className="fw-bold" style={{ marginLeft: "30px" }}>
                  Jarak Antara Nilai Terbobot setiap alternatif untuk Solusi
                  Ideal Positif
                </h5>

                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>
                    Jarak Antara Nilai Terbobot untuk Solusi Ideal Positif (D
                    <sup>+</sup>):
                  </p>
                  <p>
                    D<sub>i</sub>
                    <sup>+</sup> = &radic;(&sum;<sub>j=1</sub>
                    <sup>m</sup> (W<sub>j</sub> * (X<sub>ij</sub> - A
                    <sup>+</sup>
                    <sub>j</sub>)<sup>2</sup>))
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      D<sub>i</sub>
                      <sup>+</sup> adalah jarak antara Alternative i dengan
                      Solusi Ideal Positif.
                    </li>
                    <li>
                      X<sub>ij</sub> adalah nilai terbobot untuk Alternative i
                      pada Criteria j.
                    </li>
                    <li>
                      A<sup>+</sup>
                      <sub>j</sub> adalah nilai Solusi Ideal Positif untuk
                      Criteria j.
                    </li>
                    <li>
                      W<sub>j</sub> adalah bobot (weight) untuk Criteria j.
                    </li>
                    <li>m adalah jumlah kriteria.</li>
                  </ul>
                </div>

                {distanceToAp.map((data, index) => (
                  <p className="text-center" key={index}>
                    D{index + 1}
                    <sup>+</sup> = {data}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: "50px" }} id="Jarak ideal negatif">
                <h5 className="fw-bold" style={{ marginLeft: "30px" }}>
                  Jarak Antara Nilai Terbobot setiap alternatif untuk Solusi
                  Ideal Negatif
                </h5>

                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>
                    Jarak Antara Nilai Terbobot untuk Solusi Ideal Negatif (D
                    <sup>-</sup>):
                  </p>
                  <p>
                    D<sub>i</sub>
                    <sup>-</sup> = &radic;(&sum;<sub>j=1</sub>
                    <sup>m</sup> (W<sub>j</sub> * (X<sub>ij</sub> - A
                    <sup>-</sup>
                    <sub>j</sub>)<sup>2</sup>))
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      D<sub>i</sub>
                      <sup>-</sup> adalah jarak antara Alternative i dengan
                      Solusi Ideal Negatif.
                    </li>
                    <li>
                      X<sub>ij</sub> adalah nilai terbobot untuk Alternative i
                      pada Criteria j.
                    </li>
                    <li>
                      A<sup>-</sup>
                      <sub>j</sub> adalah nilai Solusi Ideal Negatif untuk
                      Criteria j.
                    </li>
                    <li>
                      W<sub>j</sub> adalah bobot (weight) untuk Criteria j.
                    </li>
                    <li>m adalah jumlah kriteria.</li>
                  </ul>
                </div>

                {distanceToAn.map((data, index) => (
                  <p className="text-center" key={index}>
                    D{index + 1}
                    <sup>-</sup> = {data}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: "50px" }} id="Hasil Topsis">
                <h5 className="fw-bold" style={{ marginLeft: "30px" }}>
                  Kedekatan Setiap Alternatif terhadap solusi Ideal
                </h5>

                <div className="fw-bold" style={{ marginLeft: "50px" }}>
                  <p>
                    Kedekatan Alternatif i terhadap Solusi Ideal (V<sub>i</sub>
                    ):
                  </p>
                  <p>
                    V<sub>i</sub> = D<sub>i</sub>
                    <sup>-</sup> / (D<sub>i</sub>
                    <sup>-</sup> + D<sub>i</sub>
                    <sup>+</sup>)
                  </p>
                  <p>Dimana:</p>
                  <ul>
                    <li>
                      V<sub>i</sub> adalah nilai kedekatan untuk Alternative i
                      terhadap Solusi Ideal.
                    </li>
                    <li>
                      D<sub>i</sub>
                      <sup>-</sup> adalah jarak antara Alternative i dengan
                      Solusi Ideal Negatif (A-).
                    </li>
                    <li>
                      D<sub>i</sub>
                      <sup>+</sup> adalah jarak antara Alternative i dengan
                      Solusi Ideal Positif (A+).
                    </li>
                  </ul>
                </div>

                <div>
                  {topsisScores.map((data, index) => (
                    <p key={index} className="fw-bold text-center">
                      V<sub>{index + 1}</sub> = {data}
                    </p>
                  ))}
                </div>
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
