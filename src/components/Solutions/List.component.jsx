/** @format */

import * as React from "react";
import "./List.styles.scss";
import { Row, Columns } from "./Table.component";
import { API } from "aws-amplify";
import { listSolutions, getSolution } from "../../graphql/queries";
import { optionGroupUnstyledClasses } from "@mui/base";

export const List = (props) => {
	// List all items

	const { allSolutions, setEditing } = props;

	const [filterType, setFilterType] = React.useState("");
	const [filterValue, setFilterValue] = React.useState("");
	const [filteredSolutions, setFilteredSolutions] = React.useState(allSolutions);

	React.useEffect(() => {
		setFilterValue("");
	}, [filterType]);

	React.useEffect(() => {
		if (filterType === "title") {
			// List all items
			console.log("true");
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
		} else {
			setFilteredSolutions(allSolutions);
		}
	}, [filterType, filterValue, allSolutions]);

	return (
		<div className='solution-list-container'>
			<Columns
				filterType={setFilterType}
				filterValue={setFilterValue}
				filterVal={filterType}
				inpValue={filterValue}
			/>
			<div className='item-container'>
				{filteredSolutions.map(({ id, title, description, owner, category }) => {
					return (
						<Row
							setEditing={setEditing}
							key={id}
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
