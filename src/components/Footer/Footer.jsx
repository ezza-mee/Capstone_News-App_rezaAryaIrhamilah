const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-6 mt-10 font-sans">
			<div className="container mx-auto text-center">
				{/* Copyright */}
				<p className="text-sm">© {new Date().getFullYear()} NewsApp. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
