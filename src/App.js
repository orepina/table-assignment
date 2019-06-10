import React from 'react';
import Table from './Table';
import { data, columns } from './example';


function App() {
	const handleChange = (data) => {
		console.log('handleChange ', data);
	}

	return (
		<div className="App">
			<Table
				columns={columns}
				data={data}
				onChange={handleChange}
			/>
		</div>
	);
}


export default App;
