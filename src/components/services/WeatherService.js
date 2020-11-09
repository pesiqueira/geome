import axios from 'axios';
export default class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    generateUrl(lat, lon, cnt){
        return `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}${cnt&&`&cnt=${cnt}`}&appid=${this.apiKey}`
    }
    async getWeatherCity(lat,lon){
        const URL = this.generateUrl(lat, lon,15);
        return new Promise((resolve, reject)=>{
            axios.get(URL).then(resolve).catch(reject);
        })
    }
}