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
				<div className='description'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
					dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
					ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
					mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
					laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
					velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
					in culpa qui officia deserunt mollit anim id est laborum.
				</div>
			</div>
		</div>
	);
};

export const Columns = () => {
	return (
		<div className='solution-list-columns'>
			<div className='row-group-md'>
				<div className='title'>Title</div>
				<div className='author'>Author</div>
				<div className='category'>Category</div>
			</div>
			<div className='row-group-lg'>
				<div className='description'>Description</div>
			</div>
		</div>
	);
};
