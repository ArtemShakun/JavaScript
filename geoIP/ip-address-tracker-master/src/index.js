import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addTileLayer, valideIP } from "./helpers";
import icon from '../images/icon-location.svg'

const btn = document.querySelector('.search-bar__btn');
const ipInput = document.querySelector('.search-bar__input');

const ipInfo = document.querySelector('.js-ip');
const locationInfo = document.querySelector('.js-location');
const timezoneinfo = document.querySelector('.js-timezone');
const ispInfo = document.querySelector('.js-isp')

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const mapArea = document.querySelector('.map');

const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [20, 30]
});

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);
addTileLayer(map);

function getData() {
    if (valideIP(ipInput.value)) {
        const  url = `https://geo.ipify.org/api/v2/country?apiKey=at_Umvcq7wErxarKGCNsAHGqgWKHrSTo&ipAddress=${ipInput.value}`;
        fetch(url)
        .then(response => response.json())
        .then(setInfo)
    };
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.region + ' ' + mapData.location.country;
    timezoneinfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;
}