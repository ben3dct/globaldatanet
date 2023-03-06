/** @format */

import "./Footer.styles.scss";

import * as React from "react";

export const Footer = (props) => {
	const { num } = props;
	return <div className='footer-container'>
		<div className="left">Solutions: {num? `${num}` : "unknown"}</div>
		<div className="center"></div>
		<div className="right"></div>
	</div>;
};
