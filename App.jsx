import React, { Component } from "react";
import { Routes } from "./Routes";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}
export default App;
