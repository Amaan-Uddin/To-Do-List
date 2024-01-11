const input = document.getElementById('task');
const myForm = document.getElementById('myForm');
const taskSection = document.getElementById('task-section');

myForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value != '') {
		createTask(input.value, true);
		input.value = '';
		input.focus();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.length) {
		const localKeys = Object.keys(localStorage).sort();
		localKeys.forEach((task) => {
			createTask(localStorage.getItem(task), false);
		});
	}
});

taskSection.addEventListener('click', (e) => {
	const buttons = e.target.parentNode;
	const li = buttons.parentNode;

	if (e.target.classList.contains('done')) {
		localStorage.removeItem(`task${li.dataset.taskNumber}`);

		li.classList.add('bg-light');
		li.querySelector('span').classList.add('text-decoration-line-through');

		buttons.removeChild(e.target);
	} else if (e.target.classList.contains('delete')) {
		localStorage.removeItem(`task${li.dataset.taskNumber}`);

		const ul = li.parentNode;
		ul.removeChild(li);
	}
});

function createTask(data, newtask) {
	const li = document.createElement('li');
	li.classList.add('task');

	const doneBtn = document.createElement('button');
	const deleteBtn = document.createElement('button');

	doneBtn.classList.add('btn', 'btn-success', 'done');
	deleteBtn.classList.add('btn', 'btn-danger', 'delete');

	doneBtn.textContent = 'done';
	deleteBtn.textContent = 'delete';

	const buttons = document.createElement('div');
	buttons.classList.add('d-flex', 'gap-2');

	const span = document.createElement('span');
	span.textContent = data;

	buttons.append(doneBtn, deleteBtn);

	li.append(span, buttons);

	const taskNumber = taskSection.childElementCount;

	if (newtask) {
		localStorage.setItem(`task${taskNumber}`, data);
	}

	li.dataset.taskNumber = taskNumber;

	taskSection.appendChild(li);
}
