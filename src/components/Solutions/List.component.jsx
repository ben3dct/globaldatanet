/** @format */

import * as React from "react";
import "./List.styles.scss";
import { Row, Columns } from "./Table.component";
import { API } from "aws-amplify";
import { listSolutions, getSolution, listFeatures } from "../../graphql/queries";
import { optionGroupUnstyledClasses } from "@mui/base";
export const List = (props) => {
	// List all items

	const { allSolutions, setEditing, loading } = props;
	const [ filterIsOpen, setFilterIsOpen ] = React.useState(false);
	const [filterType, setFilterType] = React.useState("");
	const [filterValue, setFilterValue] = React.useState("");
	const [tempArray, setTempArray] = React.useState([]);
	const [filteredSolutions, setFilteredSolutions] = React.useState(allSolutions);
	const [sort, setSort] = React.useState("az");


	React.useEffect(() => {
		setFilterValue("");
	}, [filterType]);

	React.useEffect(() => {console.log(filteredSolutions)}, [filteredSolutions])
	React.useEffect(() => {
		let solutionArr = [];
		if (filterType === "title") {
			// List all items

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
			
			// filter by feature name implementation
			// .then(res => {
			// 	setFeatureFiltered([{}]);
			// 	for (let x = 0; x < res.data.listFeatures.items.length; x++) {
			// 		featureFilter(x, res);

			// 	}
				
			// });
			// setFilteredSolutions(featureFiltered);



			/**
			 * // Get a specific item
		
			 */

			// get features and the solution id's
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

			// get each solution with solutionID

			// push all solutions to an array
			
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
		setFilteredSolutions(tempArray);
	}, [tempArray]);
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
			
				{filteredSolutions.map(({ id, title, description, owner, category }) => {
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
				})}
			</div>
		</div>
	);
};
