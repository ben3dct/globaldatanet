/** @format */

import "./Layout.styles.scss";

import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar.component";
import { Footer } from "../Footer/Footer.component";
export const Layout = (props) => {
	const { footerData } = props;
	return (
		<div className='layout'>
			<div className='header'>
				<Navbar />
			</div>
			<div className='content'>
				<Outlet />
			</div>
			<div className='footer'>
				<Footer num={footerData} />
			</div>
		</div>
	);
};
