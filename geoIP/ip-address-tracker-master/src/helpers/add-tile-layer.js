import L from 'leaflet';

const TOKEN_MAP = 'pk.eyJ1IjoiYXJ0ZW1zaGFrdW4iLCJhIjoiY2t6NnI4OG5iMDdtdDJvbXgzZjdpOGUyYSJ9.D2F3HQh700PaKzw_eAgCBA';

export function addTileLayer(map) {
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN_MAP}`, {
        attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/ArtemShakun/JavaScript">Artem Shakun</a>.',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
}