export const getStorage = key => (localStorage.getItem(key) ?
JSON.parse(localStorage.getItem(key)) : []);

export const askName = () => {
	const user = prompt('Please enter your name:');
	return user;
};

export const setStorage = (user, task) => {
	const tasks = getStorage(user);
	tasks.push(task);
	localStorage.setItem(user, JSON.stringify(tasks));
};

export const removeStorage = (user, taskId) => {
	const tasks = getStorage(user);
	const newTasks = tasks.filter(task => task.id !== taskId);
	localStorage.setItem(user, JSON.stringify(newTasks));
};

