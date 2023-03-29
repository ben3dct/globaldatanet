import * as React from "react";
import "./ListBox.styles.scss";
const ListBox = (props) => {
	const { mapArray } = props;
	let array = Object.keys(mapArray);
	console.log(mapArray);
	return (
		<div className="main-contents-box">
			{array.map((property, index) => {
				let isRepo = property == "repo" ? true : false;
				return (
					<div className="property-value-row">
						<div className="property">{property}</div>
						{isRepo ? (
							<div className="value">
								<a
									target="_blank"
									href={`${mapArray[property]}`}
								>
									link
								</a>
							</div>
						) : (
							<div className="value">{mapArray[property]}</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
export default ListBox;
