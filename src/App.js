/** @format */
import "./App.scss";
import { useEffect, useState } from "react";
import { AuthPage } from "./pages/auth/Auth";

import { Route, Routes } from "react-router-dom";

import { Amplify, Auth, Hub } from "aws-amplify";
import awsConfig from "./aws-exports";

import { Layout } from "./components/Layout/Layout.component";
import { List } from "./components/Solutions/List.component";
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

	useEffect(() => {
		Hub.listen("auth", ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
				case "signIn":
				case "cognitoHostedUI":
					getUser().then((userData) => setUser(userData));
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
			.catch(() => console.log("Not signed in"));
	}

	return (
		<div className='main-container'>
			<Routes>
				<Route
					path='/auth'
					element={<AuthPage user={user} />}
				/>
				<Route
					path='/'
					element={<Layout />}>
					<Route
						path='solutions'
						element={<List />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
