/** @format */

import "./input.styles.scss";
import * as React from "react";

export const TextField = (props) => {
	const { title, type, placeholder, required, setFields, fields } = props;
	let objectKey = title.toLowerCase();

	return (
		<div className='input-container'>
			<label
				className='text-label'
				for={`${title}-input`}>
				{required ? `${title} *` : `${title}`}
			</label>

			<input
				className='text-input'
				type={type}
				required={required}
				placeholder={placeholder}
				id={`${title}-input`}
				onChange={(e) => {
					setFields({ ...fields, [objectKey]: e.target.value });
				}}
				value={fields?.[objectKey]}
			/>
		</div>
	);
};
