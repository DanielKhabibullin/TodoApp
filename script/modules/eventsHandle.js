import {createRow, goodNumberChange} from './createElements.js';
import {renderTasks} from './render.js';
import {getStorage, removeStorage, setStorage} from './serviceStorage.js';


export const addNewTask = (user, obj, tbody) => {
	tbody.append(createRow(obj));
	setStorage(user, obj);
	goodNumberChange(tbody);
};

export const clearInput = (form) => {
	const btnSave = document.querySelector('.btn-primary');
	form.addEventListener('reset', () => {
		btnSave.setAttribute('disabled', true);
	});
};

export const handleSubmit = (form, user, tbody) => {
	const dropdown = form.querySelector('select');
	const btnSave = document.querySelector('.btn-primary');
	form.addEventListener('submit', e => {
		e.preventDefault();
		const target = e.target;
		const input = target.querySelector('input');
		const newTask = {
			id: Date.now(),
			task: input.value,
			progress: 'In progress',
			priority: dropdown.value,
		};
		addNewTask(user, newTask, tbody);
		form.reset();
		btnSave.setAttribute('disabled', true);
	});
	form.addEventListener('keydown', e => {
		if (e.keyCode === 13 || e.which === 13) {
			e.preventDefault();
			const input = document.querySelector('input');
			console.log(input);
			const newTask = {
				id: Date.now(),
				task: input.value,
				progress: 'In progress',
				priority: dropdown.value,
			};
			addNewTask(user, newTask, tbody);
			form.reset();
			btnSave.setAttribute('disabled', true);
		}
	});
};

export const deleteTask = (user, tbody) => {
	tbody.addEventListener('click', (event) => {
		const target = event.target;
		if (target.classList.contains('btn-danger')) {
			const row = target.closest('tr');
			const taskId = parseInt(row.dataset.id);
			if (confirm('Are you sure you want to delete this task?')) {
				removeStorage(user, taskId);
				row.remove();
				goodNumberChange(tbody);
			}
		}
	});
};

const clearTable = (tbody) => {
	tbody.innerHTML = '';
};

export const completeTask = (user, tbody) => {
	tbody.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('btn-success')) {
			const row = target.closest('tr');
			const taskId = parseInt(row.dataset.id);
			const tasks = getStorage(user);
			const taskIndex = tasks.findIndex((task) => task.id === taskId);
			if (taskIndex !== -1) {
				const task = tasks[taskIndex];
				task.progress === 'Completed' ? task.progress = 'In progress' :
					task.progress = 'Completed';
				localStorage.setItem(user, JSON.stringify(tasks));
				clearTable(tbody);
				renderTasks(user, tbody);
			}
		}
	});
};

export const editTask = (user, tbody) => {
	tbody.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('btn-secondary')) {
			const row = target.closest('tr');
			const taskId = parseInt(row.dataset.id);
			const tasks = getStorage(user);
			const taskIndex = tasks.findIndex((task) => task.id === taskId);
			if (taskIndex !== -1) {
				const taskNameCell = row.querySelector('.task');
				if (taskNameCell.isContentEditable) {
					const updatedTaskName = taskNameCell.textContent.trim();
					tasks[taskIndex].task = updatedTaskName;
					localStorage.setItem(user, JSON.stringify(tasks));
				}
				taskNameCell.contentEditable = !taskNameCell.isContentEditable;
				taskNameCell.classList.toggle('editable');
				if (taskNameCell.classList.contains('editable')) {
					taskNameCell.focus();
				}
				target.textContent = taskNameCell.isContentEditable ? 'Save' : 'Edit';
			}
		}
	});
};
