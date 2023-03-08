/** @format */

import "./Footer.styles.scss";

import * as React from "react";

export const Footer = (props) => {
	const { num, user } = props;
	return <div className='footer-container'>
		<div className="left">Hello, {user?.attributes?.name}</div>
		<div className="center"></div>
		<div className="right">Solutions: {num? `${num}` : "unknown"}</div>
	</div>;
};
