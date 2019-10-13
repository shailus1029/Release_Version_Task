import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./src/Container/Home/Home.jsx";

export const Routes = props => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);
