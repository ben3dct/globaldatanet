/** @format */

import * as React from "react";

import "./AddSolution.styles.scss";
import { TextField } from "../../input/TextInput.component";
import { MultiSelect } from "../../input/MultiSelect.component";
import { useNavigate } from "react-router-dom";
import { services, iac_tools, categories, status, languages } from "./options";
import { FeatureBox } from "./FeatureBox.component";
import { API } from "aws-amplify";
import { createSolution, createFeature } from "../../../graphql/mutations";

const defaultFields = {
	title: "",
	description: "",
	repository: "",
	generalization: "",
	owner: "",
	iac: [{}],
	services: [{}],
	category: [{}],
	language: [{}],
};
const defaultFeatureFields = {
	name: "",
	status: "",
	assignee: "",
};
export const AddSolution = (props) => {
	const { user } = props;
	const navigate = useNavigate();
	const [fields, setFields] = React.useState(defaultFields);
	const [featureFields, setFeatureFields] = React.useState(defaultFeatureFields);
	const [features, setFeatures] = React.useState([]);

	React.useEffect(() => {
		setFields({ ...fields, owner: user?.attributes?.name });
	}, [user]);

	const addFeature = () => {
		setFeatures([...features, featureFields]);
		setFeatureFields(defaultFeatureFields);
	};
	React.useEffect(() => {
		console.log(features);
	}, [features]);
	React.useEffect(() => {
		console.log(featureFields);
	}, [featureFields]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let categories = [];
		for (let x = 0; x < fields.category.length; x++) {
			categories.push(fields.category[x].value);
		}
		let languages = [];
		for (let x = 0; x < fields.language.length; x++) {
			languages.push(fields.language[x].value);
		}
		let service = [];
		for (let x = 0; x < fields.services.length; x++) {
			service.push(fields.services[x].value);
		}
		API.graphql({
			query: createSolution,
			variables: {
				input: {
					title: fields.title,
					repo: fields.repository,
					services: service,
					iac: fields.iac.value,
					attachments: [],
					description: fields.description,
					generalization: fields.generalization,
					category: categories,
					language: languages,
					owner: fields.owner,
				},
			},
		}).then(async (res) => {
			console.log(res);
			for (let x = 0; x < features.length; x++) {
				await API.graphql({
					query: createFeature,
					variables: {
						input: {
							solutionID: res.data.createSolution.id,
							name: features[x].name,
							status: features[x].status.value,
							assignee: features[x].assignee,
						},
					},
				});
			}
			navigate("/solutions");
		});
	};

	return (
		<div className='add-solutions-container'>
			<form
				className='add-form'
				onSubmit={handleSubmit}>
				<h1>General Information</h1>
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
				<MultiSelect
					title='Category'
					placeholder='Select categories.'
					setFields={setFields}
					fields={fields}
					options={categories}
				/>
				<MultiSelect
					title='language'
					placeholder='Select languages.'
					setFields={setFields}
					fields={fields}
					options={languages}
				/>
				<h1>Add Features</h1>
				<TextField
					title='Name'
					type='text'
					required={false}
					setFields={setFeatureFields}
					fields={featureFields}
					placeholder='Enter the email address of the solutions owner.'
				/>
				<TextField
					title='Assignee'
					type='text'
					required={false}
					setFields={setFeatureFields}
					fields={featureFields}
					placeholder='Enter the email address of the solutions owner.'
				/>
				<MultiSelect
					title='Status'
					isMulti={false}
					placeholder='Select the status of the feature.'
					setFields={setFeatureFields}
					fields={featureFields}
					options={status}
				/>
				<FeatureBox features={features} />

				<button
					className='add-feature-submit'
					type='button'
					onClick={addFeature}>
					Add Feature
				</button>
				<button
					className='add-solution-submit'
					type='submit'>
					Add Solution
				</button>
				<button
					className='abort-solution-submit'
					type='button'
					onClick={() => setFields(defaultFields)}>
					Reset Fields
				</button>
				<button
					className='remove-feature-submit'
					type='button'
					onClick={() => setFeatures([])}>
					Remove All Features
				</button>
			</form>
		</div>
	);
};
