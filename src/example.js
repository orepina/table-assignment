import React from 'react';

const columns = {
	name: {
		title: 'Name',
		type: 'text',
		isRequired: true,
	}, 
	age: {
		title: 'Age',
		isNumber: true,
	}, 
	address: {
		title: 'Address',
		type: 'custom',
		component: (value, invalid) => <div>{value}</div>
	},
	registered: {
		title: 'Registered',
		type: 'checkbox',
	},
	state: {
		title: 'state',
		type: 'select',
		isRequired: true,
		options: [
			{id: 'ca', value: 'California'},
			{id: 'ma', value: 'Massachusetts'},
			{id: 'tx', value: 'Texas'}
		]
	}
};

const data = [
	{ name: 'Person1', age: '35', address: 'street1 city1', registered: true, state: 'ca' },
	{ name: 'Person2', age: '21', address: 'street2 city2', registered: false, state: 'ma' },
	{ name: 'Person3', age: '45', address: 'street3 city3', registered: false, state: 'tx' },
	{ name: 'Person4', age: '54', address: 'street4 city4', registered: true, state: 'ca' }
];


export { columns, data }