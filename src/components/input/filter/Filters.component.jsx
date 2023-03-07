import * as React from 'react'
import PropTypes from 'prop-types'
import './Filters.styles.scss';
import Select from "react-select";
import { categories} from "../../Solutions/Add/options";

const options = [
	{ value: "title", label: "Title" },
	{ value: "category", label: "Category" },
	{ value: "author", label: "Author" },
];
const sort_options = [
    {value: "az", label: "A-Z"},
    {value: "za", label: "Z-A"},
    {value: "date", label: "newest"},
    {value: "date_old", label: "oldest"}

]
const Filters = (props) => {
    const { filterType, filterValue, inpValue, filterVal, setFilterIsOpenFunction, sortState, setSortState } = props;
  return (
    <div className="filter-main">
        <div className="section-one">
            <div className="section-one-one">
        <Select
        className='react-select-container'
								isMulti={false}
								placeholder="filter by ..."
								options={options}
								onChange={(val) => {
									filterType(val.value);
								}}
							/>
                           {filterVal === "title" || filterVal === "author" ? (
								<input
								className="text-input-filter"
									onChange={(e) => filterValue(e.target.value)}
									value={inpValue}
								/>
							) : filterVal === "category" ? (
								<Select
									isMulti={false}
									options={categories}
									onChange={(val) => {
										filterValue(val.value);
									}}
								/>
							) : (
								null
							)}

                            </div>
        </div>
        <div className="section-two">
            <div className="sort">

        <Select
        className='react-select-container'
								isMulti={false}
								placeholder="Sort"
								options={sort_options}
								onChange={(val) => {
									filterType(val.value);
								}}
							/>
            </div>

        </div>
    </div>
  )
}

Filters.propTypes = {}

export default Filters