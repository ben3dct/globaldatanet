/** @format */

import "./AddSolution.styles.scss";
import Chip from "@mui/material/Chip";
import * as React from "react";

export const FeatureBox = (props) => {
	const { features } = props;
	return (
		<div className='feature-box'>
			<div className='feature-box-heading'>Features</div>
			<div className='feature-box-feature-list'>
				{features.length > 0 ? (
					features.map((feature) => {
						return <Chip label={feature.name} />;
					})
				) : (
					<span>No features have been added to your Solution yet.</span>
				)}
			</div>
		</div>
	);
};
