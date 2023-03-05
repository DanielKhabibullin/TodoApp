import {completeTask, deleteTask,
	editTask,
	handleSubmit} from './modules/eventsHandle.js';
import {renderApp, renderTasks} from './modules/render.js';
window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		const {
			form,
			user,
			tbody,
		} = renderApp();
		renderTasks(user, tbody);
		handleSubmit(form, user, tbody);
		deleteTask(user, tbody);
		completeTask(user, tbody);
		editTask(user, tbody);
	};
	init();
});
