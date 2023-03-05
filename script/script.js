import {completeTask, deleteTask,
	handleSubmit} from './modules/eventsHandle.js';
import {renderApp, renderTasks} from './modules/render.js';
window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		const {
			container,
			form,
			tableWrapper,
			tableRow,
			user,
			tbody,
		} = renderApp();
		renderTasks(user, tbody);
		handleSubmit(form, user, tbody);
		deleteTask(user, tbody);
		completeTask(user, tbody);
	};
	init();
});
