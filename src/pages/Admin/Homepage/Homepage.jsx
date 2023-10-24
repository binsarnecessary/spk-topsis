import React, { Component } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/Sidebar";
import { ListMenuAdmin } from "../../../components/ListMenuAdmin";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: true,
      name: localStorage.getItem('name'),
    };
  }

  handleShowSidebar = () => {
    const { isSidebarActive } = this.state;

    if (isSidebarActive) {
      this.setState({
        isSidebarActive: false,
      });
    } else {
      this.setState({
        isSidebarActive: true,
      });
    }
  };

  render() {
    const { isSidebarActive, name } = this.state;

    return (
      <div>
        <div className="wrapper">
          {isSidebarActive ? <SideBar /> : <></>}
          <div className="main">
            <NavbarAdmin handleShowSidebar={this.handleShowSidebar} />
            <div style={{marginBottom: "400px", marginLeft: "30px"}} className="mt-4">
              <h2>Selamat Datang {name}</h2>
              <h5>Dashboard Admin</h5>
              <ListMenuAdmin />
            </div>
            <Footer />
          </div>
        </div>

       
      </div>
    );
  }
}
