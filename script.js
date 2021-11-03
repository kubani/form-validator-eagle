const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmation = document.getElementById('confirmation');

function showError(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function checkEmptyFields(fields) {
	fields.forEach((field) => {
		if (field.value.trim() === '') return showError(field, `${convertToCap(field)} is required.`);
		else return showSuccess(field);
	});
}

function checkInputLength(input, min, max) {
	if (input.value !== '') {
		if (input.value.length < min) {
			showError(input, `${convertToCap(input)} must be at least ${min} characters.`);
		} else if (input.value.length > max) {
			showError(input, `${convertToCap(input)} must be less than ${max} characters.`);
		} else {
			showSuccess(input);
		}
	}
}

function validateEmail(input) {
	if (input.value !== '') {
		const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return input.value.match(mailFormat) ? showSuccess(input) : showError(input, 'Email is not valid.');
	}
}

function checkPasswordsMatch(input1, input2) {
	if (input.value !== '') {
		return input1 === input2 ? showSuccess(input2) : showError(input2, 'Must match password.');
	}
}

function convertToCap(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (event) {
	event.preventDefault();

	checkEmptyFields([userName, email, password, confirmation]);
	checkInputLength(userName, 3, 12);
	checkInputLength(password, 6, 18);
	validateEmail(email);
	checkPasswordsMatch(password, confirmation);
});
