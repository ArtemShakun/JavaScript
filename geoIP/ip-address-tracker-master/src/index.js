import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addOffset, addTileLayer, getAddress, valideIP } from "./helpers";
import icon from '../images/icon-location.svg'

const btn = document.querySelector('.search-bar__btn');
const ipInput = document.querySelector('.search-bar__input');
const ipInfo = document.querySelector('.js-ip');
const locationInfo = document.querySelector('.js-location');
const timezoneinfo = document.querySelector('.js-timezone');
const ispInfo = document.querySelector('.js-isp');

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

addTileLayer(map);

function getData() {
    if (valideIP(ipInput.value)) {
        getAddress(ipInput.value)
            .then(setInfo)
    };
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const {lat, lng, country, region, timezone} = mapData.location;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = region + ' ' + country;
    timezoneinfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;
    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);

    if (matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('102.22.22.1').then(setInfo);
})