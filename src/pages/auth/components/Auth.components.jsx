/** @format */

import "./Component.styles.scss";
import * as React from "react";

export const LogoSection = ({ onClick }) => {
	return (
		<div
			className='section-p'
			onClick={onClick}>
			<div className='mobile-container'>
				<GoogleSignInSection />
			</div>
			<div className='logo-section'>
				<div className='gdn-logo' />
				<h1 className='sc-auth-branding'>
					globaldatanet <br /> Solution Catalogue
				</h1>
			</div>
		</div>
	);
};

export const GoogleSignInSection = ({ onClick }) => {
	return (
		<div
			className='section-p'
			onClick={onClick}>
			<div className='google-container'>
				<div className='google-logo'></div>
				<h1 className='google'>Sign in with Google</h1>
			</div>
		</div>
	);
};
