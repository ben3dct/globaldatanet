/** @format */
import "./App.scss";
import { useEffect, useState } from "react";
import { AuthPage } from "./pages/auth/Auth";

import { Route, Routes, useNavigate } from "react-router-dom";

import { Amplify, Auth, Hub, API } from "aws-amplify";
import awsConfig from "./aws-exports";
import { Layout } from "./components/Layout/Layout.component";
import { List } from "./components/Solutions/List.component";
import { AddSolution } from "./components/Solutions/Add/AddSolution.component";
import { EditSolution } from "./components/Solutions/Edit/EditSolution.component";
import { listSolutions, getSolution } from "./graphql/queries";
const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === "[::1]" ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(",");

const [localRedirectSignOut, productionRedirectSignOut] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
	...awsConfig,
	oauth: {
		...awsConfig.oauth,
		redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
		redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
	},
};

Amplify.configure(updatedAwsConfig);

function App() {
	const [user, setUser] = useState(null);
	const [editing, setEditing] = useState(null);
	const [solutions, setSolutions] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		console.log(user);
	}, [user]);
	useEffect(() => {
		getSolutions();
	}, []);
	useEffect(() => {
		Hub.listen("auth", ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
				case "signIn":
				case "cognitoHostedUI":
					getUser().then((userData) => setUser(userData));
					navigate("/solutions");
					break;
				case "signOut":
					setUser(null);
					break;
				case "signIn_failure":
				case "cognitoHostedUI_failure":
					console.log("Sign in failure", data);
					break;
			}
		});

		getUser().then((userData) => setUser(userData));
	}, []);

	function getUser() {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => navigate("/auth"));
	}

	const getSolutions = async () => {
		const allSolutions = await API.graphql({
			query: listSolutions,
		});
		setSolutions(allSolutions?.data?.listSolutions?.items);
	};

	return (
		<div className='main-container'>
			<Routes>
				<Route
					path='/auth'
					element={<AuthPage user={user} />}
				/>
				<Route
					path='/'
					element={<Layout footerData={solutions.length} />}>
					<Route
						path='solutions'
						element={
							<List
								allSolutions={solutions}
								setEditing={setEditing}
							/>
						}
					/>
					<Route
						path='add'
						element={<AddSolution user={user} />}
					/>
					<Route
						path='edit'
						element={<EditSolution />}
					/>
				</Route>
				<Route
					path='*'
					element={<h1>404 Page not found</h1>}
				/>
			</Routes>
		</div>
	);
}

export default App;
