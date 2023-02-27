// Import module
import { useState } from 'react';
import Select from 'react-select';
import tj from '@mapbox/togeojson';
import { centroid, area, toWgs84 } from '@turf/turf';
import shp from 'shpjs';
import DataBlock from '../components/dataBlock';
import { render } from 'react-dom';
import color from '../components/color.js';
import { Grid } from 'gridjs-react';

// Export state
let type;
let format;
let input;
let file;
let data;
let dataName;
let Map;
let DataPanel;
const dataList = [];
export const setMap = (valueMap, valuePanel) => {
	// Set map
	Map = valueMap;
	// Set data render panel
	DataPanel = valuePanel;
};

// Add data section
export default function AddData(){
	const [addDisabled, setAddDisabled] = useState(true);
	const [urlDisplay, setUrlDisplay] = useState('none');
	const [uploadDisplay, setUploadDisplay] = useState('none');

	// Options for vector
	const vector = [
		{ value: 'shp', label: 'Shapefile (zip)' },
		{ value: 'geojson', label: 'GeoJSON' },
		{ value: 'kml', label: 'KML' }
	];

	const raster = [
		{ value: 'tiff', label: 'GeoTIFF' },
	];

	return (
		<div className="section">
			<Select 
				options={[ { label: 'URL', value: 'url' }, { label: 'Upload file', value: 'upload' } ]}
				placeholder='Select input'
				onChange={(e) => {
					setUrlDisplay('none');
					setUploadDisplay('none');
					input = e.value;
					e.value == 'upload' ? setUploadDisplay('flex') : setUrlDisplay('flex');
				}}
			/>

			<input 
				type='url'
				style={{ display: urlDisplay }}
				onChange={ async (event) => {
					// URL
					const url = event.target.value;

					if (isValidUrl(url)) {	
						// Get file format
						const splitName = url.split('.');
						format = splitName[splitName.length - 1];
						const splitName2 = splitName[splitName.length - 2].split('/');
						dataName = splitName2[splitName.length - 1];

						// MIME
						let mime;
						switch (format) {
							case 'json':
							case 'geojson':
								mime = 'application/json';
								break;
							case 'kml':
							case 'kmz':
								mime = 'application/xml';
								break;
							case 'zip':
								mime = 'application/x-compressed-zip'
								break;
						}
						
						// Options
						const options = {
							method: 'POST',
							body: JSON.stringify({ url, mime }),
							headers: {
								'Content-Type': 'application/json',
							}
						}

						// Fetch data from url
						try {
							const response = await fetch('api/url', options);
							const result = await response.text();
							const response64 = await fetch(`data:${mime};base64,${result}`);
							file = await response64.blob();
						} catch (err){
							alert(err);
						}

						// Enable button to add file to map
						setAddDisabled(false)
						
					} else {
						setAddDisabled(true)
					}

				}}
			/>

			<input 
				type="file"
				style={{ display: uploadDisplay }}
				accept={'.zip, .geojson, .json, .kml, .kmz'}
				onChange={(event) => {
					const files = event.target.files;
					files.length ? setAddDisabled(false) : setAddDisabled(true);
					file = files[0];

					const splitName = file.name.split('.');
					format = splitName[splitName.length - 1];
					dataName = splitName[0];
				}}
			/>

			<button className='action' disabled={addDisabled} onClick={ async () => {
				// Convert file to geojson
				await dataConvert();

				// Set data projection
				if (format != 'tiff'){
					area(data) < 0 ? data = toWgs84(data) : null;
				}

				// Add data to map
				await addDataToMap();
			}}>
				Add data to map
			</button>

		</div>
	)
}

async function dataConvert(){
	// Condiitonal for data parsing
	switch (format) {
		case 'json':
		case 'geojson':
			// Parse geojson
			data = JSON.parse(await file.text());
			type = 'vector';
			break;
		case 'kml':
		case 'kmz':
			// Convert kml to geojson
			data = tj.kml(new DOMParser().parseFromString(await file.text(), 'application/xml'));
			type = 'vector';
			break;
		case 'zip':
			// Convert shp to geojson
			console.log(file);
			data = await shp(await file.arrayBuffer());
			type = 'vector';
			break;

		/*
		case 'tiff':
			data = await file.arrayBuffer();
			console.log(data)
			break;
		*/
	}
}

// Function to check url
function isValidUrl (urlString) {
	try { 
		return Boolean(new URL(urlString)); 
	}
	catch(e){ 
		return false; 
	}
}

// Export data to map function
async function addDataToMap() {
	// Get random color
	const palette = color();

	// Conditional on how to add data to map
	let layer;
	switch (type) {
		case 'vector':
			if (data.features[0].geometry.type == 'Point') {
				layer = L.geoJSON(data, { pointToLayer: (feature, latlng) => L.circleMarker(latlng, { color: palette }) })
			} else {
				layer = L.geoJSON(data, { style: { color: palette } })
			}

			// Add pop up to each feature
			layer.bindPopup((layer) => {
				const properties = layer.feature.properties;
				const keys = Object.keys(properties);
				const arrTable = keys.map((key) => [key, properties[key]]);

				const div = document.createElement('div');
				const grid = <Grid
					data={arrTable}
					columns={['Properties', 'Values']}
					height={'50%'}
					width={300}
					fixedHeader={true}
				/>
				
				// Render the react to html
				render(grid, div);

				// Return the div
				return div;

			}, { maxWidth: 1000 });

			break;

		/*
		case 'raster':
			const options = {
				sourceFunction: GeoTIFF.fromArrayBuffer,
				arrayBuffer: data,
				onError: (err) => console.log(err),
				blockSize: 65536,
			};
			layer = L.leafletGeotiff(null, options);
			break;
		*/
	}

	// Push to list
	dataList.push({ data: layer, type: type, name: dataName });

	// Add layer to map
	layer.addTo(Map);

	// Data block
	const div = document.createElement('div');
	const block = <DataBlock 
		name={dataName} 
		type={type} 
		container={div} 
		color={palette}
		data={layer}
		geojson={data}
		map={Map}
		onChange={(event) => event.target.checked ? layer.setStyle({ opacity: 1, fillOpacity: 0.2 }) : layer.setStyle({ opacity: 0, fillOpacity: 0 }) }
	/>
	render(block, DataPanel.appendChild(div));

	// Zoom to the first object
	if (dataList.length == 1) {
		const coord = centroid(data).geometry.coordinates;
		Map.flyTo([coord[1], coord[0]], 10, { animate: true });
	}
}