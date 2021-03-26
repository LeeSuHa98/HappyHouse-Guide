import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import apartment from "../Image/apartment.png"

class Main extends Component {
    render() {
        const mapStyle = {
            width: '100%',
            height: '100%',
        };
        
        return (
            <React.Fragment>
                <Map 
                google = {this.props.google}
                zoom = {15}
                style = {mapStyle}
                initialCenter = {{ lat : 37.5, lng: 127 }}>
                <Marker 
                position= {{ lat : 37.5, lng: 127 }}
                icon= {{
                    url: apartment,
                    scaledSize: new this.props.google.maps.Size(40,50),
                }
                }/>
                </Map>
            </React.Fragment>
        );
    }
}


export default GoogleApiWrapper({
    apiKey : "AIzaSyDxfYX5IrTPlsvLlLvM_G4Tyc8JT4QyWno",
})(Main);