/** @format */

import * as React from "react";
import "./List.styles.scss";
import { Row, Columns } from "./Table.component";
import { API } from "aws-amplify";
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const List = (props) => {
	// List all items
	const { allSolutions, setEditing } = props;

	return (
		<div className='solution-list-container'>
			<Columns />
			<div className='item-container'>
				{allSolutions.map(({ id, title, description, owner, category }) => {
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
