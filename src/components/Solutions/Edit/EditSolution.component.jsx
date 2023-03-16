/** @format */
/** @format */

import * as React from "react";
import { API } from "aws-amplify";
import { listSolutions, getSolution } from "../../../graphql/queries";
import "./Edit.styles.scss";
import { updateSolution, deleteSolution } from "../../../graphql/mutations";
import { TextField } from "../../input/TextInput.component";
import { MultiSelect } from "../../input/MultiSelect.component";
import {MSCustom} from './MSCustom.component';
import { BsInfoSquareFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
const categories = [
	{ value: "GOVERNANCE", label: "GOVERNANCE" },
	{ value: "DEVOPS", label: "DEVOPS" },
	{ value: "CONTAINERS", label: "CONTAINERS" },
	{ value: "SERVERLESS", label: "SERVERLESS" },
	{ value: "MIGRATION", label: "MIGRATION" },
	{ value: "NETWORKING", label: "NETWORKING" },
	{ value: "SECURITY", label: "SECURITY" },
	{ value: "STORAGE", label: "STORAGE" },
];
const services = [
	{ value: "ec2", label: "ec2" },
	{ value: "ec2cs", label: "ec2cs" },
	{ value: "eb", label: "eb" },
	{ value: "lambda", label: "lambda" },
	{ value: "ecr", label: "ecr" },
	{ value: "ecs", label: "ecs" },
	{ value: "eks", label: "eks" },
	{ value: "copilot", label: "copilot" },
];
const iac_tools = [
	{ value: "terraform", label: "terraform" },
	{ value: "cloudformation", label: "cloudformation" },
	{ value: "kubernetes", label: "kubernetes" },
];
export const languages = [
	{ value: "py", label: "py" },
	{ value: "ts", label: "ts" },
	{ value: "js", label: "js" },
];

export const EditSolution = (props) => {
	const { user, viewing, globalID } = props;
	const [solutionData, setSolutionData] = React.useState({});
	const [catParsed, setCatParsed] = React.useState([]);
	const [servicesParsed, setServicesParsed] = React.useState();
	const [IaCParsed, setIaCParsed] = React.useState();
	const [langParsed, setLangParsed] = React.useState();
	const [defaultTextFields, setDefaultTextFields] = React.useState({
		title: "",
		description: "",
		repository: "",
		generalization: "",
		owner: "",
		iac: [{}],
		services: [{}],
		category: [{}],
		language: [{}],
	});
	const navigate = useNavigate();
	// Get a specific item
	async function getData(strID) {
			const oneSolution = await API.graphql({
			query: getSolution,
			variables: { id: strID }
		});
		setSolutionData(oneSolution.data.getSolution);
	}
	
	React.useEffect(() => {
		if(!globalID) {
			return;
		}
		getData(globalID);
	}, [globalID]);
	
		console.log(solutionData);
		const parseSelectData = () => {
			let selectArr = [];
			if(solutionData.category?.length) {			
			for(let x = 0; x < solutionData.category.length; x++) {
				selectArr.push({value: solutionData.category[x], label: solutionData.category[x]});
			}
			setCatParsed(selectArr);
			
			let serviceArr = [];
			for(let x = 0; x < solutionData.services.length; x++) {
				serviceArr.push({value: solutionData.services[x], label: solutionData.services[x]});
			}
			setServicesParsed(serviceArr);

			let iacArr = [];
			for(let x = 0; x < solutionData.iac.length; x++) {
				iacArr.push({value: solutionData.iac[x], label: solutionData.iac[x]});
			}
			setIaCParsed(iacArr);
			let langArr = [];
			for(let x = 0; x < solutionData.language.length; x++) {
				langArr.push({value: solutionData.language[x], label: solutionData.language[x]});
			}
			setLangParsed(langArr);
		}
		}
	
		React.useEffect(() => {
			console.log(catParsed);
		}, [catParsed])
	React.useEffect(() => {
		parseSelectData();
		setDefaultTextFields({
			title: solutionData.title,
			description: solutionData.description,
			repository: solutionData.repo,
			generalization: solutionData.generalization,
			owner: solutionData.owner,
			iac: solutionData.iac,
			services: solutionData.services,
			category: solutionData.category,
			language: solutionData.language,
		});
	}, [solutionData]);


	React.useEffect(() => {
		console.log(defaultTextFields);
	}, [defaultTextFields])

	const onSubmit = async (e) => {
		// update solution 
		e.preventDefault();
		let categoryArray = [];
		for(let x = 0; x < catParsed.length; x++) {
			categoryArray.push(catParsed[x].value);
		}
		let servicesArray = [];
		for(let x = 0; x < servicesParsed.length; x++) {
			servicesArray.push(servicesParsed[x].value);
		}
		let iacArray = [];
		for(let x = 0; x < IaCParsed.length; x++) {
			iacArray.push(IaCParsed[x].value);
		}
		let langArray = [];
		for(let x = 0; x < langParsed.length; x++) {
			langArray.push(langParsed[x].value);
		}
		const updatedSolution = await API.graphql({
			query: updateSolution,
			variables: {
				input: {
				"id": globalID,
				"title": defaultTextFields.title,
				"repo": defaultTextFields.repository,
				 "services": servicesArray,
				 "iac": iacArray,
				// "Features": [],
				"description": defaultTextFields.description,
				"generalization": defaultTextFields.generalization,
				 "category": categoryArray,
				"owner": defaultTextFields.owner,
				"language": langArray
				// "Attachements": []
			}
			}
		});
		navigate("/solutions");
	}

	const deleteSolutionFunc = async () => {
		const deletedSolution = await API.graphql({
			query: deleteSolution,
			variables: {
				input: {
					id: globalID
				}
			}
		});
		console.log(deletedSolution)
		navigate("/solutions");
	}

	React.useEffect(() => {console.log(catParsed)}, [catParsed])
	return (
		<div className='add-solutions-container'>
		<form onSubmit={onSubmit}>
			<TextField fields={defaultTextFields} setFields={setDefaultTextFields} title="Title"></TextField>
			<TextField fields={defaultTextFields} setFields={setDefaultTextFields} title="Description"></TextField>
			<TextField fields={defaultTextFields} setFields={setDefaultTextFields}  title="Repository"></TextField>
			<TextField fields={defaultTextFields} setFields={setDefaultTextFields} title="Owner"></TextField>
			<TextField fields={defaultTextFields} setFields={setDefaultTextFields} title="Generalization"></TextField>
			<MSCustom options={services} fields={servicesParsed} setFields={setServicesParsed} title="Services"></MSCustom>
			<MSCustom options={languages} fields={langParsed} setFields={setLangParsed} title="Language"></MSCustom>
			<MSCustom options={categories} setFields={setCatParsed} fields={catParsed} title="Category"></MSCustom>
			<MSCustom options={iac_tools} fields={IaCParsed} setFields={setIaCParsed} title="IaC"></MSCustom>
			<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 'auto',
        },
      }}
    >
      <Paper elevation={2} sx={{padding: '10px', cursor: "help"}}>
		<div className="info-box">
		<div className="info-box-heading">
		<BsInfoSquareFill size={20} />
			<span className="heading-span">Features/Attachments</span>
			
		</div>
		<span className="body-text">
		For the time being, to add or edit solution features/attachments, please re-create the solution and then delete the old instance.
			
		</span>
		</div>
		
	  </Paper>
    </Box>
			<div className="btn-edit-group">
			<button type="submit" className="edit-btn" onClick={onSubmit}>Apply Changes</button>
			<button type="submit" className="edit-btn delete" onClick={deleteSolutionFunc}>Delete Solution</button>
			</div>
			
		</form>
		</div>
	);
};
