// Import module
import Script from 'next/script';
import initMap from './map';
import Modal, { setDisplayModal, setModalContent, setModalWidth } from './modal';
import AddData, { setFile } from './addData';
import DataPanel from './dataPanel';
import AnalysisPage from './analysisPage';

// Main function
export default function App(){
	return (
		<div 
			style={{ width: '100%', height: '100vh' }}
		>

			<Modal />

			<div 
				style={{ height: '100%', width: '100%', display: 'flex', flexDirection:'column' }}
			>

				<Header />
				<Main />
				<Footer />

				<Script 
					src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
					integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
					crossOrigin=""
					onLoad={() => {
						// Initiate application state
						initMap('map');
					}}
				/>

			</div>
		</div>
	)
}

// Header
function Header(){
	return (
		<div className="frame" id="header">
				Browser GIS
		</div>	
	)
}

// Footer
function Footer(){
	return (
		<div className="frame" id="footer">
				Contact me
		</div>	
	)
}

// Main application box
function Main(){
	return (
		<div className="application">
			<LeftPanel />
			<View />
			<RightPanel />
		</div>	
	)
}

// Left panel box
function LeftPanel(){
	function addDataPanel(){
		setDisplayModal('flex');
		setModalContent(<AddData />);
		setModalWidth('15%');
	}

	return (
		<div id='leftPanel' className="panel">
			<button className='action' onClick={addDataPanel}>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '2%' }}>
					<div className='symbol' id='plus'>
						&#43;
					</div>
					<div>
						Add data
					</div>
				</div>
			</button>

			<DataPanel />
		</div>	
	)
}

// View panel
function View(){
	return (
		<div id='map'
			onDrop={async (e) => {
				e.preventDefault();
				setFile(e.dataTransfer.files[0]);
			}}
			onDragOver={e => e.preventDefault()}
		>
		</div>
	)
}

// Right panel box
function RightPanel(){
	return (
		<div id='rightPanel' className="panel">
			<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
				Analysis Tools
			</div>
			<AnalysisPage />
		</div>	
	)
}