
const container = document.querySelector('.app-container');
export const createContainer = () => {
	container.classList.add('vh-100', 'w-100',
		'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');
	const title = document.createElement('h1');
	title.textContent = 'ToDo App';
	container.append(title);
	return container;
};

const createBtn = ({className, type, text}) => {
	const button = document.createElement('button');
	button.className = className;
	button.type = type;
	button.textContent = text;
	return button;
};

export const createForm = () => {
	const form = document.createElement('form');
	form.classList.add('d-flex', 'align-items-center', 'mb-3');
	form.innerHTML = `
	<label class="form-group me-3 mb-0">
		<input id="input" type="text" class="form-control"
			placeholder="enter new task" style="width: 200px;" required>
	</label>
	`;
	const btnSave = createBtn(
		{
			className: 'btn btn-primary me-3',
			type: 'submit',
			text: 'Save',
		});
	btnSave.setAttribute('disabled', true);
	form.addEventListener('input', () => {
		const input = form.querySelector('input');
		if (input.value.trim().length > 0) {
			btnSave.removeAttribute('disabled');
		} else {
			btnSave.setAttribute('disabled', true);
		}
	});
	const dropdown = document.createElement('select');
	dropdown.classList.add('form-select', 'me-3');
	dropdown.innerHTML = `
		<option value="table-light">Ordinary</option>
		<option value="table-warning">Important</option>
		<option value="table-danger">Urgent</option>
	`;

	form.append(dropdown);
	const btnClear = createBtn(
		{
			className: 'btn btn-warning',
			type: 'reset',
			text: 'Clear',
		});
	form.append(btnSave);
	form.append(btnClear);
	container.append(form);
	return form;
};

export const createTable = () => {
	const tableWrapper = document.createElement('div');
	tableWrapper.classList.add('table-wrapper');
	container.append(tableWrapper);
	const table = document.createElement('table');
	table.classList.add('table', 'table-hover', 'table-bordered');
	tableWrapper.append(table);
	const thead = document.createElement('thead');
	thead.insertAdjacentHTML('beforeend', `
	<tr>
		<th>№</th>
		<th>Task</th>
		<th>Status</th>
		<th>Actions</th>
	</tr>
	`);

	const tbody = document.createElement('tbody');
	table.append(thead, tbody);

	return tableWrapper;
};

export const createRow = ({id, task, progress, priority}) => {
	const tbody = document.querySelector('tbody');
	const tableRow = document.createElement('tr');
	let tdClass = 'task';
	let btnDisable = '';
	let complete = 'Complete';
	if (progress === 'Completed') {
		priority = 'table-success';
		tdClass = 'text-decoration-line-through';
		btnDisable = 'disabled';
		complete = 'Uncomplete';
	}
	tableRow.classList.add(priority);
	tableRow.setAttribute('data-id', id);
	tableRow.innerHTML = `
	<td></td>
	<td class="${tdClass}" contenteditable="false">
		${task}
	</td>
	<td>${progress}</td>
	<td>
		<button class="btn btn-danger me-1">
			Delete
		</button>
		<button class="btn btn-success me-1" style="min-width: 114px;">
			${complete}
		</button>
		<button class="btn btn-secondary me-1" ${btnDisable}>
			Edit
		</button>
		</td>
	`;

	tbody.append(tableRow);
	return tableRow;
};

export const goodNumberChange = (tbody) => {
	const rows = tbody.querySelectorAll('tr');
	rows.forEach((item, index) => {
		item.cells[0].textContent = `${index + 1}`;
	});
};
