// Import module
import { useState } from "react";

// Export
let displayModal;
export let setDisplayModal = (value) => displayModal = value;
let modalContent;
export let setModalContent = (value) => modalContent = value;
let modalWidth;
export let setModalWidth = (value) => modalWidth = value;

// Export main components
export default function Modal(props){
	[displayModal, setDisplayModal] = useState('none');
	[modalContent, setModalContent] = useState(null);
	[modalWidth, setModalWidth] = useState('40%');

	return (
		<div className="modal" style={{ display: displayModal }}>
			<div className="modal-content" style={{ width: modalWidth, display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<div style={{ alignSelf: 'flex-end', fontWeight: 'bold', fontSize: 'large', color: 'grey' }}>
					<a onClick={() => setDisplayModal('none')} style={{ cursor: 'pointer' }}>
						&#10005;
					</a>
				</div>
				{modalContent}
			</div>
		</div>
	)
}