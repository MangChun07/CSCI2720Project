/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import TopBar from '../components/TopBar.js';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import imageNotFound from "../assets/img/imageNotFound.png";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from "../components/GoogleMap";
import CommentsContainer from "../components/CommentsContainer";

class LocPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            locID: window.location.href.substring((window.location.href.indexOf("loc")+4)),
            username: "",
            data: {},
            notFav: true,
        };
        this.addtofavorite = this.addtofavorite.bind(this);
        this.delFav = this.delFav.bind(this);
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

        axios({
            method: 'post',
            url: this.props.port + '/api/locations/loc/'+this.state.locID,
            data: {locID: this.state.locID}
        })
        .then((res) => {
            if(res.data.success){
                if (res.data.data == null){
                    this.setState({
                        data: {
                            locationName: "404 Not Found",
                            photo: "../assets/img/imageNotFound.png",
                            address: "",
                            phoneNum: "",
                            rating: "",
                            latitude: "",
                            longitude: ""
                          },
                    }); 
                }
                else {
                    this.setState({
                        data: res.data.data
                    });  
                }
            }
            else {
                alert("ERROR");
                window.location = this.props.port + "/#/";
            }
        });

        axios.post(this.props.port + "/api/favoriteLists/checkfav",{
            favouriteID: this.state.locID
        })
        .then((res)=>{
            this.setState({
                notFav: res.data.notFav
            });
        });
    }

    addtofavorite=(loc)=>{
        console.log('addTofav')
        console.log(loc) // this should be the location, but i cant check it.

        // I cant test the code below because of 404, can someone check check. Thanks!
        axios.put(this.props.port + "/api/favoriteLists/addfav",{
            favouriteID: loc.locationID
        })
        .then((res)=>{
            if (res.data.success) {
                    this.setState({
                    notFav: false
                });
            }
         });
    }
    
    delFav=(loc)=>{
        console.log('delfav');
        console.log(loc) // this should be the location, but i cant check it.
        // I cant test the code below because of 404, can someone check check. Thanks!
        axios.put(this.props.port + "/api/favoriteLists/delfav",{
            favouriteID: loc.locationID
        })
        .then((res)=>{
            if (res.data.success) {
                this.setState({
                   notFav: true
                    });
                }
         });
    }
    
    render() {
        let loc = this.state.data;
        console.log(loc);
        console.log([loc.latitude, loc.longitude]);
        return(
            <div>
            <Row>
                <Col>
                    <TopBar port={this.props.port} logined={true} username={this.state.username}/>
                </Col>
            </Row>
            <Container>
                <Card style={{ width: '100%' }}>
                    <Card.Img variant="top" style={{ width: '100%', height: '300px', "object-fit": "cover"}} src={loc.photo} />
                    <Card.Body>
                        <Card.Title>{loc.locationName}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Rating name="rating"
                                value={parseInt(loc.rating)}
                                precision={0.5}
                                readOnly
                            />
                        </ListGroupItem>
                        <ListGroupItem>Phone Number: {loc.phoneNum}</ListGroupItem>
                    </ListGroup>
                    { this.state.notFav ?
                        <Button id={loc.locationID} as="input" type="button" variant="success" value="Add favorite" onClick={() => this.addtofavorite(loc)}/>
                        :
                        <Button id={loc.locationID} as="input" type="button" variant="danger" value="Delete favorite" onClick={() => this.delFav(loc)}/>
                    }
                    <Card.Body style={{ height: '400px' }}>
                        {loc.address}
                        <GoogleMap showOne={true} locationdetail={this.state.data}/>
                    </Card.Body>
                </Card>
                <CommentsContainer port={this.props.port} locID={this.state.locID}/>
            </Container>
            </div>
        )
    }
}

export default LocPage;
