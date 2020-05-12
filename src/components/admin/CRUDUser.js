import React from "react";
import axios from "axios";

import { Card, Button, Modal, Table, Form } from "react-bootstrap";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userID: null,
      username: null,
      password: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({
      show: true,
    });
  }

  usernameChange(e) {
    this.setState({ username: e.target.value });
  }
  passwordChange(e) {
    this.setState({ password: e.target.value });
  }
  createUser() {
    axios
      .post("/api/admins/createUser", {
        userID: this.state.userID,
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Success!");
          this.setState({
            show: false,
            userID: null,
            username: null,
            password: null,
          });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="warning" onClick={this.handleShow}>
          Create User +
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.username}
                  onChange={this.usernameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={this.state.password}
                  onChange={this.passwordChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.createUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userID: null,
      username: null,
      password: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    const user = this.props.onClick(null);
    this.setState({
      userID: user.userID,
      username: user.username,
      password: user.password,
      show: true,
    });
  }

  usernameChange(e) {
    this.setState({ username: e.target.value });
  }
  passwordChange(e) {
    this.setState({ password: e.target.value });
  }
  updateUser() {
    axios
      .put("/api/admins/updateUser", {
        userID: this.state.userID,
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Success!");
          this.setState({
            show: false,
            userID: null,
            username: null,
            password: null,
          });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="outline-dark" size="sm" onClick={this.handleShow}>
          edit
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.state.username}
                  onChange={this.usernameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={this.state.password}
                  onChange={this.passwordChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.updateUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      user: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ user: this.props.onClick(null), show: true });
  }
  deleteUser() {
    axios
      .delete(`/api/admins/deleteUser/${this.state.user.userID}`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Success!");
          this.setState({ show: false });
          this.setState({ user: undefined });
          this.props.refresh(null);
        }
      });
  }
  render() {
    return (
      <div>
        <Button variant="outline-danger" size="sm" onClick={this.handleShow}>
          delete
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation of Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete this user? This process cannot go back once
            it start.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.deleteUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class CRUDUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };

    axios.get("/api/admins/readUser").then((res) => {
      if (res.data.success) {
        this.setState({ user: res.data.data });
      }
    });

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    axios.get("/api/admins/readUser").then((res) => {
      if (res.data.success) {
        this.setState({ user: res.data.data });
      }
    });
  }

  render() {
    return (
      <div>
        <Card style={{ width: "100%" }}>
          <Card.Title>User</Card.Title>
          <CreateUser refresh={this.refresh} />
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.user.map((user, i) => (
                  <tr key={i}>
                    <td>{user.userID}</td>
                    <td>{user.username}</td>
                    <td>********(hashed password)</td>
                    <td>
                      <EditUser
                        onClick={() => {
                          return user;
                        }}
                        refresh={this.refresh}
                      />
                      <br />
                      <DeleteUser
                        onClick={() => {
                          return user;
                        }}
                        refresh={this.refresh}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CRUDUser;