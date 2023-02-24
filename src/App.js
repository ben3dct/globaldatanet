/** @format */

import "./App.css";

import * as React from "react";

import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
	const [uset, setUser] = React.useState(null);
	React.useEffect(() => {
		const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
			// eslint-disable-next-line default-case
			switch (event) {
				case "signIn":
					setUser(data);
					break;
				case "signOut":
					setUser(data);
					break;
			}
		});

		Auth.currentAuthenticatedUser()
			.then((currentUser) => setUser(currentUser))
			.catch(() => console.log("not signed in"));

		return unsubscribe;
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
					sign in with google
				</button>
			</header>
		</div>
	);
}

export default App;
