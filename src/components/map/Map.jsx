import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import SearchCities from '../searchCities/SearchCities.jsx';
 
class MapContainer extends Component {
    state = {
        markerCoordinate: {
            lat:[55.5],
            lng:[37.5],
        },
        center: {
            lat:[],
            lng:[]
        }
    }
    onMapClicked = (mapProps, map, clickEvent)=>{
        this.setState({
            markerCoordinate: {
                lat:clickEvent.latLng.lat(),
                lng:clickEvent.latLng.lng(),
            }, 
            center:{
                lat:map.center.lat(),
                lng:map.center.lng()
            }
        })
    }
    onSearchChange = (lat,lng)=>{
        this.setState({
            markerCoordinate: {
                lat:lat,
                lng:lng
            }, 
            center:{
                lat:lat,
                lng:lng
            }
        })
    }
    render() {
        return (
            <>
                <Map 
                    google={this.props.google} 
                    zoom={4}
                    onClick={this.onMapClicked}
                    center={this.state.center}
                >
                    <Marker 
                        onClick={this.onMarkerClick}
                        position={this.state.markerCoordinate} 
                        name={'Current location'} 
                    />
                </Map>
                <SearchCities mapCoordinate={this.state.markerCoordinate} onSearchChange={this.onSearchChange}></SearchCities>
            </>
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBaEm2oxWoXHfZTla4eCu4ybhcaonw0BQo")
})(MapContainer)