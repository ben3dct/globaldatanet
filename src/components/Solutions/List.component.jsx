/** @format */

import * as React from "react";
import "./List.styles.scss";
import { Row } from "./Table.component";
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const List = (props) => {
	return (
		<div className='solution-list-container'>
			{array.map(({ id }) => {
				console.log(id);
				return (
					<Row
						key={id}
						id={id}
					/>
				);
			})}
		</div>
	);
};
