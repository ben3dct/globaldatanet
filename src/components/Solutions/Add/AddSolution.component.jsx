/** @format */

import * as React from "react";

import "./AddSolution.styles.scss";
import { TextField } from "../../input/TextInput.component";
import { MultiSelect } from "../../input/MultiSelect.component";
import { useNavigate } from "react-router-dom";
import { services, iac_tools } from "./options";
import { API } from "aws-amplify";
import { createSolution } from "../../../graphql/mutations";
const defaultFields = {
	title: "",
	description: "",
	repository: "",
	generalization: "",
	owner: "",
	iac: [{}],
	services: [{}],
};

export const AddSolution = (props) => {
	const { user } = props;
	const navigate = useNavigate();
	const [fields, setFields] = React.useState(defaultFields);
	React.useEffect(() => {
		setFields({ ...fields, owner: user?.attributes?.name });
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		API.graphql({
			query: createSolution,
			variables: {
				input: {
					title: fields.title,
					repo: fields.repository,
					services: fields.services,
					iac: fields.iac,
					attachments: [],
					description: fields.description,
					generalization: fields.generalization,
					category: [],
				},
			},
		}).then(() => navigate("/solutions"));
	};

	return (
		<div className='add-solutions-container'>
			<form
				className='add-form'
				onSubmit={handleSubmit}>
				<TextField
					title='Title'
					type='text'
					required={true}
					setFields={setFields}
					fields={fields}
					placeholder='Enter a title for your solution.'
				/>
				<TextField
					title='Description'
					type='text'
					required={false}
					setFields={setFields}
					fields={fields}
					placeholder='Enter a description for your solution.'
				/>
				<TextField
					title='Repository'
					type='text'
					required={false}
					setFields={setFields}
					fields={fields}
					placeholder='Provide link to github repository if applicable.'
				/>
				<TextField
					title='Generalization'
					type='text'
					required={false}
					setFields={setFields}
					fields={fields}
					placeholder='Provide useful information to generalize this solution if not already generalized.'
				/>
				<TextField
					title='Owner'
					type='text'
					required={true}
					setFields={setFields}
					fields={fields}
					placeholder='Enter the email address of the solutions owner.'
				/>
				<MultiSelect
					title='IaC Tools'
					placeholder='Select IaC Tools.'
					setFields={setFields}
					fields={fields}
					options={iac_tools}
				/>
				<MultiSelect
					title='IaC'
					placeholder='Select IaC Tools.'
					setFields={setFields}
					fields={fields}
					options={iac_tools}
				/>
				<MultiSelect
					title='Services'
					placeholder='Select any noteworthy AWS services.'
					setFields={setFields}
					fields={fields}
					options={services}
				/>
				<button
					className='add-solution-submit'
					type='submit'>
					Add Solution
				</button>
				<button
					className='abort-solution-submit'
					onClick={() => setFields(defaultFields)}>
					Reset Fields
				</button>
			</form>
		</div>
	);
};
