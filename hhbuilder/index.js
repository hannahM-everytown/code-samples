/**
 * Household Builder Code Challenge
 *
 * This script handles our Household Builder module.
 *
 */

// We'll set form as a global object so that we can access it and it's fields throughout the script
const theForm = {
  form: document.getElementsByTagName("form")[0],
  age: document.querySelector("input[name=age]"),
  relationship: document.querySelector("select[name=rel]"),
  smoker: document.querySelector("input[type=checkbox]")
};

// This function adds some classes and attributes to our module so we can better manipulate it
const setupBuilder = () => {
  const body = document.getElementsByTagName("body")[0],
    builder = body.querySelector(".builder"),
    fields = builder.querySelectorAll("div"),
    addButton = builder.querySelector(".add"),
    instructionsElement = document.createElement("p");

  instructionsElement.className = "instructions";
  instructionsElement.innerHTML =
    "Add members of your household into the form below. Once completed, submit the form";
  body.insertBefore(instructionsElement, builder);
  theForm.form.className = "form";
  addButton.type = "button";

  let i = 0;

  for (let field of fields) {
    i++;

    if (field.firstElementChild.nodeName === "BUTTON") {
      field.className = "button-wrapper";
    } else {
      field.className = "input-wrapper";

      const spanElement = document.createElement("span");
      spanElement.style.display = i === 3 ? "block" : "none";
      spanElement.className = i === 3 ? "checkmark" : "error";
      field.firstElementChild.appendChild(spanElement);
    }
  }
};

// We need to watch for user input on the age and relationship fields so that we can add validation
const watchForInput = e => {
  const input = e.target,
    errorMessage = input.parentNode.parentNode.querySelector(".error");

  if (input.value !== 0) {
    if (errorMessage.style.display === "block") {
      errorMessage.style.display = "none";
    }
  }
};

// Our form validation. We'll return an array to detect errors
const validateForm = () => {
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
        if (
          theForm.age.value <= 0 ||
          theForm.age.value === "" ||
          isNaN(theForm.age.value)
        ) {
          error.style.display = "block";
          error.innerHTML = "Please enter a valid age";
          isError = true;
          errorArr.push(isError);
          theForm.age.addEventListener("keyup", watchForInput);
        }

        // relationship field
      } else if (i === 2) {
        if (theForm.relationship.value === "") {
          error.style.display = "block";
          error.innerHTML = "Please select a relationship";
          isError = true;
          errorArr.push(isError);
          theForm.relationship.addEventListener("change", watchForInput);
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

// This function allows us to add new rows with household members' information.
const addRow = () => {
  const table = document.querySelectorAll("table");

  if (table.length === 0) {
    createTable();
  }

  // Our Person object to build out the body, table rows and table data with household members' information
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

// Here we'll give a user the chance to update household members' information after they submit the form.
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

const deleteRow = () => {};

// If a user needs to edit the form, this function will allow them to click on a household member and display that
// info back in the form fields so they can be updated.
const setupTableToEdit = table => {
  const editHouseholdButton = document.createElement("button");

  const tableBodyRows = table.querySelectorAll("tbody tr"),
    deleteButton = document.createElement("button"),
    addButton = theForm.form.querySelector(".add"),
    updateButton = addButton;

  editHouseholdButton.type = "button";
  editHouseholdButton.className = "edit-household";
  editHouseholdButton.innerHTML = "Edit Household";

  table.appendChild(editHouseholdButton);
  theForm.form.style.display = "none";

  editHouseholdButton.addEventListener("click", function() {
    let editInstructions = document.querySelector(".instructions");
    editInstructions.innerHTML =
      "Click on a household member in order to update their information. You may also add or delete individuals.";

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
        let activeClasses = table.querySelectorAll(".active");

        for (let activeClass of activeClasses) {
          activeClass.classList.remove("active");
        }

        this.className = "active";
        console.log(tableBodyRow);

        // delete button

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

  let instructions = document.querySelector(".instructions");
  instructions.innerHTML =
    "Thank you for submitting your household. If you need to edit your submission, click on Edit Household below.";

  theForm.form.reset();
  setupTableToEdit(table);
};

// Handle the builder form. We'll determine if we're in our edit view so we can update household members and if not,
// we can add a new member
const formFunctionality = () => {
  const buttons = theForm.form.getElementsByTagName("button");

  if (validateForm().includes(true)) {
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

  addButton.addEventListener("click", formFunctionality, false);
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
const builderInit = () => {
  setupBuilder();
  listeners();
  addStyleLinks();
};

builderInit();
