/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";

const PageNavbar = () => {
  return(
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#">FoodRoundCU</Navbar.Brand>
      <Nav className="mr-auto">
      </Nav>
      <Button>Login / Sign Up</Button>
  </Navbar>
  );
}

export default PageNavbar;
