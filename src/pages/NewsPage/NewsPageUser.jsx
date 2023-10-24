import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import newsService from "../../services/newsService";

export default function NewsPageUser() {
  const [detailNews, setDetailNews] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getDetailNews = async () => {
    const response = await newsService.getNewsById(id);

    if (response.success) {
      setDetailNews(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetailNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {loading ? (
        <h3>Loading Data . . . .</h3>
      ) : (
        <div>
          <Container>
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
              <p>
                {detailNews.isi_berita}
              </p>
            </div>
          </Container>
        </div>
      )}

      <Footer />
    </div>
  );
}
