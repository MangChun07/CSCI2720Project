import React from 'react';

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

        };
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <TopBar>
                    </TopBar>
                    <div style={{"padding-bottom": "56px"}}></div>
                    <ResTable>
                    </ResTable>
                    <GoogleMap>
                    </GoogleMap>
                    <FavTable>
                    </FavTable>
                </div>
            </React.Fragment>
        )
    }
}

export default MainPage;
