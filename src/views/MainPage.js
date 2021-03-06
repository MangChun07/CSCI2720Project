/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';

import TopBar from '../components/TopBar.js';
import ResTable from '../components/ResTable.js';
import GoogleMap from '../components/GoogleMap.js';
import FavTable from '../components/FavTable.js';
//
// import IndexHeader from "../components/Headers/IndexHeader.js";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          username: ""
        };
    }

    componentDidMount() {
      axios({
        method: 'post',
        url: this.props.port+'/api/users/checkLogin',
      })
      .then((res) => {
        if(res.data.status == "not logined"){
          window.location = this.props.port + "/#/";
        }
        else if (res.data.status == "logined"){
          this.setState({
            username: res.data.username
          });
        }
      });
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <TopBar logined={true} username={this.state.username} port={this.props.port}/>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <ResTable port={this.props.port}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <GoogleMap port={this.props.port}/>
                        </Col>
                        <Col>
                            <FavTable port={this.props.port}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainPage;
