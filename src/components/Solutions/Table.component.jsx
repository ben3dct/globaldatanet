/** @format */

import * as React from "react";
import "./Table.styles.scss";
import Accordion from "@mui/material/Accordion";
import Select from "react-select";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Filters from "../input/filter/Filters.component";
import { categories } from "../Solutions/Add/options";
import { useNavigate } from "react-router-dom";
import { BiNetworkChart, BiInfinite, BiTransfer } from 'react-icons/bi';
import {FaChessQueen} from 'react-icons/fa';
import { MdOutlineSecurity, MdStorage } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { SiLinuxcontainers, SiServerless } from 'react-icons/si'
export const Row = ({ filterType, filterValue, id, title, owner, description, setViewing, categories, setFilterIsOpenFunction }) => {

	const navigate = useNavigate(); 
	//not the best way to do it but ..
	const colorFunction = (cat) => {
		switch(cat) {
			case 'SERVERLESS':
				return filterType === "category" && filterValue !== "SERVERLESS"? {} : {backgroundColor: "#b366ff"};
			case 'GOVERNANCE': 
				return filterType === "category" && filterValue !== "GOVERNANCE"? {} :{backgroundColor: "#8c66ff"};
			case 'SECURITY':
				return filterType === "category" && filterValue !== "SECURITY"? {} : {backgroundColor: "#6666ff"};
			case 'STORAGE':
				return filterType === "category" && filterValue !== "STORAGE"? {} :{backgroundColor: "#668cff"};
			case 'CONTAINERS':
				return filterType === "category" && filterValue !== "CONTAINERS"? {} :{backgroundColor: "#66b3ff"};
			case 'DEVOPS':
				return filterType === "category" && filterValue !== "DEVOPS"? {} : {backgroundColor: "#66d9ff"};
			case 'MIGRATION':
				return filterType === "category" && filterValue !== "MIGRATION"? {} : {backgroundColor: "#66ffff"};
			case 'NETWORKING': 
				return filterType === "category" && filterValue !== "NETWORKING"? {} : {backgroundColor: "#66ffd9"};
			default:
				return {backgroundColor: "grey"};
		}
	}
//not the best way to do it but ..
	const iconFunction = (cat) => {
		
		switch(cat) {
			case 'NETWORKING':
				return <BiNetworkChart />;
			case 'GOVERNANCE':
				return <FaChessQueen />;
			case 'SECURITY':
				return < MdOutlineSecurity/>
			case 'STORAGE':
				return <MdStorage />;
			case 'CONTAINERS':
				return <SiLinuxcontainers />;
			case 'DEVOPS':
				return <BiInfinite />;
			case 'MIGRATION':
				return <BiTransfer />;
			case 'SERVERLESS':
				return <SiServerless />;
			
					
		}
	}

	return (
		<Tooltip title="click to view">
		<div
			key={id}
			onClick={() => {
				setViewing(id);
				navigate(`/view`);
				console.log(id);
			}}
			className='solution-list-row'>
			
			<div className='row-group-md'>

				<div className='title'>{title}</div>
				<div className='author'>{owner ? owner : "unknown"}</div>
				<div className='category'>
					{categories
						? categories.map((category) => {
								return (
									<div className='cat-chip'>
										<Chip size="small" icon={iconFunction(category)} label={category} sx={colorFunction(category)}/>
									</div>
								);
						  })
						: <span>none</span>}
				</div>
			</div>
			<div className='row-group-lg'>
				<div className='description'>{description ? description : "no description"}</div>
			</div>
		
		</div>
		</Tooltip>
	);
};

const options = [
	{ value: "title", label: "Title" },
	{ value: "category", label: "Category" },
	{ value: "author", label: "Author" },

];
export const Columns = (props) => {
	const { filterType, filterValue, inpValue, filterVal, setFilterIsOpenFunction, sortState, setSortState } = props;

	return (
		<div className='column-container'>
					<Filters
					filterType={filterType}
					filterValue={filterValue}
					inpValue={inpValue}
					filterVal={filterVal}
					sortState={sortState}
					setSortState={setSortState}
					setFilterIsOpenFunction={setFilterIsOpenFunction}
					/>
			<div className='solution-list-columns'>
				<div className='row-group-md'>
					<div className='title'>Title</div>
					<div className='author'>Author</div>
					<div className='category'>Category</div>
				</div>
				<div className='row-group-lg'>
					<div className='description'>Description</div>
				</div>
			</div>
		</div>
	);
};
