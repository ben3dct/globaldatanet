/** @format */

import * as React from "react";
import "./MSCustom.styles.scss";
import Select from "react-select";

export const MSCustom = (props) => {
	const { title, placeholder, fields, setFields, options, isMulti = true } = props;
	let objectKey = title.toLowerCase();
	return (
		<div className='input-container'>
			<label
				className='select-label'
				for='select'>
				{title}
			</label>
			<Select
				isMulti={isMulti}
				placeholder={placeholder}
                value={fields}
				options={options}
				onChange={(e) => {
					setFields(e);
				}}
			/>
		</div>
	);
};
