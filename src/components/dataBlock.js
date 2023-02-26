// Import modules
import { useState } from "react";
import Checkbox from "./checkbox";
import { colorList } from "./color";
import FeaturesTable from '../components/featuresTable';

// Export state
export let setModalContent;
export let setDisplayModal;
export let setModalWidth;
export const setModalPanel = (value, display, width) => {
	setModalContent = value;
	setDisplayModal = display;
	setModalWidth = width;
}

// Modular components
export default function DataBlock(props){
	// Data leaflet
	const data = props.data;
	const geojson = props.geojson;
	const Map = props.map;

	// Color
	const [color, setColor] = useState(props.color);

	// Set color display
	const [colorDisplay, setColorDisplay] = useState('none');

	return (
		<div className="dataBlock" style={{ flexDirection: 'row',  justifyContent: 'space-between' }}
		>
			<div>
				<Checkbox onChange={props.onChange}/>
			</div>

			<div>
				Name: {props.name}
			</div>

			<div 
				style={{ textAlign: 'center', cursor: 'pointer', justifyContent: 'center', display: 'flex', verticalAlign: 'center' }}
				onClick={() => {
					setDisplayModal('flex');
					setModalContent(<FeaturesTable data={geojson} name={props.name} map={Map} />);
					setModalWidth('60%');
				}}
			>
				<div>
					&#9776;
				</div>
			</div>

			<div 
				style={{ backgroundColor: color, width: '10%', border: '0.5px solid gray', cursor: 'pointer' }} 
				onClick={() => colorDisplay == 'none' ? setColorDisplay('flex') : null}
			>
				<div 
					className="dataBlock" 
					style={{ backgroundColor: 'white', padding: '10%', gap: '5px', display: colorDisplay }}
				>
					{
						colorList.map((color, index) => 
							<div 
								style={{ backgroundColor: color, width: '100%', height: '20px', cursor: 'pointer', border: '0.1px solid grey' }} 
								color={color}
								key={index}
								onClick={() => {
									data.setStyle({ color: color });
									setColor(color);
									setColorDisplay('none');
								}}
							/>
						)
					}
				</div>
			</div>

		</div>
	)
}