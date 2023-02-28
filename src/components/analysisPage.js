// Import modules
import { useState } from 'react';
import Select from 'react-select';
import { updateMap } from './addData';
import color from './color';
import { setDisplayModal, setModalContent, setModalWidth } from './modal';
import { dataList } from './addData';
import Buffer from './analysis/buffer';

// Export state
let layer;
let setLayer;

// Analysis page
export default function AnalysisPage(){
	const analysisList = [
		{ name: 'Buffer', panel: <Buffer /> }
	];

	return (
		<div className="dataBlock" style={{ height: '100%', overflow: 'auto', gap: '5px' }}>
			{
				analysisList.map((dict, index) => {
					return (
						<div style={{ display: 'flex', flexDirection: 'column' }} key={index} >
							<button style={{ height: '100%' }} onClick={() => openAnalysis(dict.panel)}>
								{dict.name}
							</button>
						</div>
					)
				})
			}
		</div>
	)
}

// File select
export function SelectData (props) {
	[layer, setLayer] = useState(null);

	return (
		<div>
			<Select 
				options={dataList}
				value={layer}
				onChange={event => {
					setLayer(event);
					props.onChange(event);
				}}
			/>
		</div>	
	)
}

// Function to add result to map
export function addResult(props){
	props.palette = color();
	props.layer = L.geoJSON(props.value, { style: { color: props.palette, fillColor: props.palette } });
	props.type = 'vector';
	updateMap(props);
}

// Function to open modal
function openAnalysis(components){
	setModalContent(components);
	setModalWidth('15%')
	setDisplayModal('flex');
}