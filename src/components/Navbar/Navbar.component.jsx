/** @format */
import "./Navbar.styles.scss";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
export const Navbar = (props) => {
	const navigate = useNavigate();
	const [showBtn, setShowBtn] = React.useState(true);

	/* 
		0 - Dashboard
		1 - 
	
	*/

	React.useEffect(() => {
		if (window.location.href.includes("/add")) {
			setShowBtn(false);
		} else {
			setShowBtn(true);
		}
	}, [window.location.href]);

	const signOut = () => {
		Auth.signOut().then(() => navigate("/auth"));
	};

	return (
		<div className='navbar-container'>
			<div className='nav-left'>
				<h1>Solution Catalogue</h1>
			</div>
			<div className='nav-center'>{showBtn ? null : <h2>Add Solution</h2>}</div>
			<div className='nav-right'>
				<button
					className='logout-btn'
					onClick={signOut}>
					Log Out
				</button>
				{showBtn ? (
					<button
						className='add-solution-btn'
						onClick={() => navigate("/add")}>
						Add Solution
					</button>
				) : (
					<button
						className='add-solution-btn'
						onClick={() => navigate("/solutions")}>
						Abort
					</button>
				)}
			</div>
			x
		</div>
	);
};
