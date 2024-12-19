import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-4 py-2 rounded shadow-lg z-50`}>{message}</div>;
};

Notification.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['success', 'error']).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Notification;
