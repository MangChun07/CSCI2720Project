/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from "react";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";

//Other Component:
import LoginContainer from "../components/LoginContainer.js"

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: this.props.port+'/api/users/checkLogin',
    })
    .then((res) => {
      if(res.data.status == "logined"){
        window.location = this.props.port+"/#/MainPage";
      }
    });
  }

  render(){
    return(
    <React.Fragment>
      <Navbar bg="light" expand="lg" className="shawdow navBar">
        <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
      </Navbar>
      <LoginContainer port={this.props.port}/>
    </React.Fragment>
  );
  }
};

export default LoginPage;
