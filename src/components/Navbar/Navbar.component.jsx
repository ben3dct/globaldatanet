/** @format */
import "./Navbar.styles.scss";
import * as React from "react";

export const Navbar = (props) => {
	var byteArray = new Uint8Array(4);

	byteArray[0] = "dashboard";
	byteArray[1] = "add";
	byteArray[2] = "edit";
	byteArray[3] = "view";

	/* 
		0 - Dashboard
		1 - 
	
	*/
	return (
		<div className='navbar-container'>
			<div className='nav-left'>
				<h1>Solution Catalogue</h1>
			</div>
			<div className='nav-center'>{/* <h1>ABC ABC</h1> */}</div>
			<div className='nav-right'>
				<button className='logout-btn'>log out</button>
				<button className='add-solution-btn'>add solution</button>
			</div>
			x
		</div>
	);
};
