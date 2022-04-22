import React, { useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';

const CustomModal = ({
	title,
	children,
	action,
	onDismiss,
	showModal,
	size,
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(showModal);
	}, [showModal]);

	return (
		<Modal
			size={size}
			show={show}
			onHide={onDismiss}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<button type='button' className='btn btn-warning' onClick={onDismiss}>
					<i className='fa-solid fa-xmark'></i> Cancel
				</button>
				{action}
			</Modal.Footer>
		</Modal>
	);
};

export default CustomModal;
