document.getElementById('myForm').addEventListener('submit', (e) => {
	e.preventDefault();
	const input = document.getElementById('task');
	console.log(input.value);
	if (input.value !== '') {
		createTask(input.value);
		input.value = '';
		input.focus();
	}
});

// here we are using the concept of event delegation to add listners to children of a ul
document.getElementById('task-section').addEventListener('click', (e) => {
	const buttons = e.target.parentNode; // parent
	const li = buttons.parentNode; // grand-parent
	if (e.target.classList.contains('done')) {
		li.classList.add('bg-light');
		li.querySelector('span').classList.add('text-decoration-line-through');
		buttons.removeChild(e.target);
	} else if (e.target.classList.contains('delete')) {
		const ul = li.parentNode;
		ul.removeChild(li);
	}
});

function createTask(task) {
	const li = document.createElement('li');
	li.classList.add(
		'mb-2',
		'py-2',
		'px-3',
		'text-capitalize',
		'border',
		'rounded-1',
		'border-1',
		'w-100',
		'd-flex',
		'justify-content-between',
		'align-items-center'
	);
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
	document.getElementById('task-section').appendChild(li);
}
