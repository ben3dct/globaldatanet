/** @format */

import "./Footer.styles.scss";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export const Footer = (props) => {
	const { num, user, viewFooterData, updateGlobalID } = props;
	const navigate = useNavigate();
	const [isViewing, setIsViewing] = React.useState(false);
	const [hideCount, setHideCount] = React.useState(false);

	React.useEffect(() => {
		if (window.location.href.includes("view")) {
			setIsViewing(true);
			setHideCount(false);
			return;
		} else if (window.location.href.includes("edit")) {
			setHideCount(true);
			return;
		}
		setIsViewing(false);
		setHideCount(false);
	}, [window.location.href]);
	React.useEffect(() => {
		updateGlobalID(viewFooterData.id);
	}, [viewFooterData]);

	React.useEffect(() => {
		console.log(viewFooterData);
	}, [viewFooterData]);

	return (
		<div className="footer-container">
			{isViewing ? (
				<>
					{" "}
					<div className="left">
						created {viewFooterData.createdAt}
					</div>
					<div className="center">
						updated {viewFooterData.updatedAt}
					</div>
					<div className="right">
						<button
							className="edit-solution-btn"
							onClick={() => {
								navigate("/edit");
							}}
						>
							Edit
						</button>
					</div>
				</>
			) : (
				<>
					{" "}
					<div className="left">Hello, {user?.attributes?.name}</div>
					<div className="center"></div>
					<div className="right">
						Solutions: {num ? `${num}` : "unknown"}
					</div>
				</>
			)}
		</div>
	);
};
