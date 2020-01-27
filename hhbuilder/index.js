/**
 * Household Builder Code Challenge
 *
 * This script handles our Household Builder module. 
 *
 */

// We'll set form as a global object so that we can access it and it's fields throughout the script
const theForm = {
	form: document.querySelector("form"),
	age: document.querySelector("input[name=age]"),
	relationship: document.querySelector("select[name=rel]"),
	smoker: document.querySelector("input[type=checkbox]")
};


// This function adds some classes and attributes to our module so we can better manipulate it 
const setupBuilder = () => {
	const body = document.getElementsByTagName("body")[0],
		builder = body.querySelector(".builder"),
		fields = builder.querySelectorAll("div"),
		addButton = builder.querySelector(".add");

	theForm.form.className = "form";

	let instructions = document.createElement("p");
	instructions.className = "instructions";
	instructions.innerHTML = "Add members of your household into the form below. Once completed, submit the form";
	body.insertBefore(instructions, builder);

	addButton.type = "button";

	let i = 0;

	for (let field of fields) {
		i++;

		if (field.firstElementChild.nodeName === "BUTTON") {
			field.className = "button-wrapper";
		} else {
			field.className = "input-wrapper";

			if (i !== 3) {
				const span = document.createElement("span");
				span.style.display = "none";
				span.className = "error";
				field.appendChild(span);
			}
		}
	}
};

// We need to watch for user input on the form fields so that we can add validation on the age and relationship fields
const watchForInput = e => {
	const input = e.target,
		errorMessage = input.parentNode.parentNode.querySelector(".error");

	if (input.value !== 0) {
		if (errorMessage.style.display === "block") {
			errorMessage.style.display = "none";
		}
	}
};

const validateForm = (age, relationship) => {
	const inputWrappers = document.querySelectorAll(".input-wrapper");
	let i = 0,
		isError = false,
		errorArr = [];

	for (let inputWrapper of inputWrappers) {
		let error = inputWrapper.querySelector(".error");
		i++;

		// Of the three input-wrapper fields, we only have to validate the age and relationship fields so we can excude
		// the smoker field right away

		if (i !== 3) {
			// age field
			if (i === 1) {
				if (age.value <= 0 || age.value === "" || isNaN(age.value)) {
					error.style.display = "block";
					error.innerHTML = "Please enter a valid age";
					isError = true;
					errorArr.push(isError);
					age.addEventListener("keyup", watchForInput);
				}
				// relationship field
			} else if (i === 2) {
				if (relationship.value === "") {
					error.style.display = "block";
					error.innerHTML = "Please select a relationship";
					isError = true;
					errorArr.push(isError);
					relationship.addEventListener("change", watchForInput);
				}
			}
		}
	}

	return errorArr;
};

// We'll create a table to replace the existing ordered list. This will allow us to setup a table heading and give us a 
// more organized structure to display.
const createTable = () => {
	const tableElement = document.createElement("table");
	const ol = document.querySelector(".household");

	ol.parentNode.replaceChild(tableElement, ol);
	tableElement.className = "household";
	tableElement.innerHTML = `
		<thead>
      <tr>
        <th>Age</th>
        <th>Relationship</th>
        <th>Smoker</th>
      </tr>    
		</thead>
		<tbody>
		</tbody>`;
};

// This function allows us to add new rows with household members's information.
const addRow = () => {
	const table = document.querySelectorAll("table"),
		addButton = document.querySelector(".add"),
		editView = document.querySelectorAll(".edit-view");

	if (table.length === 0) {
		createTable();
	}

	function Person(age, relationship, smoker) {
		this.age = age.value;
		this.relationship = relationship.value;
		this.smoker = smoker.checked;
		this.populateRow = () => {
			const tbody = document.querySelector("tbody");
			let tr = document.createElement("tr");
			tr.innerHTML = `
			<tr>
				<td>${this.age}</td>
				<td>${this.relationship}</td>
				<td>${this.smoker}</td>
			</tr>`;
			tbody.appendChild(tr);
		};
	}
	let newPerson = new Person(theForm.age, theForm.relationship, theForm.smoker);
	newPerson.populateRow();
	theForm.form.reset();
};

// Here we can update household members' information after we submit the form.
const updateRow = button => {
	let activeRow = button.parentNode.parentNode.parentNode.querySelector(
			".active"
		),
		activeRowData = activeRow.children;

	activeRowData[0].innerHTML = theForm.age.value;
	activeRowData[1].innerHTML = theForm.relationship.value;
	activeRowData[2].innerHTML = theForm.smoker.checked;

	theForm.form.reset();
	button.innerHTML = "add";
	button.className = "add";

	activeRow.classList.remove("active");
};

const setupTableToEdit = table => {
	const editHouseholdButton = document.createElement("button");

	const tableBodyRows = table.querySelectorAll("tbody tr"),
		addButton = theForm.form.querySelector(".add"),
		updateButton = addButton;

	editHouseholdButton.type = "button";
	editHouseholdButton.className = "edit-household";
	editHouseholdButton.innerHTML = "Edit Household";

	table.appendChild(editHouseholdButton);
	theForm.form.style.display = "none";

	editHouseholdButton.addEventListener("click", function() {
		theForm.form.style.display = "block";
		table.parentNode.classList.add("edit-view");
		table.classList.add("edit-table");

		this.remove();
	});

	table.classList.remove("edit-table");
	table.parentNode.classList.remove("edit-view");

	for (let tableBodyRow of tableBodyRows) {
		tableBodyRow.addEventListener("click", function() {
			if (table.classList.contains("edit-table")) {

				let editInstructions = document.querySelector(".instructions");
				editInstructions.innerHTML = "Click on a household member in order to update their information. You may also add or delete individuals.";

				let activeClasses = table.querySelectorAll(".active");

				for (let activeClass of activeClasses) {
					activeClass.classList.remove("active");
				}

				this.className = "active";

				updateButton.className = "update";
				updateButton.innerHTML = "update";
				updateButton.type = "button";

				addButton.parentNode.replaceChild(updateButton, addButton);

				const rowData = this.querySelectorAll("td");

				theForm.age.value = rowData[0].innerHTML;
				theForm.relationship.value = rowData[1].innerHTML;

				if (rowData[2].innerHTML === "true") {
					theForm.smoker.checked = rowData[2].innerHTML;
				}
			}
		});
	}
};

// This takes care of our form submission and fulfills requirements of the challenge
const submitHousehold = e => {
	const table = document.querySelector("table");
	e.preventDefault();

	const debug = document.querySelector(".debug");
	debug.innerHTML = "hello";
	// console.log(JSON.stringify(debug))
	// debug.innerHTML = "hello";

	let submitInstructions = document.querySelector(".instructions");
	submitInstructions.innerHTML = "Thank you for submitting your household. If you need to edit your submission, click on Edit Household below.";

	theForm.form.reset();
	setupTableToEdit(table);
};

// Initialize the builder module. We'll determine if we're in our edit view and if not, we can add a new member
const builderInit = () => {
	const buttons = theForm.form.getElementsByTagName("button");

	if (validateForm(theForm.age, theForm.relationship).includes(true)) {
		return;
	} else {
		for (let button of buttons) {
			if (button.classList.contains("update")) {
				updateRow(button);
			} else if (button.classList.contains("add")) {
				addRow();
			}
		}
	}
};

// Global listeners
const listeners = () => {
	const addButton = theForm.form.querySelector(".add"),
		submitButton = theForm.form.querySelector("button[type=submit]");

	addButton.addEventListener("click", builderInit, false);
	submitButton.addEventListener("click", submitHousehold, false);
};

// Adding Google font and custom styles for our module
const addStyleLinks = () => {
	const head = document.getElementsByTagName("head")[0],
		linkToStyleSheet = document.createElement("link"),
		sourceSansProFont = document.createElement("link");

	linkToStyleSheet.href = "./css/builder.css";
	linkToStyleSheet.type = "text/css";
	linkToStyleSheet.rel = "stylesheet";

	sourceSansProFont.href =
		"https://fonts.googleapis.com/css?family=Open+Sans&display=swap";
	sourceSansProFont.rel = "stylesheet";

	head.appendChild(linkToStyleSheet);
	head.appendChild(sourceSansProFont);
};

// Initialize the Builder module.
const init = () => {
	setupBuilder();
	listeners();
	addStyleLinks();
};

init();
