// Import module
import { useState } from 'react';
import Select from 'react-select';
import tj from '@mapbox/togeojson';
import * as turf from '@turf/turf';
import shp from 'shpjs';
import DataBlock from '../components/dataBlock';
import { render } from 'react-dom';
import color from '../components/color.js';
import { Grid } from 'gridjs-react';

// Export state
export let type;
export let format;
let setFormat;
export let file;
export let data;
let Map;
let DataPanel;
export const setMap = (valueMap, valuePanel) => {
	// Set map
	Map = valueMap;

	// Set data render panel
	DataPanel = valuePanel;
};
export const dataList = [];
let dataName;

// Export data to map function
function addDataToMap() {
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
			dataList.push({ data: layer, type: type, name: dataName });

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

		case 'raster':
			break;
	}

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
		const coord = turf.centroid(data).geometry.coordinates;
		Map.flyTo([coord[1], coord[0]], 10, { animate: true });
	}
}

// Add data section
export default function AddData(){
	const dataType = [
		{ value: 'raster', label: 'Image/Raster' },
		{ value: 'vector', label: 'Table/Vector' }
	];

	[format, setFormat] = useState(null);
	const [formatDisabled, setFormatDisabled] = useState(true);
	const [formatOptions, setFormatOptions] = useState(null); 
	const [uploadDisabled, setUploadDisabled] = useState(true);
	const [uploadFormat, setUploadFormat] = useState(null);
	const [addDisabled, setAddDisabled] = useState(true);

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
				options={dataType} 
				placeholder='Select data type'
				onChange={(event) => {
					const value = event.value;
					type = value;

					setFormat(null);
					setUploadDisabled(true);

					value == 'raster' ? setFormatOptions(raster) : setFormatOptions(vector);
					setFormatDisabled(false);
				}}
			/>

			<Select
				value={format}
				options={formatOptions} 
				placeholder='Select format'
				isDisabled={formatDisabled}
				onChange={(event) => {
					setFormat(event);
					const value = event.value;
					format = event.value;

					setUploadDisabled(false);

					switch (value) {
						case 'shp':
							setUploadFormat('.zip');
							break;
						case 'geojson':
							setUploadFormat('.json, .geojson');
							break;
						case 'kml':
							setUploadFormat('.kml, .kmz');
							break;
						case 'tiff':
							setUploadFormat('.geotiff, .tiff, .tif');
							break;
					}
				}}
			/>

			<input 
				type="file"
				disabled={uploadDisabled}
				accept={uploadFormat}
				onChange={(event) => {
					event.target.files.length ? setAddDisabled(false) : setAddDisabled(true);
					file = event.target.files[0];
					dataName = file.name.split('.')[0];
				}}
			/>

			<button className='action' disabled={addDisabled} onClick={ async () => {
				// Condiitonal for data parsing
				switch (format.value) {
					case 'geojson':
						// Parse geojson
						data = JSON.parse(await file.text());
						break;
					case 'kml':
						// Convert kml to geojson
						data = tj.kml(new DOMParser().parseFromString(await file.text(), 'application/xml'));
						break;
					case 'shp':
						// Convert shp to geojson
						data = await shp(await file.arrayBuffer());
						break;
				}

				// Set data projection
				turf.area(data) < 0 ? data = turf.toWgs84(data) : null;

				// Add data to map
				addDataToMap();
			}}>
				Add data to map
			</button>

		</div>
	)
}