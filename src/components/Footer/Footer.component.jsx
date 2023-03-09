/** @format */

import "./Footer.styles.scss";

import * as React from "react";

export const Footer = (props) => {
	const { num, user, viewFooterData } = props;

	const [isViewing, setIsViewing] = React.useState(false);

	React.useEffect(() => {
		if(window.location.href.includes("view")) {
			setIsViewing(true);
			return;
		} 
		setIsViewing(false);
	}, [window.location.href])

			
			React.useEffect(() => {console.log(viewFooterData)}, [viewFooterData]);
			
	return <div className='footer-container'>
		{isViewing? <> <div className="left">created {viewFooterData.createdAt}</div>
		<div className="center">{viewFooterData.title}</div>
		<div className="right">updated {viewFooterData.updatedAt}</div></>: <> <div className="left">Hello, {user?.attributes?.name}</div>
		<div className="center"></div>
		<div className="right">Solutions: {num? `${num}` : "unknown"}</div></>}
		
	</div>;
};
