import axios from 'axios';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
export default class SearchPlaceSearch {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    generateUrl(place){
        return proxyurl + `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${this.apiKey}`
    }
    async getPlaces(place){
        const URL = this.generateUrl(place);
        return new Promise((resolve, reject) => {
            axios.get(URL).then(resolve).catch(reject);
        })
    }
}