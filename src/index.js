/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import MainPage from "./views/MainPage.js";
import AdminPage from "./views/AdminPage.js";
import LoginPage from "./views/LoginPage.js";
import Navbar from "react-bootstrap/Navbar";
import LocPage from "./views/LocPage.js";
import AboutThisProjectPage from "./views/AboutThisProjectPage.js";


class App extends React.Component{
  constructor(props){ 
    super(props);
    this.state = {
      port: ""
    } 
  }

  render(){
    return(
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={(props) => <LoginPage port={this.state.port} {...props} />} />
            <Route path="/MainPage" render={(props) => <MainPage port={this.state.port} {...props} />} />
            <Route path="/AdminPage" render={(props) => <AdminPage port={this.state.port} {...props} />} />
            <Route path="/loc/:locID" render={(props) => <LocPage port={this.state.port} {...props} />} />
            <Route
                path="/AboutThisProjectPage"
                render={(props) => <AboutThisProjectPage {...props} />}
              />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App/>,document.getElementById("app")
);
