/** @format */

import * as React from "react";
import "./Table.styles.scss";

export const Row = ({ id }) => {
	return (
		<div
			key={id}
			className='solution-list-row'>
			<div className='row-group-md'>
				<div className='title'>Hello</div>
				<div className='author'>TEst</div>
				<div className='category'>abc</div>
			</div>
			<div className='row-group-lg'>
				<div className='description'>desc</div>
			</div>
		</div>
	);
};
