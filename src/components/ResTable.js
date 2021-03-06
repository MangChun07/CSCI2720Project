/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from 'react';
import axios from "axios";
import imageNotFound from "../assets/img/imageNotFound.png";
import { Card, Button, Modal, Table, Form } from "react-bootstrap";
import matchSorter from "match-sorter";
import Rating from '@material-ui/lab/Rating';
import {GrFavorite} from 'react-icons/fa';
// Import React Table
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class ResTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    axios.get(this.props.port+"/api/admins/readLocation").then((res) => {
      if (res.data.success) {
        this.setState({ data: res.data.data });
      }
    });
    this.viewLoc = this.viewLoc.bind(this);
  }

  viewLoc(e){
    window.location = this.props.port+ "/#/loc/"+e.target.id;
  }

  render() {
    const {data} = this.state;
    return (
      <div>
      <ReactTable
        data={data}
        filterable
        columns={[
          {
            Header: "Photo",
            accessor: "photo",
            sortable: false,
            filterable: false,
            Cell: (row) => {
              if(row.value == "") return <div style={{ "text-align": "center" }}><img height={"100px"} src={imageNotFound}/></div>
              return <div style={{ "text-align": "center" }}><img height={"100px"} src={row.value}/></div>
            }
          },
          {
            Header: "Name",
            accessor: "locationName",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["locationName"] }),
            filterAll: true
          },
          {
            Header: "Address",
            accessor: "address",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["address"] }),
            filterAll: true,
            id: "address"
          },
          {
            Header: "Rating",
            accessor: "rating",
            id: "rating",
            Cell: (row) => {
              return <Rating
                name="hover-feedback"
                value={row.value}
                precision={0.5}
                readOnly
              />
            }
          },
          {
            Header: "Info",
            accessor: "locationID",
            sortable: false,
            filterable: false,
            Cell: (row) => {
              return <div>
                <Button id={row.value} style={{"width": "70%"}} as="input" type="button" variant="info" value="Info" onClick={this.viewLoc}/>
              </div>
            }
          },
        ]}
        defaultPageSize={5}
      />
      </div>
    );
  }
}

export default ResTable;
