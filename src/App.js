import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import Homepage from "./pages/Admin/Homepage/Homepage";
import KuesionerPage from "./pages/KuesionerPage/KuesionerPage";
import ProfilPakar from "./pages/ProfilPakarPage/ProfilPakar";
import NewsPage from "./pages/Admin/News/NewsPage";
import NewsPageUser from "./pages/NewsPage/NewsPageUser";
import ResultPassion from "./pages/PassionPage/ResultPassion";
import HistoryUser from "./pages/Admin/HistoryUser/HistoryUser";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          -- User
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/passion" element={<ResultPassion />} />
          <Route exact path="/kuesioner-spk" element={<KuesionerPage />} />
          <Route exact path="/profil-pakar" element={<ProfilPakar />} />
          <Route exact path="/news/:id" element={<NewsPageUser />} />
          -- Admin
          <Route exact path="/admin" element={<Homepage />} />
          <Route exact path="/admin-news" element={<NewsPage />} />
          <Route exact path="/admin-history" element={<HistoryUser />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
