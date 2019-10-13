import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import Layout from "../../Components/Layout/Layout.jsx";

class Home extends Component {
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}
export default withRouter(Home);
