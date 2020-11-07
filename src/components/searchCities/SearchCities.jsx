import React, { Component } from 'react';
import CityCard from '../CityCard/CityCard';
import './SearchCities.css';


export default class SearchCities extends Component {
    state={

    }
    render() {
        return(
            <div id="searchContainer">
                <strong>Search for cities</strong>
                <input id="search" type="text"/>
                <CityCard></CityCard>
            </div>
        )
    }
}