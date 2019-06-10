import React from 'react';

const getOptionValue = (value, options) => {
	const option = options.filter(option => option.id == value)[0];
	return option ? option.value : null;
};

const EditableCell = ({ inactive, invalid, value, onValueChange, info }) => {
	if (info.type === 'custom') return inactive 
		? value 
		: info.component(value, invalid)
	if (info.type === 'checkbox') 
		return <input type="checkbox" checked={value} onChange={onValueChange} disabled={inactive} />;
	if (info.type === 'select') return inactive 
		? getOptionValue(value, info.options)
		: (
			<select value={value} onChange={onValueChange} className={`form-control ${invalid && 'is-invalid'} `}>
				{ !value && <option value={null} key='null'>None</option>}
				{ info.options.map(option => <option value={option.id} key={option.id}>{option.value}</option>) }
			</select>
		)
	return inactive ? value : <input value={value} onChange={onValueChange} className={`form-control ${invalid && 'is-invalid'} `} />
};

const isCellInvalid = (value, { isRequired, isNumber, isValid }) => {
	const isInvalid = 
		(isRequired && (!value || (typeof value === 'string' && !value.trim())))
		|| (isNumber && isNaN(value))
		|| (isValid && !isValid(value));
	return isInvalid;
};

class EditableRow extends React.Component {
	constructor() {
		super();
		this.handleCellChange = this.handleCellChange.bind(this);
		this.state = {
			invalidCells: []
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { editData, columns } = props;
		const invalidCells = Object.keys(editData).filter((cell) => isCellInvalid(editData[cell], columns[cell]));
		return { invalidCells };
	}

	handleCellChange({ target: { value } }, key) {
		const { editData } = this.props;
		editData[key] = value;
		this.props.onRowChange(editData);
	}

	render() {
		const { editable, editData, onSaveRow, onCancelEdit, onEditRow, columns } = this.props;
		const { invalidCells } = this.state;

		return (
			<tr> 
				{
					Object.keys(editData).map((key, index) =>
						<td key={index}>
							<EditableCell
								inactive={!editable}
								invalid={invalidCells.indexOf(key) > -1}
								value={editData[key]}
								info={columns[key]}
								onValueChange={(event) => this.handleCellChange(event, key)}
							/>
						</td>
					)
				}
				<td> 
				{ !editable && <button onClick={onEditRow} type="button" className="btn btn-link">Edit</button> }
				{ editable && <button onClick={onSaveRow} disabled={invalidCells.length > 0} type="button" className="btn btn-link">Save</button> }
				{ editable && <button onClick={onCancelEdit} type="button" className="btn btn-link">Cancel</button> }
				</td>
			</tr>
		)
	}
};


export default EditableRow;
