// ** Global Variables ** //

// Map state
export let Map;
export const setMap = (value) => Map = value;
export let Tile
export const setTile = (value) => Tile = value;

// ** Global Variables ** //

export default function init(id){
	Map = L.map(id, 
		{ 
			center: { lat: -7.7, lng: 110.39 } ,
			zoom: 10
		}
	);

	Tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(Map);
}