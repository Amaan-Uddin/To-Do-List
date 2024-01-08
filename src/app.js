const taskSection = document.getElementById('task-section');

document.getElementById('myForm').addEventListener('submit', (e) => {
	e.preventDefault();
	const input = document.getElementById('task');
	if (input.value !== '') {
		createTask(input.value);
		input.value = '';
		input.focus();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.length) {
		const localKeys = Object.keys(localStorage); // returns an array of keys of the object
		localKeys.forEach((task) => {
			createTask(localStorage.getItem(task));
		});
	}
});

// here we are using the concept of event delegation to add listners to children of a ul
taskSection.addEventListener('click', (e) => {
	const buttons = e.target.parentNode; // parent
	const li = buttons.parentNode; // grand-parent

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

function createTask(task) {
	const li = document.createElement('li');
	li.classList.add('task');

	const doneBtn = document.createElement('button');
	const deleteBtn = document.createElement('button');

	doneBtn.textContent = 'done';
	deleteBtn.textContent = 'delete';

	const btnArray = Array(doneBtn, deleteBtn);

	btnArray.forEach((btn) => {
		btn.classList.add('btn');
		if (btn.textContent === 'done') {
			btn.classList.add('btn-success', 'done');
		} else {
			btn.classList.add('btn-danger', 'delete');
		}
	});

	const span = document.createElement('span');
	span.textContent = task;

	const buttons = document.createElement('div');
	buttons.classList.add('d-flex', 'gap-2');

	buttons.appendChild(doneBtn);
	buttons.appendChild(deleteBtn);

	li.appendChild(span);
	li.append(buttons);

	const taskNumber = taskSection.childElementCount + 1;
	localStorage.setItem(`task${taskNumber}`, task);

	li.dataset.taskNumber = taskNumber; // create a dataset attribute to store the task number
	taskSection.appendChild(li);
}
