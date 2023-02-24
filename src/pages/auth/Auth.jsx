/** @format */

import * as React from "react";
import "./Auth.styles.scss";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { LogoSection, GoogleSignInSection } from "./components/Auth.components";
export const AuthPage = (props) => {
	return (
		<div className='auth-container'>
			<div className='auth-container-item'>
				<LogoSection
					onClick={() => {
						window.open("https://globaldatanet.com/");
					}}
				/>
			</div>
			<div className='auth-container-item google-sec'>
				<GoogleSignInSection
					onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
				/>
			</div>
		</div>
	);
};
