import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
 
class MapContainer extends Component {
    state = {
        markerCoordinate: {
            lat:[26.4950121],
            lng:[-124.001447]
        }
    }
    onMapClicked = (mapProps, map, clickEvent)=>{
        this.setState({
            markerCoordinate: {
                lat:clickEvent.latLng.lat(),
                lng:clickEvent.latLng.lng(),
            }
        })

    }
    render() {
        return (
        <Map 
            google={this.props.google} 
            zoom={4}
            onClick={this.onMapClicked}
        >
            <Marker 
                onClick={this.onMarkerClick}
                position={this.state.markerCoordinate} 
                name={'Current location'} 
            />
        </Map>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBaEm2oxWoXHfZTla4eCu4ybhcaonw0BQo")
})(MapContainer)