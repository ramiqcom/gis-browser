// Import modules
import { buffer, simplify, dissolve, voronoi, concave, convex } from '@turf/turf';

// Export state
let setModalContent;
let setDisplayModal;
let dataList;
export const setDataList = (value) => dataList = value;
export const setModalPanelAnalysis = (value, display) => {
	setModalContent = value;
	setDisplayModal = display;
};

// Analysis page
export default function AnalysisPage(){

	const analysisList = [
		{ name: 'Buffer' },
		{ name: 'Simplify' },
		{ name: 'Dissolve' },
	];

	return (
		<div className="dataBlock" style={{ height: '100%', overflow: 'auto', gap: '5px' }}>
			{
				analysisList.map((dict, index) => {
					return (
						<div style={{ display: 'flex', flexDirection: 'column' }} key={index} >
							<button style={{ height: '100%' }}>
								{dict.name}
							</button>
						</div>
					)
				})
			}
		</div>
	)
}

// Analysis modal components
function AnalysisBox (props) {
	return (
		<div className="section">

		</div>	
	)
}