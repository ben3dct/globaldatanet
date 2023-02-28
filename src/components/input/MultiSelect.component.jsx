/** @format */

import * as React from "react";
import "./input.styles.scss";
import Select from "react-select";

export const MultiSelect = (props) => {
	const { title, placeholder, fields, setFields, options } = props;
	let objectKey = title.toLowerCase();
	return (
		<div className='input-container'>
			<label
				className='select-label'
				for='select'>
				{title}
			</label>
			<Select
				isMulti
				placeholder={placeholder}
				options={options}
				onChange={(e) => {
					setFields({ ...fields, [objectKey]: e });
				}}
			/>
		</div>
	);
};
