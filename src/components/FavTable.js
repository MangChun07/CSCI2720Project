/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

import React from 'react';
import ObjectList from 'react-object-list';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class FavTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
        this.delFav = this.delFav.bind(this);
        axios.get(this.props.port + "/api/favoriteLists/getfav").then((res) => {
            if (res.data.success) {
              this.setState({ data: res.data.data });
            }
        }); 
    }

    delFav(e){
        axios.put(this.props.port + "/api/favoriteLists/delfav",{
            favouriteID: e.target.id
        })
        .then((res)=>{
            axios.get(this.props.port + "/api/favoriteLists/getfav").then((res) => {
                if (res.data.success) {
                  this.setState({ data: res.data.data });
                }
            }); 
         });
    }

    render() {
        const {data} = this.state;

        const columns = [{
                Header: 'Name',
                accessor: 'locationName', // String-based value accessors!
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["locationName"] }),
                filterAll: true
            }, {
                Header: 'Address',
                accessor: 'address',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["address"] }),
                filterAll: true,
                id: "address",
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            },{
                Header: "Delete",
                accessor: "locationID",
                sortable: false,
                filterable: false,
                Cell: (row) => {
                  return <div>
                    <Button id={row.value} style={{"width": "70%"}} as="input" type="button" variant="danger" value="Delete" onClick={this.delFav}/>
                  </div>
                }
            }]
        
        return(
            <div>
                <h3>Your Favorite Location</h3>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                />
            </div>
        )
        
    }
}

export default FavTable;
