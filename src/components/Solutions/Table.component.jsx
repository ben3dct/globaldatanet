/** @format */

import * as React from "react";
import "./Table.styles.scss";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
export const Row = ({ id, title, owner, description, setEditing, categories }) => {
	const navigate = useNavigate();
	console.log(categories);
	return (
		<div
			key={id}
			onClick={() => {
				setEditing(id);
				navigate("/edit");
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
										<Chip label={category} />
									</div>
								);
						  })
						: null}
				</div>
			</div>
			<div className='row-group-lg'>
				<div className='description'>{description ? description : "no description"}</div>
			</div>
		</div>
	);
};

export const Columns = () => {
	return (
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
	);
};
