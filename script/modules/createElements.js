
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
			placeholder="enter new task" required>
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
	form.append(btnSave);
	const btnClear = createBtn(
		{
			className: 'btn btn-warning',
			type: 'reset',
			text: 'Clear',
		});
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
	console.log('tbody: ', tbody);
	table.append(thead, tbody);

	return tableWrapper;
};

export const createRow = ({id, task, progress}) => {
	const tbody = document.querySelector('tbody');
	const tableRow = document.createElement('tr');
	let className = 'table-success';
	let tdClass = 'text-decoration-line-through';
	let btnDisable = 'disabled';
	if (progress === 'In progress') {
		className = 'table-light';
		tdClass = 'task';
		btnDisable = '';
	}
	tableRow.classList.add(className);
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
		<button class="btn btn-success me-1">
			Complete
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


