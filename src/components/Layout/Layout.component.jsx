/** @format */

import "./Layout.styles.scss";

import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar.component";
import { Footer } from "../Footer/Footer.component";
export const Layout = (props) => {
	const { footerData, user } = props;
	return (
		<div className='layout'>
			<div className='header'>
				<Navbar />
			</div>
			<div className='content'>
				<Outlet />
			</div>
			<div className='footer'>
				<Footer num={footerData} user={user}/>
			</div>
		</div>
	);
};
