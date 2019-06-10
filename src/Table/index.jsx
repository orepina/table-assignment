import React from 'react';
import EditableRow from './EditableRow';

const TableHeader = ({ columns }) => {
	const columnsKeyes = Object.keys(columns);
	const width = 100/(columnsKeyes.length + 1);
	return (
		<thead>
			<tr> 
				{
					columnsKeyes.map((key) =>
						<th key={key} style={{ width: `${width}%` }}>{columns[key].title}</th>
					)
				}
				<th>Actions</th>
			</tr>
		</thead>
	)
}

const getEmptyDataRow = (columns) => Object.keys(columns).reduce((acc, col) => ({ ...acc, [col]: '' }), {});

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddRow = this.handleAddRow.bind(this);
		this.handleEditRow = this.handleEditRow.bind(this);
		this.handleSaveRow = this.handleSaveRow.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleRowChange = this.handleRowChange.bind(this);

		this.state = {
			editIndex: null,
			editData: null,
			data: this.props.data,
			originalData: this.props.data,
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		if (state.originalData !== props.data) 
			return {
				editIndex: null,
				editData: null,
				data: props.data,
				originalData: props.data,
			}
		return null;
	}

	handleAddRow() {
		this.setState({
			editIndex: 'new',
			editData: getEmptyDataRow(this.props.columns)
		})
	}

	handleEditRow(event, index) {
		this.setState({
			editIndex: index,
			editData: { ...this.state.data[index] }
		})
	}

	handleSaveRow() {
		const { data, editIndex, editData } = this.state;
		if (editIndex === 'new') {
			data.push(editData)
		} else {
			data[editIndex] = { ...editData};
		}
		this.setState({
			editIndex: null,
			editData: null,
			data: data
		})
		this.props.onChange(data);
	}

	handleCancelEdit() {
		this.setState({
			editIndex: null,
			editData: null
		})
	}

	handleRowChange(data) {
		this.setState({ editData: data });
	}

	render() {
		const { columns } = this.props;
		const { data, editIndex, editData } = this.state;
		const isAddNew = 'new' === editIndex;

		return (
			<div className="p-2">
				<table className="table table-bordered">
					<TableHeader columns={columns}/>
					<tbody>
						{
							data.map((row, index) => 
								<EditableRow
									key={index}
									editable={index === editIndex}
									editData={index === editIndex ? editData : row}
									columns={columns}
									onRowChange={this.handleRowChange}	
									onSaveRow={this.handleSaveRow}
									onCancelEdit={this.handleCancelEdit}
									onEditRow={(event) => this.handleEditRow(event, index)}
								/>
							)
						}
						{ isAddNew && 
							<EditableRow
								editable={true}
								editData={editData}
								columns={columns}
								onRowChange={this.handleRowChange}	
								onSaveRow={this.handleSaveRow}
								onCancelEdit={this.handleCancelEdit}
							/>
						}
					</tbody>
				</table>
				{ !isAddNew && <div className="mr-1"><button type="button" className="btn btn-primary float-right" onClick={this.handleAddRow}>Add row</button></div> }
			</div>
		)
	}
}


export default Table;
