/** @format */

import "./Footer.styles.scss";

import * as React from "react";

export const Footer = (props) => {
	const { num } = props;
	return <div className='footer-container'>Solutons: {num ? num : "unknown"}</div>;
};
