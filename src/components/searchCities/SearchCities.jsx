import React, { Component } from 'react';
import CityCard from '../CityCard/CityCard.jsx';
import WeatherService from '../services/WeatherService.js';
import SearchPlaceService from "../services/SearchPlaceService.js";
import './SearchCities.css';


export default class SearchCities extends Component {
    clearState = () =>{
        this.setState({
            lat: this.props.mapCoordinate.lat,
            lon: this.props.mapCoordinate.lng,
            search:'',
            cities:[],
            citiesCards:[],
            isLoading: false
        })
    }
    state = {
        lat: this.props.mapCoordinate.lat,
        lon: this.props.mapCoordinate.lng,
        search:'',
        cities:[],
        citiesCards:[],
        isLoading: false
    }

    // weatherService = new WeatherService('0f6bf931ff9c19b1ac4a5806e1a4513c');
    // searchService = new SearchPlaceService('AIzaSyBaEm2oxWoXHfZTla4eCu4ybhcaonw0BQo');
    weatherService = new WeatherService(process.env.REACT_APP_WEATHER_SERVICE_KEY);
    searchService = new SearchPlaceService(process.env.REACT_APP_GOOGLE_SERVICE_KEY);

    setLoading=(isLoading)=>{
        this.setState({isLoading:isLoading});
    }
    Loading= (<h4>Loading...</h4>);

    updateCards = ()=>{
        this.setLoading(true);
        let lat = this.props.mapCoordinate.lat;
        let lon = this.props.mapCoordinate.lng;
        this.weatherService.getWeatherCity(lat,lon).then(({data})=> {
            let list = [...new Set(data.list)];
            if(data.message==='no results')
                return 
            this.setState({
                cities:list,
                citiesCards: list.map((city,i) => <CityCard key={i} cityInformations={city}></CityCard>)
            })
        })
        .catch(err => {
            this.setState({
                citiesCards: [(<CityCard></CityCard>)]
            });
        })
        .finally(() => {
            this.setLoading(false);
        })
    }

    delayTimer;
    onSearchChange = (e)=>{
        this.setLoading(true);
        this.setState({search: e.target.value});
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(()=>{
            this.searchService.getPlaces(this.state.search).then(({data})=>{
                let res = data.results;
                let mainResult = res[0];
                this.setState({
                    lat:[mainResult&&mainResult.geometry&&mainResult.geometry.location&&mainResult.geometry.location.lat],
                    lon:[mainResult&&mainResult.geometry&&mainResult.geometry.location&&mainResult.geometry.location.lng]
                });
                this.props.onSearchChange(mainResult.geometry.location.lat, mainResult.geometry.location.lng);
                this.updateCards();
            })
            .catch(err => err)
            .finally(() => {
                this.setLoading(false);
            });
        }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
    }

    onSearchKeyDown = (e)=>{
        if (e.key === 'Enter') {
            this.onSearchChange(e);
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.mapCoordinate.lat!==prevProps.mapCoordinate.lat
            &&this.props.mapCoordinate.lng!==prevProps.mapCoordinate.lng){
            this.setState({
                lat:this.props.mapCoordinate.lat,
                lon:this.props.mapCoordinate.lng
            })
            this.updateCards()
        }
     }

    render() {
        return(
            <div id="searchContainer">
                <div id="search">
                    <strong>Search for cities</strong>
                    <input value={this.state.search} type="text" onKeyDown={this.onSearchKeyDown} onChange={this.onSearchChange}/>
                </div>
                <div id="cardsContainer">
                    <span id="clear" onClick={this.clearState}>Clear Search</span>
                    {this.state.isLoading?this.Loading:this.state.citiesCards}
                </div>
            </div>
        )
    }
}