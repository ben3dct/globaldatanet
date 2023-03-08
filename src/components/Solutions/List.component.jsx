/** @format */

import * as React from "react";
import "./List.styles.scss";
import { Row, Columns } from "./Table.component";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { API } from "aws-amplify";
import { listSolutions, getSolution, listFeatures } from "../../graphql/queries";
import { optionGroupUnstyledClasses } from "@mui/base";
export const List = (props) => {

	const { allSolutions, setEditing, loading } = props;
	const [ filterIsOpen, setFilterIsOpen ] = React.useState(false);
	const [filterType, setFilterType] = React.useState("");
	const [filterValue, setFilterValue] = React.useState("");
	const [tempArray, setTempArray] = React.useState([]);
	const [filteredSolutions, setFilteredSolutions] = React.useState(allSolutions);
	const [sortedSolutions, setSortedSolutions] = React.useState([]);
	const [sort, setSort] = React.useState({value: "az", label: "A-Z"});


	React.useEffect(() => {
		setFilterValue("");
	}, [filterType]);

	React.useEffect(() => {console.log(filteredSolutions)}, [filteredSolutions])
	React.useEffect(() => {
		let solutionArr = [];
		if (filterType === "title") {
			API.graphql({
				query: listSolutions,
				variables: { filter: { title: { contains: filterValue } } },
			}).then((solutions) => setFilteredSolutions(solutions.data.listSolutions.items));
		} else if (filterType === "category") {
			API.graphql({
				query: listSolutions,
				variables: { filter: { category: { contains: filterValue } } },
			}).then((solutions) => setFilteredSolutions(solutions.data.listSolutions.items));
		} else if (filterType === "author") {
			API.graphql({
				query: listSolutions,
				variables: { filter: { owner: { contains: filterValue } } },
			}).then((solutions) => setFilteredSolutions(solutions.data.listSolutions.items));
		} else if (filterType === "feature") {
			API.graphql({
				query: listFeatures,
				variables: { filter: { name: { contains: filterValue } } },
			}).then((res) => {
				const idArr = res.data.listFeatures.items;
				setTempArray([]);
				for(let x = 0; x < idArr.length; x++) {
					API.graphql({
						query: getSolution,
						variables: { id: idArr[x].solutionID }
					}).then((solution) => {
						solutionArr.push(solution.data.getSolution);
						setTempArray(tempArray => [...tempArray, solution.data.getSolution])
						
					})
				}
				
				
			})
		} else if (filterType === "service") {
			
			API.graphql({
				query: listSolutions,
				variables: { filter: { services: { contains: (filterValue? filterValue : "") } } },
			}).then((solutions) => setFilteredSolutions(solutions.data.listSolutions.items));
		} else if (filterType === "iac") {
			
			API.graphql({
				query: listSolutions,
				variables: { filter: { iac: { contains: (filterValue? filterValue : "") } } },
			}).then((solutions) => setFilteredSolutions(solutions.data.listSolutions.items));
		}  
		else {
			setFilteredSolutions(allSolutions);
		}
	}, [filterType, filterValue, allSolutions]);
	const  featureFilter = async (x, res) => {
		await API.graphql({
			query: listSolutions,
			variables: { filter: { id: { contains: res.data.listFeatures.items[x].solutionID } } },
		}).then(solution => {
			console.log(solution.data.listSolutions);
		});
	}
	const setFilterIsOpenFunction = () => {
		setFilterIsOpen(!filterIsOpen);
	}
	React.useEffect(() => {
		if(tempArray == filteredSolutions) {
			return;
		}
		setFilteredSolutions(tempArray);
	}, [tempArray, window.location.href]);
	// sorting

	React.useEffect(() => {
		let solutions = filteredSolutions;
		if(sort.value === "az") {
			
			let sorted_solutions = solutions.sort(function (a, b) {
				if (a.title < b.title) {
				  return -1;
				}
				if (a.title > b.title) {
				  return 1;
				}
				return 0;
			  });
			  setSortedSolutions(sorted_solutions);
		} else if (sort.value === "za") {
			let step = solutions.sort(function (a, b) {
				if (a.title < b.title) {
				  return -1;
				}
				if (a.title > b.title) {
				  return 1;
				}
				return 0;
			  });
			const sorted_solutions = step.reverse();
			setSortedSolutions(sorted_solutions);
		} else {
			setSortedSolutions(filteredSolutions);
		}
	}, [filteredSolutions, sort]);

	function sortSolutions() {
		let solutions = filteredSolutions;
		if(sort === "az") {
			
			let sorted_solutions = solutions.sort(function (a, b) {
				if (a.title < b.title) {
				  return -1;
				}
				if (a.title > b.title) {
				  return 1;
				}
				return 0;
			  });
			  setFilteredSolutions(sorted_solutions);
		} else if (sort === "za") {
			
			let step = solutions.sort(function (a, b) {
				if (a.title < b.title) {
				  return -1;
				}
				if (a.title > b.title) {
				  return 1;
				}
				return 0;
			  });
			const sorted_solutions = step.reverse();
			setFilteredSolutions(sorted_solutions);
		}
		
	}
	React.useEffect(() => {console.log(sort)}, [sort])
	return (
		<div className='solution-list-container'>
			
			<Columns
				setFilterIsOpenFunction={setFilterIsOpenFunction}
				filterType={setFilterType}
				filterValue={setFilterValue}
				filterVal={filterType}
				sortState={sort}
				setSortState={setSort}
				inpValue={filterValue}
			/>
			<div className={filterIsOpen? 'item-container-open' : 'item-container'}>
				{sortedSolutions.length > 0? 
				sortedSolutions.map(({ id, title, description, owner, category }) => {



					return (
						<Row
						setEditing={setEditing}
						key={id}
						filterType={filterType}
						filterValue={filterValue}
						id={id}
						title={title}
						categories={category}
						description={description}
						owner={owner}
					/> 
					
					);
				}) :   
<LinearProgress />
				
				
			   }
			</div>
		</div>
	);
};
