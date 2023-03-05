import {createContainer, createForm, createRow,
	createTable, goodNumberChange} from './createElements.js';
import {askName, getStorage} from './serviceStorage.js';

export const renderApp = () => {
	const container = createContainer();
	const form = createForm();
	const tableWrapper = createTable();
	const user = askName();
	const tbody = document.querySelector('tbody');

	return {
		container,
		form,
		tableWrapper,
		user,
		tbody,
	};
};

export const renderTasks = (user, tbody) => {
	const allRow = getStorage(user).map(createRow);
	tbody.append(...allRow);
	goodNumberChange(tbody);
	return allRow;
};
