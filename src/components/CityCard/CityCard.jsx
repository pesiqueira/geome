import React from 'react';
import './CityCard.css'

export default function CityCard(props) {
    const urlIcon = `http://openweathermap.org/img/wn/${props.cityInformations.weather[0].icon}.png`
    const convertKevinToCelsius = (K)=>{
        return (K-273.15).toFixed(1);
    }
    return Object.keys(props).length !== 0 && props.constructor === Object?(
        <div className="card" style={{width: "100%"}}>
            <div className="card-body">
                <div className="card-title row">
                    <h5 className="col-9">
                        {props.cityInformations.name}
                    </h5>
                    <img src={urlIcon} alt={props.cityInformations.weather[0].description}></img>
                </div>
                <p className="card-text">
                    Temperature: {props.cityInformations&&
                                    props.cityInformations.main&&
                                    convertKevinToCelsius(props.cityInformations.main.temp)}° <br/>
                    Min ({props.cityInformations&&
                            props.cityInformations.main&&
                            convertKevinToCelsius(props.cityInformations.main.temp_min)}°)
                    / Max ({props.cityInformations&&
                            props.cityInformations.main&&
                            convertKevinToCelsius(props.cityInformations.main.temp_max)}°)
                </p>
            </div>
        </div>
    ):<h5>No cities found</h5>
}